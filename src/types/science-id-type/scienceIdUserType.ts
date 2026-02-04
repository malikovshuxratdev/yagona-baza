export interface ScienceIdUserListResponse {
    page: number
    page_size: number
    previous: any
    next: string
    count: number
    total_pages: number
    results: ScienceIdUser[]
}

export interface ScienceIdUser {
    id: number
    science_id: string
    full_name: string
    live_status: boolean
    phone_number?: string
    registered_at: string
    email?: string
    profile_image: any
}


export interface ScienceIdUserDetailResponse {
    id: number
    science_id: string
    full_name: string
    live_status: boolean
    phone_number: string
    registered_at: string
    email: string
    profile_image: any
}
