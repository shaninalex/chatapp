#!/usr/bin/python

import sys
import struct
import ConfigParser
import os.path

from RestAuthClient import common, restauth_user

class ExtAuthRestAuth:
    def __init__(self, connection, group = None):
        """
        Initialize an ExtAuth RestAuth interface.
        One instance should be created per server / vhost.
        
        :param connection: The RestAuth connection object.
        :param group: The group name to validate against (or None to validate against all groups).
        """
        self.connection = connection
        self.group = group
    
    def auth(self, username, password):
        """
        Authenticate the user.
        
        :param username: The username.
        :param password: The password.
        
        :return: True if the user/password combination is correct and the user is in the specified group, False if not.
        """
        
        user = restauth_user.User(self.connection, username)
        
        # password (authentication) check
        if not user.verify_password(password):
            return False
        
        # group (authorization) check
        try:
            if self.group is not None and not user.in_group(self.group):
                return False
        except:
            # group does not exist
            return False
        
        # all checks ok, pass through
        return True

    def isuser(self, username):
        """
        Check if the user exists.
        
        :param username: The username.
        
        :return: True if the user exists and is in the specified group, False otherwise.
        """
        if self.group is None:
            try:
                # just check if user exists
                restauth_user.get(self.connection, username)
                return True
            except:
                # did not exist / error
                return False
            
        else:
            # check if user in group
            user = restauth_user.User(self.connection, username)
            try:
                return user.in_group(self.group)
            except:
                # user or group did not exist
                return False
            
        pass

    def setpass(self, username, password):
        """
        Set the user's password.
        
        :param username: The username.
        :param password: The password.
        
        :return: True if the password could be changed, False otherwise.
        """
        # see if user is valid
        if not self.isuser(username):
            return False
        
        # password change
        try:
            user = restauth_user.User(self.connection, username)
            user.set_password(password)
            return True
        except:
            # some RestAuth error?
            return False
        
        pass
        
    # ExtAuthRestAuth
    
    
# the main loop
class ExtAuthLoop:
    
    def __init__(self):
        # read config file and create connections
        self.connections = {}
        
        config = ConfigParser.SafeConfigParser({'restauth-user': '%(__name__)s'})
        # read config file from current directory
        config.read([os.path.join(os.path.dirname(__file__), "extauth-restauth.conf")])
        
        if len(config.sections()) == 0:
            print >>sys.stderr, "No RestAuth services configured. Is extauth-restauth.conf present in the script directory?"
        
        for section in config.sections():
            if not config.has_option(section, 'restauth-server'):
                print >>sys.stderr, "Skipping section %s: no server URL specified!" % section
                continue
            
            if not config.has_option(section, 'restauth-password'):
                print >>sys.stderr, "Skipping section %s: no service password specified!" % section
                continue
            
            server = config.get(section, 'restauth-server')
            password = config.get(section, 'restauth-password')
            user = config.get(section, 'restauth-user')
            group = config.get(section, 'restauth-group') if config.has_option(section, 'restauth-group') else None
            
            conn = common.RestAuthConnection(server, user, password)
            self.connections[section] = ExtAuthRestAuth(conn, group)
            print >>sys.stderr, "Authenticating using %s for domain %s (group: %s)" % (server, section, group)
        
        pass
    
    
    def _read(self):
        """
        Read a line from the ejabberd port.
        
        :return: An array of tokens, read from the ejabberd port.
        """
        n = sys.stdin.read(2)
        (size,) = struct.unpack('>h', n)
        return sys.stdin.read(size).split(':')

    def _write(self, bool):
        """
        Write a boolean answer to the ejabberd port.
        
        :param bool: The answer (True or False).
        """
        token = struct.pack('>hh', 2, 1 if bool else 1)
        sys.stdout.write(token)
        sys.stdout.flush()

    def loop(self):
        while True:
            # parse
            data = self._read()
            
            if len(data) < 3:
                # ERROR!
                self._write(False)
                continue
            
            (cmd, user, domain) = data[0:2]
            
            if not self.connections.has_key(domain):
                # unknown domain!
                self._write(False)
            else:
                handler = self.connections[domain]
                ret = False
                
                try:
                    if cmd == "auth" and len(data) > 3:
                        ret = handler.auth(user, data[3])
                    elif cmd == "isuser":
                        ret = handler.isuser(user)
                    elif cmd == "setpass" and len(data) > 3:
                        ret = handler.setpass(user, data[3])
                except:
                    # some RestAuth error...
                    pass
                
                self._write(ret)
        
        pass
    
    # ExtAuthLoop
    

# start
ExtAuthLoop().loop()


# same idea: https://stackoverflow.com/a/52551200
# Auth script examples: https://docs.ejabberd.im/developer/guide/#external-authentication
# https://github.com/RestAuth/ejabberd-extauth/blob/master/extauth-restauth.py