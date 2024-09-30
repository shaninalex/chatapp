import { ReceivedMessage } from "stanza/protocol";
import { XmppService } from "../xmpp.service";
import { Store } from "@ngrx/store";
import { Message } from "@lib";
import { MessageType } from "stanza/Constants";
import { ChatMessageAdd } from "@store/chat/actions";

interface IMessageHandler {
    run(): void
}

function createMessage(msg: ReceivedMessage): Message {
    const message: Message = {
        from: msg.from,
        to: msg.to,
        id: "",
        timestamp: new Date(),
        body: "",
        read: false,
        type: MessageType.Normal,
    };

    if (msg.id) {
        message.id = msg.id;
    }

    if (msg.delay) {
        message.timestamp = new Date(msg.delay.timestamp);
    }

    if (msg.body) {
        message.body = msg.body;
    }

    if (msg.type) [
        message.type = msg.type
    ]

    return message
}

class MessagePayloadHandler implements IMessageHandler {
    private store: Store;
    private msg: ReceivedMessage;

    constructor(store: Store, xmpp: XmppService, msg: ReceivedMessage) {
        this.store = store;
        this.msg = msg;
    }
    run() {
        const message = createMessage(this.msg);
        this.store.dispatch(ChatMessageAdd({ message }))
    }
}

class MessageStateHandler implements IMessageHandler {
    private store: Store;
    private msg: ReceivedMessage;

    constructor(store: Store, xmpp: XmppService, msg: ReceivedMessage) {
        this.store = store;
        this.msg = msg;
    }
    run() { }
}



export class MessageManager {
    private processor: IMessageHandler;

    constructor(store: Store, xmpp: XmppService, msg: ReceivedMessage) {
        if (msg.body) {
            this.processor = new MessagePayloadHandler(store, xmpp, msg);
        } else {
            this.processor = new MessageStateHandler(store, xmpp, msg);
        }
    }

    handle(): void {
        if (!this.processor) return;
        this.processor.run();
    }
}
