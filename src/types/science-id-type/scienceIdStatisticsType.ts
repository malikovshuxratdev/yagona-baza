export interface ScienceIdStatisticsResponse {
    overall: Overall;
    regions: Region[];
}

export interface Overall {
    users_count: number;
    male_count: number;
    female_count: number;
    less40_count: number;
    more40_male_count: number;
    less40_male_count: number;
    more40_female_count: number;
    less40_female_count: number;
    scientific_degree_count: number;
    academic_degree_users_count: number;
    academic_title_users_count: number;
}

export interface Region {
    name: Name;
    code: string;
    users_count: number;
    male_count: number;
    female_count: number;
    less40_count: number;
    scientific_degree_count: number;
    degree_count: number;
    title_count: number;
}

export interface Name {
    uz: string;
}


export type ScienceIdUserRegisterStatisticsDailyByMonthResponse = ScienceIdUserRegisterStatisticsDailyByMonth[]

export interface ScienceIdUserRegisterStatisticsDailyByMonth {
    day: number
    count: number
}

export type ScienceIdUserRegisterStatisticsDailyByYearResponse = ScienceIdUserRegisterStatisticsDailyByYear[]

export interface ScienceIdUserRegisterStatisticsDailyByYear {
    month: number
    count: number
}
