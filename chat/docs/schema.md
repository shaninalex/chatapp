# schema

## OUTGOING

### Subscribed

```json
{
    "type": "subscribed",
    "payload": {
        "to": "bob@localhost"
    }
}
```
To get information about some one presence ( basicaly "add friend" ) we need to 
unwer to users presence request with this message.

## INCOMMING:

### Subscribe

```json
{
    "type":"subscribe",
    "payload": {
        "from": "bob@localhost"
    }
}
```

This request basicaly mean that some `bob@localhost` want to add you to your 
contact list ( or, technicaly speaking, want to know your presence information ).

### Chat messages

**a)** 

This is chat information message, not actual message. By this messages you get
information about user actions - does he typing the message, does he paused or
he is simple active and ready to get messages

```json
{
    "type": "chat",
    "payload": {
        "from": "bob@localhost",
        "status": "active/paused/composing"
    }
}
```

**b)**

Actual text message. For some reason XMPP send's also <active /> payload with
message body.

```json
{
    "type": "chat",
    "payload": {
        "from": "bob@localhost",
        "status": "active/paused/composing"
        "body": "Actual text message payload"
    }
}
```
