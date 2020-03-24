const baseURL = '/';
const headers: HeadersInit = {
    'content-type': 'application/json',
};

export const exchangeToken = async ({
    publicToken,
    userToken,
}: {
    publicToken: string;
    userToken: string;
}) => {
    const result = await fetch(`${baseURL}/auth/plaid/public_token`, {
        method: 'post',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify({
            user_token: userToken,
            plaid_token: publicToken,
        }),
    });
    const json = await result.json();
    return json;
};
