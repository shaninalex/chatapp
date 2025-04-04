package chat

import (
	"context"
	"github.com/google/uuid"
)

// IShardedMap is the data structure that holds online clients
type IShardedMap[T any] interface {
	Get(key string) T
	Put(key string, value T)
	Delete(key string)
	Len() int
}

// IHub manage client communication
type IHub interface {
	Unregister(c IClient)
	Register(c IClient)
	Run()

	//Broadcast(msg *any)
	//Direct(userId uuid.UUID, msg *any)
}

// IClient defines the expected behavior of a WebSocket client
type IClient interface {
	UserId() uuid.UUID
	SessionID() uuid.UUID
	Close()
	Consume(hub IHub)
	Error(err error)
	Context() context.Context

	//SendMessage(msg *any)
}
