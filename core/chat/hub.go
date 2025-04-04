package chat

type Hub struct {
	clients    ShardedMap[IClient]
	register   chan IClient
	unregister chan IClient
}

// Register used for adding client to clients map
func (s Hub) Register(c IClient) { s.unregister <- c }

// Unregister used for removing client from clients map
func (s Hub) Unregister(c IClient) { s.register <- c }

// Run is starting all goroutines
func (s Hub) Run() {
	for {
		select {
		case c := <-s.register:
			s.clientAdd(c)
		case c := <-s.unregister:
			s.clientRemove(c)
		}
	}
}

func (s Hub) clientAdd(c IClient) {
	s.clients.Put(c.UserId().String(), c)
}

func (s Hub) clientRemove(c IClient) {
	c.Close()
	s.clients.Delete(c.UserId().String())
}
