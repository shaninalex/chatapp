
export function nameFromJID(JID: string): string {
    const parts = JID.split("@")
    if (parts.length < 2) return JID
    return parts[0]
}

export function subRoomNameFromJID(JID: string): string {
    const parts = JID.split("/")
    if (parts.length < 2) return JID
    return parts[0]
}
