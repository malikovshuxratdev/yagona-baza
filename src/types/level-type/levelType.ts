export type LevelUserCountResponse = LevelUserCount[]

export interface LevelUserCount {
    male_user: number
    female_user: number
    local_user: number
    foreign_user: number
    phd_user: number
    dc_user: number
    senior_research_fellow_user: number
    accociate_professor_user: number
    professor_user: number
    academic_user: number
}
