import React, { FC, Fragment } from 'react';
import { Switch, Route } from 'react-router';
import useNotifications from '../shared/services/notifications';
import useTransactions from '../shared/services/transactions';
import { useLink } from '../shared/services/link';
import { Dashboard } from './Dashboard/Dashboard';
import { TransactionItemList } from './TransactionItemList/TransactionItemList';
import { ToastList } from '../shared/components/Toast/Toast';
import { Dropdown, DropdownItem } from '../shared/components/Dropdown/Dropdown';

export const Home: FC = () => {
    const { open } = useLink();
    const { removeAll, add } = useNotifications();
    const { currentDateRange, setCurrentDateRange } = useTransactions();
    return (
        <Fragment>
            <div className="w-full h-full font-sans absolute bg-gray-100">
                <aside></aside>
                <header className="bg-white">
                    <div className="p-6 w-full max-w-6xl mx-auto flex items-center justify-between">
                        <div className="text-3xl font-black tracking-tight text-gray-900">Expense Tracker</div>
                        <div className="relative">
                            <button
                                onClick={() => open()}
                                className="bg-indigo-600 px-4 py-2 rounded-md text-white hover:bg-indigo-400 focus:outline-none focus:shadow-outline active:bg-indigo-800 transition duration-200 font-semibold shadow-indigo"
                            >
                                Add Account
                            </button>
                            <div className="w-full absolute bg-gray-600 z-10 block"></div>
                        </div>
                    </div>
                </header>
                <main className="max-w-6xl mx-auto p-6 relative">
                    <div className="mb-6 flex justify-between">
                        <Dropdown selected={currentDateRange}>
                            <DropdownItem
                                option={{ value: 'this_month', text: 'This Month' }}
                                onClick={(e) => setCurrentDateRange(e)}
                            ></DropdownItem>
                            <DropdownItem
                                option={{ value: 'last_month', text: 'Last Month' }}
                                onClick={(e) => setCurrentDateRange(e)}
                            ></DropdownItem>
                            <DropdownItem
                                option={{ value: 'this_year', text: 'This Year' }}
                                onClick={(e) => setCurrentDateRange(e)}
                            ></DropdownItem>
                        </Dropdown>
                        <div>
                            <button
                                onClick={() => add('We just received new transactions')}
                                className="bg-indigo-600 px-4 py-2 mr-6 rounded-md text-white hover:bg-indigo-400 focus:outline-none focus:shadow-outline active:bg-indigo-800 transition duration-200 font-semibold shadow-indigo"
                            >
                                Notify
                            </button>
                            <button
                                onClick={() => removeAll()}
                                className="px-4 py-2 rounded-md text-indigo-600 hover:bg-indigo-100 focus:outline-none focus:shadow-outline active:bg-indigo-200 transition duration-200 font-semibold"
                            >
                                Clear Notifications
                            </button>
                        </div>
                    </div>
                    <div className="absolute right-0">
                        <ToastList></ToastList>
                    </div>
                    <Switch>
                        <Route exact path="/">
                            <Dashboard />
                        </Route>
                        <Route path="/accounts"></Route>
                        <Route path="/transactions">
                            <TransactionItemList />
                        </Route>
                    </Switch>
                </main>
            </div>
        </Fragment>
    );
};
