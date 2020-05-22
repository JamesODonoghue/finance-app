import React from 'react';
import './Dashboard.css';
import { TransactionItemList } from '../TransactionItemList/TransactionItemList';
export const Dashboard = () => {
    return (
        <div className="dashboard">
            <div className="title">Dashboard</div>
            <TransactionItemList />
        </div>
    );
};
