export type LevelUserCountResponse = LevelUserCount[];

export interface LevelUserCount {
    male_user: number;
    female_user: number;
    local_user: number;
    foreign_user: number;
    phd_user: number;
    dc_user: number;
    senior_research_fellow_user: number;
    accociate_professor_user: number;
    professor_user: number;
    academic_user: number;
}

/** Hududlar kesimida: Jami, OTM, ITM, Boshqalari, Ilmiy izlanuvchilar */
export interface LevelRegionStatisticsItem {
    region_code: string;
    region_name: string;
    total: number;
    otm: number;
    itm: number;
    others: number;
    researchers: number;
}

export type LevelRegionStatisticsResponse = LevelRegionStatisticsItem[];
