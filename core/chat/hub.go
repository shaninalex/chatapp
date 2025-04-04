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
			s.clients.Put(c.UserId().String(), c)
		case c := <-s.unregister:
			s.clients.Delete(c.UserId().String())
		}
	}
}
