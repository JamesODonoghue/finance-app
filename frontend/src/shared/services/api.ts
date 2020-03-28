const baseURL = '';
const headers: HeadersInit = {
    'content-type': 'application/json',
};

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
    const result = await fetch(`${baseURL}/items/`, {
        method: 'post',
        headers,
        body,
    });

    const json = await result.json();
    return json;
};
