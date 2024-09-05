import axios from "axios";
import {mockApiAsset, mockOption, mockUser} from "./mock";

const nodeEnv: string = process.env.NODE_ENV

const instance = axios.create({
    baseURL: `/index.php?rest_route=/cardano-connect/`,
    withCredentials: true,
});

export async function get(route: string, options?: any) {
    return await instance
        .get(`${route}`, options)
        .then(({ data }) => {
            return data;
        })
        .catch((error) => {
            throw error;
        });
}

export async function post(route: string, body = {}) {
    return await instance
        .post(`${route}`, body)
        .then(({ data }) => {
            return data;
        })
        .catch((error) => {
            throw error;
        });
}

export async function backendGetOptions(nonce: string): Promise<AjaxResponse<Options>> {
    instance.defaults.headers.common['X-WP-Nonce'] = nonce
    return nodeEnv === 'development' ? mockOption : await get(`options`);
}

export async function backendGetUser(nonce: string): Promise<AjaxResponse<UserData>> {
    instance.defaults.headers.common['X-WP-Nonce'] = nonce
    return nodeEnv === 'development' ? mockUser : await get(`user`);
}

export async function backendGetRewards(nonce: string): Promise<AjaxResponse<UserData>> {
    instance.defaults.headers.common['X-WP-Nonce'] = nonce
    return await get(`rewards`);
}

export async function backendGetAsset(data: {
    asset: string
    nonce: string
}): Promise<AjaxResponse<ApiAsset>> {
    instance.defaults.headers.common['X-WP-Nonce'] = data.nonce
    return nodeEnv === 'development' ? mockApiAsset : await get(`asset/${data.asset}`);
}

export async function backendConnect(data: {
     nonce: string,
     message: string,
     address: string,
     stakeAddress: string,
     signature: string,
     wallet: string,
     network: number
 }): Promise<AjaxResponse<UserData>> {
    instance.defaults.headers.common['X-WP-Nonce'] = data.nonce
    return await post(`connect`, {
        message: data.message,
        address: data.address,
        stake_address: data.stakeAddress,
        signature: data.signature,
        wallet: data.wallet,
        network: data.network
    });
}

export async function backendDisconnect(nonce: string): Promise<AjaxResponse<null>> {
    instance.defaults.headers.common['X-WP-Nonce'] = nonce
    return await get(`disconnect`);
}
