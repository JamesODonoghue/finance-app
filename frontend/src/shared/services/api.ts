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
