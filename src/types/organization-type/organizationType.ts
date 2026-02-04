export interface OrganizationListParams {
    page: number
    page_size: number
    name?: string
    tin?: string
    admin_id?: number
    supervisor_id?: number
}

export interface OrganizationListResponse {
    status: number
    data: OrganizationListData
}

export interface OrganizationListData {
    page: number
    size: number
    total: number
    items: OrganizationListItem[]
}

export interface OrganizationListItem {
    ID: number
    name: string
    short_name: string
    tin: string
    opf: number
    kfs: number
    oked: string
    soogu: string
    soato: number
    address: string
    director_first_name: string
    director_last_name: string
    director_middle_name: string
    director_pin: string
    ownership_form: string
    legal_form: string
    phone_number: string
    email: string
    supervisor_id: number
    supervisor: unknown
    admin_id: number
    admin: unknown
    is_active: boolean
}

export interface OrganizationDetailResponse {
    status: number
    data: OrganizationListItem
}

export interface OrganizationUpdatePayload {
    id: number
    admin_id: number
    supervisor_id: number
    email: string
    phone_number: string
    legal_form: string
    ownership_form: string
    is_active: boolean
    taxRate: number
}

export interface OrganizationUpdateResponse {
    status: number
    data: OrganizationListItem
}
