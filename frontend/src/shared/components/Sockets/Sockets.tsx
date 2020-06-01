import React, { useEffect, useRef } from 'react';
import io from 'socket.io-client';
import useTransactions from '../../services/transactions';
import useItems from '../../services/items';
import { getAccountsByItem } from '../../services/api';
import useAuth from '../../../context/auth';

const { REACT_APP_SERVER_PORT } = process.env;

export default function Sockets() {
    const socket = useRef() as any;
    const { getTransactionsByUser } = useTransactions();
    const { getItemsByUser } = useItems();
    const { user } = useAuth();
    const { userId } = user;

    useEffect(() => {
        socket.current = io(`localhost:${REACT_APP_SERVER_PORT}`);

        socket.current.on('DEFAULT_UPDATE', () => {
            const msg = `New Webhook Event: Item: New Transactions Received`;
            console.log(msg);
        });

        // socket.current.on('TRANSACTIONS_REMOVED', ({ itemId } = {}) => {
        //     const msg = `New Webhook Event: Item ${itemId}: Transactions Removed`;
        //     console.log(msg);
        // });

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
                getItemsByUser(userId);
                getTransactionsByUser(userId);
            },
        );

        socket.current.on(
            'HISTORICAL_UPDATE',
            ({
                plaidItemId,
                userId,
            }: {
                plaidItemId: string;
                userId: string;
            }) => {
                const msg = `New Webhook Event: Item: ${plaidItemId} Historical Transactions Received`;
                console.log(msg);
                getItemsByUser(userId);
                getTransactionsByUser(userId);
            },
        );

        // socket.current.on('ERROR', ({ itemId, errorCode } = {}) => {
        //     const msg = `New Webhook Event: Item ${itemId}: Item Error ${errorCode}`;
        //     console.error(msg);
        //     getItemById(itemId, true);
        // });

        return () => {
            socket.current.removeAllListeners();
            socket.current.close();
        };
    }, [getTransactionsByUser, getItemsByUser, userId]);

    return <div />;
}
