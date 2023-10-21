### NOTES

- https://github.com/FluuxIO/go-xmpp - go package to interacti with ejabberd
- https://comfy.guide/server/ejabberd/ - docs and guids
- https://www.youtube.com/watch?v=OVN99SgBGkM - nodejs simple-xmpp

### XMPP:
- 5280 - port for api
- 5280/admin - web admin
- 5222 - xmpp connection
- TODO: - websocket connection


## CLI
```bash

# create user
$ ./bin/ejabberdctl register admin localhost password

# create Oauth api key
# oauth_issue_token - command
# admin@localhost - JID
# 3600 - token live time
# ejabberd:admin - scope
$ ./bin/ejabberdctl oauth_issue_token admin@localhost 3600 ejabberd:admin

```

## API
Postman documentation: https://documenter.getpostman.com/view/11586531/2s9YRB3sLr
