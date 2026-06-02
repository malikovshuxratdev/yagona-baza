import Axios, {
    AxiosError,
    AxiosInstance,
    AxiosRequestConfig,
    AxiosResponse,
    InternalAxiosRequestConfig,
} from 'axios';
import { buildParams } from './helpers';
import { TokenService } from '@/utils/storage';
import paths from '@/routes/path';
import {
    SCIENCEID_URL,
    SCIENCEID_BASIC_AUTH_USERNAME,
    SCIENCEID_BASIC_AUTH_PASSWORD,
    REESTR_URL,
    INTERNSHIP_URL,
    INTERNSHIP_BASIC_AUTH_USERNAME,
    INTERNSHIP_BASIC_AUTH_PASSWORD,
    ACADEM_URL,
    LEVEL_URL,
    LEVEL_MONITORING_URL,
    ARXIV_URL,
    PROJECT_URL,
    PROJECT_BASIC_AUTH_USERNAME,
    PROJECT_BASIC_AUTH_PASSWORD,
    INDEX_URL,
} from '@/constants';
import { ensureAcademToken, clearAcademToken } from './akademAuth';

export type ApiClientKey =
    | 'scienceId'
    | 'reestr'
    | 'internship'
    | 'academ'
    | 'level'
    | 'levelMonitoring'
    | 'arxiv'
    | 'project'
    | 'index';

const URL_MAP: Record<ApiClientKey, string> = {
    scienceId: SCIENCEID_URL,
    reestr: REESTR_URL,
    internship: INTERNSHIP_URL,
    academ: ACADEM_URL,
    level: LEVEL_URL,
    levelMonitoring: LEVEL_MONITORING_URL,
    arxiv: ARXIV_URL,
    project: PROJECT_URL,
    index: INDEX_URL,
};

declare module 'axios' {
    export interface AxiosRequestConfig {
        unhandled?: boolean;
        _retried?: boolean;
    }
}

export class HTTPError extends Error {
    constructor(
        public status: number,
        public cause: string,
    ) {
        super(cause);
    }
}

export class BaseClient {
    private baseUrl: string;
    private axios: AxiosInstance;
    private key: ApiClientKey;
    private static instances: Partial<Record<ApiClientKey, BaseClient>> = {};

    private constructor(baseUrl: string, key: ApiClientKey) {
        this.baseUrl = baseUrl;
        this.key = key;
        this.axios = Axios.create({
            baseURL: this.baseUrl,
        });

        if (
            key === 'scienceId' &&
            SCIENCEID_BASIC_AUTH_USERNAME &&
            SCIENCEID_BASIC_AUTH_PASSWORD
        ) {
            this.axios.defaults.auth = {
                username: SCIENCEID_BASIC_AUTH_USERNAME,
                password: SCIENCEID_BASIC_AUTH_PASSWORD,
            };
        }

        if (
            key === 'internship' &&
            INTERNSHIP_BASIC_AUTH_USERNAME &&
            INTERNSHIP_BASIC_AUTH_PASSWORD
        ) {
            this.axios.defaults.auth = {
                username: INTERNSHIP_BASIC_AUTH_USERNAME,
                password: INTERNSHIP_BASIC_AUTH_PASSWORD,
            };
        }

        if (
            key === 'project' &&
            PROJECT_BASIC_AUTH_USERNAME &&
            PROJECT_BASIC_AUTH_PASSWORD
        ) {
            this.axios.defaults.auth = {
                username: PROJECT_BASIC_AUTH_USERNAME,
                password: PROJECT_BASIC_AUTH_PASSWORD,
            };
        }

        this.axios.interceptors.request.use(this.attachToken);
        this.axios.interceptors.response.use(
            (response: AxiosResponse) => response,
            this.onApiError,
        );
    }

    public static getInstance(key: ApiClientKey): BaseClient {
        if (!BaseClient.instances[key]) {
            const baseUrl = URL_MAP[key];
            if (!baseUrl) {
                throw new Error(`Unknown API client key: ${key}`);
            }
            BaseClient.instances[key] = new BaseClient(baseUrl, key);
        }
        return BaseClient.instances[key];
    }

    private attachToken = async (req: InternalAxiosRequestConfig) => {
        if (this.key === 'academ') {
            const token = await ensureAcademToken();
            req.headers = req.headers || {};
            req.headers['Authorization'] = `ClientAuth ${token}`;
        }
        return req;
    };

    private onApiError = async (error: AxiosError) => {
        if (this.key === 'academ' && error.response?.status === 401) {
            clearAcademToken();
            const config = error.config;
            if (config && !config._retried) {
                config._retried = true;
                const token = await ensureAcademToken();
                config.headers = config.headers || {};
                config.headers['Authorization'] = `ClientAuth ${token}`;
                return this.axios(config);
            }
            return Promise.reject(error);
        }
        return Promise.reject(error);
    };

    setAccessToken = (token: string) => {
        const newToken = `Bearer ${token}`;
        this.axios.defaults.headers.common.Authorization = newToken;
        return newToken;
    };

    get = async <T, K>(
        url: string,
        params?: K,
        config?: AxiosRequestConfig,
    ): Promise<AxiosResponse<T>> => {
        const queryParams = params ? buildParams(params) : '';
        return this.axios.get(url + queryParams, config);
    };

    delete = async <T, K>(
        url: string,
        params?: K,
    ): Promise<AxiosResponse<T>> => {
        return this.axios.delete(url, { params });
    };

    post = async <T, K>(
        url: string,
        data?: K,
        config?: AxiosRequestConfig<K>,
    ): Promise<AxiosResponse<T>> => {
        return this.axios.post(url, data, config);
    };

    patch = async <T, K>(
        url: string,
        data?: K,
        config?: AxiosRequestConfig<K>,
    ): Promise<AxiosResponse<T>> => {
        return this.axios.patch(url, data, config);
    };

    put = async <T, K>(
        url: string,
        data?: K,
        config?: AxiosRequestConfig<K>,
    ): Promise<AxiosResponse<T>> => {
        return this.axios.put(url, data, config);
    };
}

export const scienceIdApiClient = BaseClient.getInstance('scienceId');
export const reestrApiClient = BaseClient.getInstance('reestr');
export const internshipApiClient = BaseClient.getInstance('internship');
export const academApiClient = BaseClient.getInstance('academ');
export const levelApiClient = BaseClient.getInstance('level');
export const levelMonitoringApiClient =
    BaseClient.getInstance('levelMonitoring');
export const arxivApiClient = BaseClient.getInstance('arxiv');
export const projectApiClient = BaseClient.getInstance('project');
export const indexApiClient = BaseClient.getInstance('index');
