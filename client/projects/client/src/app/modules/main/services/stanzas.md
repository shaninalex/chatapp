

get list of pubsubs
```xml
<iq type="get" to="pubsub.localhost" id="sasdasd" xmlns="jabber:client">
  <pubsub xmlns="http://jabber.org/protocol/pubsub">
    <subscriptions />
</pubsub>
</iq>
```

Subscribe to node
```xml
<iq xmlns="jabber:client" to="pubsub.localhost" type="set" id="ef09e036-008a-4913-86a9-1c6af1e6c3be">
  <pubsub xmlns="http://jabber.org/protocol/pubsub">
    <subscribe node="/home/ejabberd/2f567e09-886a-43c6-a858-7dada654568b/notifications" jid="2f567e09-886a-43c6-a858-7dada654568b@localhost" />
  </pubsub>
</iq>
```