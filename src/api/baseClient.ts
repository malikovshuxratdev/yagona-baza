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
    REESTR_URL,
    INTERNSHIP_URL,
    INTERNSHIP_BASIC_AUTH_USERNAME,
    INTERNSHIP_BASIC_AUTH_PASSWORD,
} from '@/constants';

export type ApiClientKey = 'scienceId' | 'reestr' | 'internship';

const URL_MAP: Record<ApiClientKey, string> = {
    scienceId: SCIENCEID_URL,
    reestr: REESTR_URL,
    internship: INTERNSHIP_URL,
};

declare module 'axios' {
    export interface AxiosRequestConfig {
        unhandled?: boolean;
    }
}

export class HTTPError extends Error {
    constructor(public status: number, public cause: string) {
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

        if (key === 'internship' && INTERNSHIP_BASIC_AUTH_USERNAME && INTERNSHIP_BASIC_AUTH_PASSWORD) {
            this.axios.defaults.auth = {
                username: INTERNSHIP_BASIC_AUTH_USERNAME,
                password: INTERNSHIP_BASIC_AUTH_PASSWORD,
            };
        }

        this.axios.interceptors.request.use(this.attachToken);
        this.axios.interceptors.response.use(
            (response: AxiosResponse) => response,
            this.onApiError
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
        if (this.key === 'internship') return req;

        const token = TokenService.getToken();

        if (token && !req.headers['Authorization']) {
            req.headers = req.headers || {};
            req.headers['Authorization'] = `Bearer ${token}`;
        }

        return req;
    };

    private onApiError = async (error: AxiosError) => {
        if (this.key === 'internship') return Promise.reject(error);
        if (error.response?.status === 401) {
            TokenService.clearTokens();
            window.location.href = paths.HOME;
        }
        return Promise.reject(error);
    };

    setAccessToken = (token: string) => {
        const newToken = `Bearer ${token}`;
        this.axios.defaults.headers.common.Authorization = newToken;
        return newToken;
    };

    get = async <T, K, C>(
        url: string,
        params?: K,
        config?: AxiosRequestConfig<C>
    ): Promise<AxiosResponse<T>> => {
        const queryParams = params ? buildParams(params) : '';
        return this.axios.get(url + queryParams, config);
    };

    delete = async <T, K>(url: string, data?: K): Promise<AxiosResponse<T>> => {
        return this.axios.delete(url, { params: data });
    };

    post = async <T, K>(
        url: string,
        data?: K,
        config?: AxiosRequestConfig<K>
    ): Promise<AxiosResponse<T>> => {
        return this.axios.post(url, data, config);
    };

    patch = async <T, K>(
        url: string,
        data?: K,
        config?: AxiosRequestConfig<K>
    ): Promise<AxiosResponse<T>> => {
        return this.axios.patch(url, data, config);
    };

    put = async <T, K>(
        url: string,
        data?: K,
        config?: AxiosRequestConfig<K>
    ): Promise<AxiosResponse<T>> => {
        return this.axios.put(url, data, config);
    };
}

export const scienceIdApiClient = BaseClient.getInstance('scienceId');
export const reestrApiClient = BaseClient.getInstance('reestr');
export const internshipApiClient = BaseClient.getInstance('internship');