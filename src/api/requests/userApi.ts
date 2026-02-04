import { AxiosResponse } from 'axios';
import { baseApiClient } from '../baseClient';
import { UserProfileResponse } from '@/types';

const urls = {
    userProfile: '/user/profile',
};

export class UserApi {
    constructor(private api = baseApiClient) { }

    userProfile = async () => {
        const result: AxiosResponse<UserProfileResponse> =
            await this.api.get(urls.userProfile);
        return result.data;
    }
}

export const userApi = new UserApi();