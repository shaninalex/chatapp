### NOTES

> *Important:* The current implementation may contain untested code, hardcoded values, and all configurations are only for development purposes (without considering deployment). The frontend may also be laggy, and it's a work in progress. If you have any ideas or suggestions, please feel free to get in touch.

### How it works

So, this project is an attempt to implement a chat using Ory Kratos, Oathkeeper, and Ejabberd. When you register in Kratos, a webhook creates your user in Ejabberd and adds personal information in [vCard](https://xmpp.org/extensions/xep-0054.html). When you open the front-end UI, you first need to log in (through Kratos), and then the front-end redirects you to a personal page where conversations are happening. The front-end then requests an auth token for connection, and you connect to Ejabberd via the Oathkeeper API gateway using a WebSocket connection with the auth token. The API gateway checks your auth cookies, and finally, you connect to the Ejabberd server.

Why use an auth token instead of a password? Because Ejabberd is a separate server and does not "link" accounts with Kratos identities. I believe that in the real world, if you need to "add" a simple chat in a system where user identity is already set up, you have to do something like that.


### Why?


The main idea behind this app is to "include" a chat feature in an existing application and hide XMPP from the outer world. For example, if you're asked to add the "chat feature" to a client app where users are logged in via the Ory Kratos identity system (as shown here). Or if your current backend is unable to implement chat, or if you already have a microservices architecture... Or you do not want to reinvent the wheel and create yet another WebSocket chat.

### Run app

```bash
# Runing app in hooks mode
go run ./server/app/main.go --config=./server/config.yaml
```
