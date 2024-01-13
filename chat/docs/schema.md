# schema

### subscribed

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




INCOMMING:

### subscribe
```json
{
    "from": "bob@localhost",
    "type":"subscribe"
}
```
This request basicaly mean that some `bob@localhost` want to add you to your 
contact list ( or, technicaly speaking, want to know your presence information ).
