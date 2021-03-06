import { Item } from '../../types/item';

const baseURL = '';
const headers: HeadersInit = {
    'content-type': 'application/json',
};

const api = {
    get: (url: string, options?: RequestInit) =>
        fetch(`${baseURL}${url}`, {
            ...options,
            method: 'get',
            headers,
        }),
    post: (url: string, options?: RequestInit) =>
        fetch(`${baseURL}${url}`, {
            ...options,
            method: 'post',
            headers,
        }),
};

export const getItemsByUser = (userId: string): Promise<Response> => api.get(`/users/${userId}/items`);
export const getTransactionsByUser = (userId: string): Promise<Response> => api.get(`/users/${userId}/transactions`);
export const getAccountsByItem = (plaidItemId: string): Promise<Response> => api.get(`/items/${plaidItemId}/accounts`);
export const clearAllAccounts = (): Promise<Response> => api.post('/accounts/clear');
export const clearAllItems = (): Promise<Response> => api.post('/items/clear');

export const seedFakeItem = (): Promise<Response> => api.post('/items/seed');
export const clearItems = (): Promise<Response> => api.post('/items/clear');
export const getWebhooksUrl = async (): Promise<{ data: string | undefined }> => {
    try {
        const response = await api.get('/ngrok');
        const json = await response.json();
        const { url: urlBase } = json;

        return {
            data: urlBase ? `${urlBase}/plaid/webhook` : '',
        };
    } catch (err) {
        console.error('Error fetching webhook url');
        return { data: undefined };
    }
};

export const exchangeToken = async ({
    publicToken,
    userId,
    institutionId,
}: {
    publicToken: string;
    userId: string;
    institutionId: string;
}): Promise<Item> => {
    const body = JSON.stringify({
        publicToken,
        userId,
        institutionId,
    });
    const result = await api.post(`${baseURL}/items/`, { body });
    const json = await result.json();
    return json;
};
