package chat_test

import (
	"github.com/google/uuid"
	"github.com/shaninalex/chatapp/core/chat"
	"github.com/stretchr/testify/assert"
	"testing"
)

func Test_ShardsCapacity(t *testing.T) {
	s := chat.NewShardedMap[string](3)

	// nothing brake on large amount of clients
	for range 1_000_000 {
		key := uuid.NewString()
		val := uuid.NewString()
		s.Put(key, val)
		k := s.Get(key)
		assert.Equal(t, k, val)
	}

	assert.Equal(t, s.Len(), 1_000_000)
}

func Test_ShardsDeleteKey(t *testing.T) {
	s := chat.NewShardedMap[string](3)
	key := uuid.NewString()
	val := uuid.NewString()
	s.Put(key, val)
	k := s.Get(key)

	// Key exists
	assert.Equal(t, k, val)
	s.Delete(key)

	k2 := s.Get(key)

	// Key not exists
	assert.NotEqual(t, k2, val)
}
