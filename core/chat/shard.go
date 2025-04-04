package chat

import (
	"crypto/sha1"
	"encoding/binary"
	"sync"
)

type Shard[T any] struct {
	sync.RWMutex
	m map[string]T
}

type ShardedMap[T any] []*Shard[T]

func NewShardedMap[T any](nShards int) ShardedMap[T] {
	shards := make([]*Shard[T], nShards)

	for i := range nShards {
		shardMap := make(map[string]T)
		shards[i] = &Shard[T]{m: shardMap}
	}

	return shards
}

func (s ShardedMap[T]) Get(key string) T {
	shard := s.getShard(key)
	shard.RLock()
	defer shard.RUnlock()
	return shard.m[key]
}

func (s ShardedMap[T]) Put(key string, value T) {
	shard := s.getShard(key)
	shard.Lock()
	defer shard.Unlock()
	shard.m[key] = value
}

func (s ShardedMap[T]) getShard(key string) *Shard[T] {
	checksum := sha1.Sum([]byte(key))
	hashInt := binary.BigEndian.Uint64(checksum[0:8])
	idx := int(hashInt % uint64(len(s)))
	return s[idx]
}
