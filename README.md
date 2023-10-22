### NOTES

> *Important:* Current implementation contain untested code, hardocoded values, 
all configs are only for development ( without thinking about deployment ), laggy
frontend, etc. Work in progress... If you have ideas or suggestions, please feel 
free to get in touch.

The main idea behind this app is to completely hide XMPP from the outer world 
and also attempt to "include" a chat feature in an existing application. For 
example, if you're asked to add the "chat feature" to client app, where users 
are logged in via the Ory Kratos identity system (like here). Or if your current 
backend unable to implement chat ( f.e. large complicated monolyth ), or if you 
already have microservice architecture...

So this project is just attempt of implementation chat using Ory Kratos, 
Oathkeeper and Ejabberd. When you registering in Kratos, webhook create you user
in ejabberd. When you open front UI - you connect to websocket, go through 
oauthkeeper API gateway, check auth cookie, add x-user header to request and 
next go to "service-chat". Here we get user credentials from ejabberd by x-user 
header, ( disconect if fail ), connect to xmpp with this credentials, and 
establish websocket connection, ready to provide and consume messages.