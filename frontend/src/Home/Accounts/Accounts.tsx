import React, { useCallback, useState } from 'react';
import { usePlaidLink } from 'react-plaid-link';
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
    const [accounts, setAccounts] = useState<Account[]>();
    const onSuccess = useCallback(
        async (token: string, metadata: PlaidItem) => {
            // console.log(token, JSON.stringify(metadata));
            // send token to server
            let result = await fetch('/plaid/item', {
                method: 'post',
                body: JSON.stringify({ token }),
            });
            setAccounts(metadata.accounts);

            console.log(result);
        },
        [],
    );

    const config = {
        clientName: 'James Budget App',
        env: 'sandbox',
        product: ['auth', 'transactions'],
        publicKey: '713e501f6c629c0f0eaa8515c3ffba',
        onSuccess,
    };

    const { open, ready, error } = usePlaidLink(config);
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
                {/* <div className="account">
                    <div className="account_name">Balance</div>
                    <div className="account_balance">$3,456.00</div>
                    <div></div>
                </div>
                <div className="account">
                    <div className="account_name">Balance</div>
                    <div className="account_balance">$3,456.00</div>
                    <div></div>
                </div>
                <div className="account">
                    <div className="account_name">Balance</div>
                    <div className="account_balance">$3,456.00</div>
                    <div></div>
                </div> */}

                <button className="account account_new" onClick={() => open()}>
                    <div className="account_name">Add new account</div>
                </button>
            </div>
        </div>
    );
};
