export interface IXmppService {
    connect(id: string, token: string, host: string): void
}

export interface XmppUserToken {
    token: string
    expire: number
}
