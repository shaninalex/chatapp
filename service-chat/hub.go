package main

type Hub struct {
	DB         *Database
	Clients    map[*Client]bool
	Register   chan *Client
	Unregister chan *Client
}

func InitHub(database *Database) *Hub {
	return &Hub{
		DB:         database,
		Clients:    make(map[*Client]bool),
		Register:   make(chan *Client),
		Unregister: make(chan *Client),
	}
}

func (h *Hub) Run() {
	for {
		select {
		case client := <-h.Register:
			h.Clients[client] = true
		case client := <-h.Unregister:
			if _, ok := h.Clients[client]; ok {
				delete(h.Clients, client)
				close(client.Send)
			}
		}
	}
}
