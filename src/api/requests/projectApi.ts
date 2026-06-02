import { arxivApiClient, projectApiClient } from '../baseClient';

export interface ArxivByYearItem {
    year: number;
    start_count: number;
    end_count: number;
}

export interface ArxivStatisticsResponse {
    total_projects: number;
    total_project_owners: number;
    total_executive_organizations: number;
    total_otm: number;
    total_itm: number;
    total_other: number;
    by_year: ArxivByYearItem[];
}

export type ApiColor = 'info' | 'success' | 'warning' | 'danger' | 'primary';

export interface RoleStatItem {
    roleName: string;
    count: number;
    color: ApiColor;
}

export interface TourStatItem {
    name: string;
    count: number;
    color: ApiColor;
}

export interface TourItem {
    name: string;
    stats: TourStatItem[];
}

export interface ProjectStatsResponse {
    role: RoleStatItem[];
    tour: {
        total: number;
        items: TourItem[];
    };
}

const urls = {
    getArxivStatistics: '/scientific-programs/office/stats',
    getProjectStats: '/statistics',
};

export class ProjectApi {
    constructor(
        private arxivClient = arxivApiClient,
        private projectClient = projectApiClient,
    ) {}

    getArxivStatistics = async (): Promise<ArxivStatisticsResponse | null> => {
        try {
            const res = await this.arxivClient.get<ArxivStatisticsResponse, undefined>(
                urls.getArxivStatistics
            );
            return res.data ?? null;
        } catch {
            return null;
        }
    };

    getProjectStats = async (): Promise<ProjectStatsResponse | null> => {
        try {
            const res = await this.projectClient.get<ProjectStatsResponse, undefined>(
                urls.getProjectStats
            );
            return res.data ?? null;
        } catch {
            return null;
        }
    };
}

export const projectApi = new ProjectApi();
