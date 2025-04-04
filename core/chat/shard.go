package chat

import (
	"crypto/sha1"
	"encoding/binary"
	"sync"
)

type shard[T any] struct {
	sync.RWMutex
	m map[string]T
}

func (s *shard[T]) len() int {
	s.RLock()
	defer s.RUnlock()
	return len(s.m)
}

type ShardedMap[T any] []*shard[T]

func NewShardedMap[T any](nShards int) ShardedMap[T] {
	shards := make([]*shard[T], nShards)

	for i := range nShards {
		shardMap := make(map[string]T)
		shards[i] = &shard[T]{m: shardMap}
	}

	return shards
}

func (s ShardedMap[T]) Get(key string) T {
	shr := s.getShard(key)
	shr.RLock()
	defer shr.RUnlock()

	return shr.m[key]
}

func (s ShardedMap[T]) Put(key string, value T) {
	shr := s.getShard(key)
	shr.Lock()
	defer shr.Unlock()

	shr.m[key] = value
}

func (s ShardedMap[T]) Delete(key string) {
	shr := s.getShard(key)
	shr.Lock()
	defer shr.Unlock()

	delete(shr.m, key)
}

func (s ShardedMap[T]) Len() int {
	total := 0
	for i := range len(s) {
		total += s[i].len()
	}

	return total
}

func (s ShardedMap[T]) getShard(key string) *shard[T] {
	checksum := sha1.Sum([]byte(key))
	hashInt := binary.BigEndian.Uint64(checksum[0:8])
	idx := int(hashInt % uint64(len(s)))
	return s[idx]
}
