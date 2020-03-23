import React, { useCallback } from 'react';
import { usePlaidLink } from 'react-plaid-link';
import { getToken } from '../../shared/utils/auth';

import './Accounts.css';
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
    // const [accounts, setAccounts] = useState<Account[]>();
    let accounts: Account[] = [];
    const onSuccess = useCallback(
        async (token: string, metadata: PlaidItem) => {
            let result = await fetch('/auth/plaid/public_token', {
                method: 'post',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify({
                    user_token: getToken(),
                    plaid_token: token,
                }),
            });
            let json = await result.json();
            console.log(json);
        },
        [],
    );

    const config = {
        clientName: 'James Budget App',
        env: 'sandbox',
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
