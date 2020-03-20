import React from 'react';
import './Accounts.css';
import { Activity } from '../Activity/Activity';

export const Accounts = () => {
    return (
        <div className="accounts">
            <div className="accounts_title">Accounts</div>
            <div className="accounts_body">
                <div className="account">
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
                </div>
            </div>
        </div>
    );
};
