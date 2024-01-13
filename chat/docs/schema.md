# CLIENT SEND

### Subscribe

```json
{
    "type": "subscribe",
    "payload": {
        "to": "bob@localhost"
    }
}
```

To get information about his presence ( basicaly "add friend" ) we need to send
this payload. If user confirm your request with response below ( "subscribed" ),
Your roster will be updated. Roster is basicaly list of entities you subscribed
to see their presence ( if I understand correctly )

### Subscribed

```json
{
    "type": "subscribed",
    "payload": {
        "to": "bob@localhost"
    }
}
```
To confirm some one's request about your presence we need to answer to users presence request with this message. After that recepient will be able to see 
your presence information ( online/offline etc... )

### Chat
```json
{
    "type": "chat",
    "payload": {
        "to": "bob@localhost/<deviceId>",
        "body": "message text",
        "status": "active"
    }
}
```
Chat messages has required `to` attribute in payload and optional `body` and `status`
`status` field needs to send user chat status notification. I can be only this 
types:
- `active`
- `composing`
- `paused`
- `gone`
- `inactive`

`body` - is simple text message.

Sending `chat` messages without body or status will not send in xmpp server



# CLIENT RECEIVE

### Subscribe

```json
{
    "type":"subscribe",
    "payload": {
        "from": "bob@localhost/<deviceId>"
    }
}
```

This request basicaly mean that some `bob@localhost` want to add you to your 
contact list ( or, technicaly speaking, want to know your presence information ).

Same object by with `type` = `subscribed` you receive when some one authorize
your subscribtion request.

### Chat messages

**a)** 

This is chat information message, not actual message. By this messages you get
information about user actions - does he typing the message, does he paused or
he is simple active and ready to get messages

```json
{
    "type": "chat",
    "payload": {
        "from": "bob@localhost/<deviceId>",
        "status": "<status type>"
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
        "from": "bob@localhost/<deviceId>",
        "status": "<status type>",
        "body": "Actual text message payload"
    }
}
```

Statuses can be only:
- `active`
- `composing`
- `paused`
- `gone`
- `inactive`
