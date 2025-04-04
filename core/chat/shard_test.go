package chat_test

import (
	"github.com/google/uuid"
	"github.com/shaninalex/chatapp/core/chat"
	"github.com/stretchr/testify/assert"
	"testing"
)

func Test_ShardsCapacity(t *testing.T) {
	s := chat.NewShardedMap[string](3)

	for range 1_000_000 {
		key := uuid.NewString()
		val := uuid.NewString()
		s.Put(key, val)
		k := s.Get(key)
		assert.Equal(t, k, val)
	}
}
