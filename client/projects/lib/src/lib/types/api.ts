
export interface ApiResponse<T> {
    messages: string[]
    success: boolean
    data: T
}
