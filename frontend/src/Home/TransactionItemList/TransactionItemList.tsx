/* eslint-disable react/display-name */
import React, { FC } from 'react';
import useTransactions from '../../shared/services/transactions';
import useAuth from '../../context/auth';
import { useEffect } from 'react';
import { CellProps, useTable } from 'react-table';

const columns = [
    {
        Header: 'Category',
        accessor: 'category',
    },
    {
        Header: 'Amount',
        accessor: 'amount',
        Cell: ({ value }: CellProps<{ value: string }>) => (
            <span className={value > 0 ? 'text-red-600' : 'text-green-600'}>$ {value.toFixed(2)}</span>
        ),
    },
    {
        Header: 'Date',
        accessor: 'transactionDate',
    },
];
export const TransactionItemList: FC = () => {
    const { allTransactions, getTransactionsByUser } = useTransactions();
    const { user } = useAuth();

    useEffect(() => {
        user && getTransactionsByUser(user.id);
    }, [user, getTransactionsByUser]);
    return (
        <div className="relative">
            <Table
                columns={columns}
                data={allTransactions}
                getCellProps={(cellInfo: any) => {
                    console.log(cellInfo);

                    if (cellInfo.column === '')
                        return {
                            className: cellInfo.value < 0 ? 'text-green-600' : 'text-red-600',
                        };
                }}
            ></Table>
        </div>
    );
};

export interface TableProps {
    columns: any[];
    data: any;
    getCellProps: any;
}

export const Table: FC<TableProps> = ({ columns, data }: TableProps) => {
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
        columns,
        data,
    });
    return (
        <div className="flex flex-col w-full">
            <div className="sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                <div className="align-middle inline-block min-w-full shadow sm:rounded-lg border-b border-gray-200">
                    <table className="min-w-full divide-y divide-gray-200" {...getTableProps()}>
                        <thead>
                            {headerGroups.map((headerGroup) => (
                                <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
                                    {headerGroup.headers.map((column: any) => (
                                        <th
                                            key={column.id}
                                            className="bg-white px-6 py-3 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
                                            {...column.getHeaderProps()}
                                        >
                                            {column.render('Header')}
                                        </th>
                                    ))}
                                </tr>
                            ))}
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200" {...getTableBodyProps()}>
                            {rows.map((row) => {
                                prepareRow(row);
                                return (
                                    <tr {...row.getRowProps()} key={row.id}>
                                        {row.cells.map((cell: any) => (
                                            <td
                                                key={cell.id}
                                                className="px-6 py-4 whitespace-no-wrap text-sm leading-5 font-medium text-gray-900"
                                                {...cell.getCellProps()}
                                            >
                                                {cell.render('Cell')}
                                            </td>
                                        ))}
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
