import { Identity, Session } from "@ory/kratos-client"
import { XmppUserToken } from "@lib"

export interface Profile {
    identity: Identity
    session: Session
    token: XmppUserToken
}
