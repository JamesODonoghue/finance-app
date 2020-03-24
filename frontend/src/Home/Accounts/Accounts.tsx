import React, { useCallback } from 'react';
import { usePlaidLink } from 'react-plaid-link';
import { getToken } from '../../shared/utils/auth';

import './Accounts.css';
import { exchangeToken } from '../../shared/services/api';
export interface PlaidItem {
    institution: Institution;
    account: Account;
    account_id: null;
    accounts: Account[];
    link_session_id: string;
    public_token: string;
}

export interface Account {
    id: null | string;
    name: null | string;
    type: null | string;
    subtype: null | string;
    mask: null | string;
}

export interface Institution {
    name: string;
    institution_id: string;
}

export const Accounts = () => {
    let accounts: Account[] = [];
    const onSuccess = useCallback(async (publicToken: string) => {
        exchangeToken({ publicToken, userToken: getToken() as string });
    }, []);

    const config = {
        clientName: 'James Budget App',
        env: process.env.REACT_APP_PLAID_ENV as string,
        product: ['auth', 'transactions'],
        publicKey: process.env.REACT_APP_PLAID_PUBLIC_KEY as string,
        onSuccess,
    };

    const { open } = usePlaidLink(config);
    return (
        <div className="accounts">
            <div className="accounts_title">Accounts</div>
            <div className="accounts_body">
                {accounts
                    ? accounts.map(account => (
                          <div className="account">
                              <div className="account_name">{account.name}</div>
                              <div className="account_name">
                                  {account.subtype}
                              </div>
                              <div></div>
                          </div>
                      ))
                    : ''}
                <button className="account account_new" onClick={() => open()}>
                    <div className="account_name">Add new account</div>
                </button>
            </div>
        </div>
    );
};
