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

export interface LevelRegionStatisticsResponse {
    success: boolean
    stats: LevelRegionStatisticsItem[]
}

export interface LevelRegionStatisticsItem {
    region_id: number
    region_name: string
    doktarantura_tashkilotlar_jami: number
    otm: number
    itm: number
    boshqa: number
    doktaranturalar_soni: number
}

/** Xarita region kodi (TN, AN, ...) → Level API region_id */
export const REGION_CODE_TO_LEVEL_API_ID: Record<string, number> = {
    QR: 1,  // Qoraqalpog'iston Respublikasi
    AN: 2,  // Andijon viloyati
    BX: 3,  // Buxoro viloyati
    JZ: 4,  // Jizzax viloyati
    NV: 5,  // Navoiy viloyati
    NM: 6,  // Namangan viloyati
    SD: 7,  // Surxondaryo viloyati
    SN: 8,  // Samarqand viloyati
    QD: 9,  // Qashqadaryo viloyati
    SR: 10, // Sirdaryo viloyati
    TV: 11, // Toshkent viloyati
    FR: 12, // Farg'ona viloyati
    TN: 13, // Toshkent shahri
    XR: 14, // Xorazm viloyati
};
