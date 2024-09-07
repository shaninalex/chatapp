import { Identity, Session } from "@ory/kratos-client"
import { XmppUserToken } from "./xmpp"

export interface Profile {
    identity: Identity
    session: Session
    token: XmppUserToken
}
