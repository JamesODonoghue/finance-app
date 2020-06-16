import React, { ReactElement } from 'react';
import { StyledDashboard } from './Styles';
import { BarChartContainer } from '../../shared/components/BarChart/BarChart';
import { TransactionItemList } from '../TransactionItemList/TransactionItemList';
import { AccountList } from '../AccountList/AccountList';
export const Dashboard = (): ReactElement => {
    return (
        <StyledDashboard>
            {/* <AccountList /> */}
            <BarChartContainer />
            <TransactionItemList />
        </StyledDashboard>
    );
};
