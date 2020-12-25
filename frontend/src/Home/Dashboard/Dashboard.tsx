import React, { FC, Fragment, useEffect } from 'react';
import useTransactions, { DATE_RANGES } from '../../shared/services/transactions';
import useAuth from '../../context/auth';

export const getCurrency = (value = 0) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
export const Dashboard: FC = () => {
    const { amountSpentMonthly, getTransactionsByUser, currentDateRange } = useTransactions();
    const { user } = useAuth();

    useEffect(() => {
        user && getTransactionsByUser(user.id);
    }, [user, getTransactionsByUser]);

    const getCurrentSpent = () => {
        switch (currentDateRange.value) {
            case DATE_RANGES.THIS_MONTH:
                return amountSpentMonthly[0]?.value;
            case DATE_RANGES.LAST_MONTH:
                return amountSpentMonthly[1]?.value;
            case DATE_RANGES.THIS_YEAR:
                return amountSpentMonthly
                    .slice(0, 11)
                    .reduce((prev, acc) => ({ date: prev.date, value: prev.value + acc.value })).value;
        }
    };

    return (
        <Fragment>
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 font-semibold">
                <div className="p-6 bg-indigo-600 rounded-lg shadow-xl">
                    <div className="uppercase text-sm text-gray-300 mb-4 font-semibold">Total Budget</div>
                    <div className="text-4xl text-white font-semibold">$4,000.00</div>
                </div>
                <div className="bg-white rounded-lg shadow-card text-gray-800">
                    <div className="p-6">
                        <div className="mb-4 uppercase text-sm text-gray-600">Total Expenses</div>
                        <div className="mb-2 text-4xl">{getCurrency(getCurrentSpent())}</div>
                        {/* <div className="text-green-700 font-medium">- $420.00</div> */}
                    </div>
                    <a
                        className="text-center font-medium text-indigo-700 pb-6 block hover:text-indigo-400 transition-all duration-200"
                        href="/cash-flow"
                    >
                        View More
                    </a>
                </div>
            </div>
            <div className="bg-white rounded-lg shadow-card mt-4">{/* <CashFlowChart data={summaryByMonth} /> */}</div>
        </Fragment>
    );
};
