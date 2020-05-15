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

export const getItemsByUser = (userId: string) =>
    api.get(`/users/${userId}/items`);

export const getAccountsByItem = (itemId: string) =>
    api.get(`/items/${itemId}/accounts`);

export const clearAllAccounts = () => api.post('/accounts/clear');

export const seedFakeItem = () => api.post('/items/seed');
export const clearItems = () => api.post('/items/clear');

export const getInstitutionById = (id: string) =>
    api.get(`/plaid/institutions/${id}`);

export const exchangeToken = async ({
    publicToken,
    userId,
    institutionId,
}: {
    publicToken: string;
    userId: string;
    institutionId: string;
}) => {
    const body = JSON.stringify({
        publicToken,
        userId,
        institutionId,
    });
    const result = await api.post(`${baseURL}/items/`, { body });
    const json = await result.json();
    return json;
};
