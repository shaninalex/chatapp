export interface Conv {
    id: string
    name: string
    time: Date
    preview: string
    unread: number
    selected: boolean
    image?: string
    room: boolean
}

export interface CollocutorItem {
    id: string
    image: string
    name: string
}
