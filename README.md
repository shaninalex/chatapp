### NOTES

> *Important:* The current implementation may contain untested code, hardcoded values, and all configurations are only for development purposes (without considering deployment). The frontend may also be laggy, and it's a work in progress. If you have any ideas or suggestions, please feel free to get in touch.

## Run

- Copy and all *.example.yaml to *.yml and add some values commented in configs.
- Copy and fill required values to .env file
- start docker:
```bash
make start
```
- install and run oathkeeper by:
```bash
make oathkeeper
```
- run server:
```bash
cd server
# first create lobby room
go run app/main.go --config=./config.yaml --createLobby
# run server with xmpp admin listener
go run app/main.go --config=./config.yaml --runXmpp
```
- run client:
```bash
cd client
yarn client
```

# Production

```bash
# not implemented
```

### How it works

So, this project is an attempt to implement a chat using Ory Kratos, Oathkeeper, and Ejabberd. When you register in Kratos, a webhook creates your user in Ejabberd and adds personal information in [vCard](https://xmpp.org/extensions/xep-0054.html). When you open the front-end UI, you first need to log in (through Kratos), and then the front-end redirects you to a personal page where conversations are happening. The front-end then requests an auth token for connection, and you connect to Ejabberd via the Oathkeeper API gateway using a WebSocket connection with the auth token. The API gateway checks your auth cookies, and finally, you connect to the Ejabberd server.

Why use an auth token instead of a password? Because Ejabberd is a separate server and does not "link" accounts with Kratos identities. I believe that in the real world, if you need to "add" a simple chat in a system where user identity is already set up, you have to do something like that.

