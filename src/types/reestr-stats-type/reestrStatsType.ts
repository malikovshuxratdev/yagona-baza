export type ReestrOrgClassStatisticsResponse = ReestrOrgClassStatisticsItem[]

export interface ReestrOrgClassStatisticsItem {
    org_class: string
    label: string
    count: number
}

export type ReestrPassportTemplateStatisticsResponse = ReestrPassportTemplateStatisticsItem[]

export interface ReestrPassportTemplateStatisticsItem {
    passport_template: string
    label: string
    count: number
}

export interface ReestrRegionStatisticsResponse {
    region_soato: string
    region_name: ReestrNameType
    items: ReestrOrgClassStatisticsItem[]
}

export interface ReestrOrganizationListResponse {
    page: number
    pageSize: number
    count: number
    total: number
    pagesCount: number
    data: ReestrOrganizationListItem[]
}

export interface ReestrOrganizationListItem {
    id: number
    tin: string
    name: string
    short_name: string
    created_at: string
    status: string
    org_class?: string
    passport_template?: string
}

export interface ReestrOrganizationDetailResponse {
    id: number
    address: string
    director: ReestrDirector
    social: Social
    admin: any
    classification_leaf: any
    billing_address: BillingAddress
    founders: ReestrFounder[]
    bank: any[]
    classification_lineage: any[]
    opf: Opf
    soogu: Soogu
    oked: Oked
    created_at: string
    updated_at: string
    tin: string
    org_class: string
    passport_template: string
    classification_code: string
    status: string
    name: string
    short_name: string
    logo: any
    kfs: string
    registration_date: string
    ext_status: string
    business_type: string
    business_fund_currency: string
    business_fund: string
    activity_code: any
    phone: any
    email: any
    website: any
    fax: any
    avg_number_employees: number
    scientific_employees_count: any
    accepted_datetime: any
    is_published: boolean
    opf_fk: number
    oked_fk: number
    soogu_fk: number
}

export interface ReestrDirector {
    id: number
    fullname: string
    science_id: any
    last_name: string
    first_name: string
    middle_name: string
    gender: number
    nationality: string
    citizenship: string
    passport_series: string
    passport_number: string
    pinfl: string
    tin: string
    birth_date: any
    individual_id: any
    country_code: string
    soato: number
    phone: string
    email: any
}

export interface Social {
    telegram: any
    instagram: any
    facebook: any
    website: any
}

export interface BillingAddress {
    id: number
    district: District
    created_at: string
    updated_at: string
    country_code: string
    soato: string
    village_code: string
    street_name: string
    post_code: any
    cadastre_number: any
    organization: number
}

export interface District {
    id: number
    region: ReestrRegion
    created_at: string
    updated_at: string
    name: ReestrNameType
    soato: string
}

export interface ReestrRegion {
    id: number
    name: ReestrNameType
    soato: string
}

export interface ReestrNameType {
    oz: string
    ru: string
    uz: string
}

export interface ReestrFounder {
    name: string
    tin: string
    share_sum: number
    share_percent: number
    type: string
}

export interface Opf {
    id: number
    code: string
    name: string
    short_name: string
}

export interface Soogu {
    id: number
    code: string
    name: string
}

export interface Oked {
    id: number
    code: string
    name: string
}

