package ejabberd

import (
	"fmt"
	"os"

	"gosrc.io/xmpp"
	"gosrc.io/xmpp/stanza"
)

func (s *api) handleMessage(sender xmpp.Sender, p stanza.Packet) {

	msg, ok := p.(stanza.Message)
	if !ok {
		_, _ = fmt.Fprintf(os.Stdout, "Ignoring packet: %T\n", p)
		return
	}

	_, _ = fmt.Fprintf(os.Stdout, "Body = %s - from = %s\n", msg.Body, msg.From)
	// reply := stanza.Message{Attrs: stanza.Attrs{To: msg.From}, Body: msg.Body}
	// _ = sender.Send(reply)
}

func (s *api) errorHandler(err error) {
	fmt.Println("EJABBED ERROR: ", err.Error())
}
