import React, { useEffect, useRef } from 'react';
import io from 'socket.io-client';
import useTransactions from '../../services/transactions';
import useItems from '../../services/items';
import useAuth from '../../../context/auth';
import useNotifications from '../../services/notifications';

const { REACT_APP_SERVER_PORT } = process.env;

export default function Sockets() {
    const socket = useRef<SocketIOClient.Socket>();
    const { getTransactionsByUser } = useTransactions();
    const { getItemsByUser } = useItems();
    const { add } = useNotifications();
    const { user } = useAuth();
    const userId = user ? user.id : '';

    useEffect(() => {
        socket.current = io(`localhost:${REACT_APP_SERVER_PORT}`);

        socket.current.on('DEFAULT_UPDATE', () => {
            const msg = `New Webhook Event: Item: New Transactions Received`;
            console.log(msg);
        });

        socket.current.on(
            'INITIAL_UPDATE',
            ({
                plaidItemId,
                userId,
                incomingTransactions,
            }: {
                plaidItemId: string;
                userId: string;
                incomingTransactions: string;
            }) => {
                const msg = `New Webhook Event: Item: ${plaidItemId} Initial Transactions Received`;
                console.log(msg);
                console.log(incomingTransactions);
                add(`Last 30 days of transactions received`);
                getItemsByUser(userId);
                getTransactionsByUser(userId);
            },
        );

        socket.current.on('HISTORICAL_UPDATE', ({ plaidItemId, userId }: { plaidItemId: string; userId: string }) => {
            const msg = `New Webhook Event: Item: ${plaidItemId} Historical Transactions Received`;
            console.log(msg);
            add(`Last 2 years of transactions received`);
            getItemsByUser(userId);
            getTransactionsByUser(userId);
        });

        return () => {
            if (socket && socket.current) {
                socket.current.removeAllListeners();
                socket.current.close();
            }
        };
    }, [getTransactionsByUser, getItemsByUser, userId, socket, add]);

    return <div />;
}
