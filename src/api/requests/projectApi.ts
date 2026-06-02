import { arxivApiClient, projectApiClient } from '../baseClient';

// ─── Old loyiha.ilmiy.uz types ───────────────────────────────────────────────

export type ApiColor = 'info' | 'danger' | 'success' | 'warning' | 'primary';

export interface RoleStatItem {
    role: number;
    roleName: string;
    count: number;
    icon: string;
    color: ApiColor;
}

export interface TourStatItem {
    name: string;
    color: ApiColor;
    count: number;
}

export interface TourItem {
    name: string;
    stats: TourStatItem[];
}

export interface OldProjectStatisticsResponse {
    role: RoleStatItem[];
    tour: {
        total: number;
        items: TourItem[];
    };
}

// ─── Arxiv types ─────────────────────────────────────────────────────────────

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

const urls = {
    getProjectStatistics: '/statistics',
    getArxivStatistics: '/scientific-programs/office/stats',
};

export class ProjectApi {
    constructor(
        private projectClient = projectApiClient,
        private arxivClient = arxivApiClient
    ) {}

    getProjectStatistics = async (): Promise<OldProjectStatisticsResponse | null> => {
        try {
            const res = await this.projectClient.get<OldProjectStatisticsResponse, undefined>(
                urls.getProjectStatistics
            );
            return res.data ?? null;
        } catch {
            return null;
        }
    };

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
}

export const projectApi = new ProjectApi();
