import React, { ReactElement } from 'react';
import {
    StyledDashboard,
    StyledDashboardTileCol,
    StyledDashboardTileFull,
} from './Styles';
import { BarChartContainer } from '../../shared/components/BarChart/BarChart';
import { TransactionItemList } from '../TransactionItemList/TransactionItemList';
export const Dashboard = (): ReactElement => {
    return (
        <StyledDashboard>
            {/* <AccountList />
            <BarChartContainer />
            <TransactionItemList /> */}
            <StyledDashboardTileFull>
                <BarChartContainer />
            </StyledDashboardTileFull>
            <StyledDashboardTileCol>
                <div style={{ overflow: 'hidden', height: '100%' }}>
                    <TransactionItemList />
                </div>
            </StyledDashboardTileCol>
        </StyledDashboard>
    );
};
