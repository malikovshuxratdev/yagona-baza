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
import { SCIENCEID_URL } from '@/constants';

const API_URL = SCIENCEID_URL;

declare module 'axios' {
    export interface AxiosRequestConfig {
        _retry?: boolean;
        unhandled?: boolean;
    }
}

export class HTTPError extends Error {
    constructor(public status: number, public cause: string) {
        super(cause);
    }
}
export class BaseClient {
    private baseUrl = API_URL;
    private axios: AxiosInstance;
    private static instance: BaseClient | null = null;

    private constructor() {
        this.axios = Axios.create({
            baseURL: this.baseUrl,
        });

        // Request interceptor for attaching the token
        this.axios.interceptors.request.use(this.attachToken);
        // Response interceptor for handling errors
        this.axios.interceptors.response.use(
            (response: AxiosResponse) => response,
            this.onApiError
        );
    }

    public static getInstance(): BaseClient {
        if (!BaseClient.instance) {
            BaseClient.instance = new BaseClient();
        }
        return BaseClient.instance;
    }

    // Request interceptor for attaching token
    private attachToken = async (req: InternalAxiosRequestConfig) => {
        const token = TokenService.getToken();

        if (token && !req.headers['Authorization']) {
            req.headers = req.headers || {};
            req.headers['Authorization'] = `Bearer ${token}`;
        }

        return req;
    };

    // API Error handler
    private onApiError = async (error: AxiosError) => {
        const originalRequest = error.config;

        // Agar refresh token so'rovi bo'lsa, uni interceptor orqali o'tkazmaslik kerak
        if (originalRequest?.url?.includes('/auth/refresh-token')) {
            return Promise.reject(error);
        }

        if (originalRequest && !originalRequest._retry) {
            originalRequest._retry = true;
            if (error.response?.status === 401) {
                // Refresh token orqali access tokenni yangilash
                const refreshed = await this.refreshToken();
                if (refreshed) {
                    // Yangilangan access token bilan so‘rovni qayta yuborish
                    return this.axios(originalRequest);
                } else {
                    // Refresh token ham ishlamasa, tokenlarni tozalab, login sahifasiga yo'naltirish
                    TokenService.clearTokens();
                    window.location.href = paths.HOME;
                    return;
                }
            }
            if (error.response?.status === 502) {
                return Promise.reject(error);
            }
        }

        return Promise.reject(error);
    };

    // Refresh token method
    private refreshToken = async (): Promise<boolean> => {
        try {
            const refreshToken = TokenService.getRefreshToken();
            if (!refreshToken) {
                return false;
            }

            // Refresh endpointga so‘rov yuboriladi
            const response = await Axios.get(
                `${this.baseUrl}/auth/refresh-token?refresh_token=${refreshToken}`,
                {
                    // Interceptor orqali o'tkazmaslik uchun
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            // Response strukturasi: { status: 200, data: { access_token, refresh_token } }
            const { access_token } = response.data?.data || {};

            if (access_token) {
                TokenService.setToken(access_token, refreshToken);
                this.setAccessToken(access_token);
                return true;
            } else {
                return false;
            }
        } catch (error) {
            // Agar refresh token ham 401 bersa, login sahifasiga yo'naltirish
            if (error instanceof AxiosError && error.response?.status === 401) {
                TokenService.clearTokens();
                window.location.href = paths.HOME;
            }
            return false;
        }
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

export const baseApiClient = BaseClient.getInstance();
