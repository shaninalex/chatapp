
export interface ChatMessage {
    user_id: number
    body: string
}


export interface UserStatus {
    user_id: number
    status: boolean
}

export interface AppMessage {
    type: "message" | "app"
    receiver_id: number
    content: ChatMessage | UserStatus
}
