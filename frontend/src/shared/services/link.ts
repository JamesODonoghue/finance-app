import { useCallback } from 'react';
import { exchangeToken, getItemsByUser } from './api';
import { usePlaidLink } from 'react-plaid-link';
import useAuth from '../../context/auth';

export const useLink = () => {
    // const [webhookUrl, setWebhookUrl] = useState<string | null>();
    const { user } = useAuth();
    const userId = user ? user.id : '';

    const plaidConfig = {
        clientName: 'My Finance App',
        env: 'sandbox',
        product: ['auth', 'transactions'],
        publicKey: process.env.REACT_APP_PLAID_PUBLIC_KEY as string,
    };
    // useEffect(() => {
    //     const getUrl = async () => {
    //         const { data } = await getWebhooksUrl();
    //         setWebhookUrl(data);
    //     };
    //     getUrl();
    // }, []);

    const onSuccess = useCallback(
        async (publicToken, metadata) => {
            const {
                institution: { institution_id: institutionId },
            } = metadata;

            await exchangeToken({
                publicToken,
                institutionId,
                userId,
            });
            getItemsByUser(userId);
        },
        [userId],
    );
    const { open } = usePlaidLink({
        ...plaidConfig,
        webhook: 'https://26dc8e26afb7.ngrok.io/plaid/webhook',
        onSuccess,
    });

    return { open };
};
