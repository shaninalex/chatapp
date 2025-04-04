## 0.2.0 (2025-04-04)

### Feat

- **chat**: clients and hub
- **core**: chat shards structure for user
- start from scratch

## 0.1.0 (2025-04-04)

### Feat

- **schema**: adding user nickname to kratos schema
- **client**: basic layout
- **client**: ngrx
- **xmpp**: create lobby and add user to lobby on register methods
- **api**: add auth controller
- **develop**: setup docker config for local development
- appruve sub
- add ngrx entity
- handle more specific events in service
- send message to selected user
- save user image into ejabberd vcard
- simplify vcard
- hide ejabberd websocket under the oathkeeper api gateway
- select conversation by jid
- add release workflow
- making types for messages
- making auth pages
- start making fronted
- auth middleware and save user to Context
- create jwt token
- setup app routes and basic db

### Fix

- **client**: handle messages stream
- **client**: get rooms with participants ( incorrect subscriptions chain )
- **ui**: avatar component
- **client**: import alias for store
- **client**: sub rooms
- **client**: pipes, libs and small components
- **client**: chat menu
- **client**: conversation area
- **client**: conversations list
- **client**: add mock data for store
- use ngrx for ui
- **client**: search conversations
- **client**: select conversation [8695z26w9]
- **client**: show user subscriptions in conversations list
- **client**: rooms items in conversations list
- **client**: new ui #62
- **client**: (UI) chat menu #62
- **client**: (UI) conversation list and area #62
- **client**: change layout #62
- **client**: Xmpp events distribution service and user subscription ( contacts ) component #62
- **client**: refactor ui #62
- **client**: do not show private messages in group chat
- **backend**: set affiliation member for new user
- **backend**: generate unique nickname [close] #58
- **backend**: add nickname to user traits #58
- **client**: participants list and layout #55
- **client**: message observables and sender form
- **client**: chat status line
- **client**: conversation layout #55
- **client**: join room, show participants, show messages
- **client**: get online rooms information and storing them in ngrx
- **client**: settings form tabs [close] #46
- **backend**: remove idea with nickname in identity traits #45
- **backend**: validate user nickname on register and assign as an ejabberd nickname #45
- **backend**: register hooks handlers functions
- **client**: check notification pubsub node
- **client**: move xmpp client to client application since handlers on client and admin will be different anyways
- **client**: connect to xmpp
- registration pricess
- **backend**: register user with ejabberd user creation process
- **client**: move to module based application instead of standalone
- **config**: update server example configuration
- **server**: connect application to infrastructure
- Chat redux
- update regular registration jsonnet payload
- save vcard to redux contact item
- add store devtools module
- redux and remove typedefs folder
- move identity store to root reducer
- remove redux despatch on xmpp service
- add permission to workflow
- release workflow
- release workflow
- use env variables

### Refactor

- **client**: xmpp events service
- **client**: reduced folder nesting #62
- **client**: xmpp service and ngrx loadIdentity effect
