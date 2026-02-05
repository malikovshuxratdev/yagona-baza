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

