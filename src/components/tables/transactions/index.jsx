import React, { useEffect, useState } from 'react';
import { FaArrowUpLong, FaArrowDownLong } from "react-icons/fa6";
import { toUserTimeZone } from 'utils/timezone';

import { getTransactionsByAccount } from 'api/transactions';

import { transactionIcons } from 'components/icons/data';
import PrimaryLink from 'components/links/primary';

function TableRow({ amount, type, category, balance, createdAt }) {
    const Icon = transactionIcons[category];
    const isIncome = type === 'Income';
    const ArrowIcon = isIncome ? FaArrowDownLong : FaArrowUpLong;

    return (
        <tr className='py-3 hover:!bg-gray-200'>
            <td className="px-6 py-4">
                <div className='flex items-center gap-2 font-bold'>
                    <Icon className='text-lg' /> {category}
                </div>
            </td>
            <td className="px-6 py-4">
                <div className={`flex-center gap-1 font-medium ${isIncome ? 'text-green-700' : 'text-red-700'}`}>
                    {type} <ArrowIcon className="text-lg" />
                </div>
            </td>
            <td className="px-6 py-4">
                <span className={`font-bold px-2 py-1 rounded ${isIncome ? 'text-green-700' : 'text-red-700'}`}>₹{amount}</span>
            </td>
            <td className="px-6 py-4">
                <span className={`font-bold px-2 py-1 rounded ${balance < 0 && 'text-red-700'}`}>₹{balance}</span>
            </td>
            <td className="px-6 py-4">
                {toUserTimeZone(createdAt)}
            </td>
        </tr>
    );
}

function TableRowSkeleton({ column = 5, row = 5 }) {
    return (
        <>
            {Array.from({ length: row }).map((_, index) => (
                <tr key={index} className='py-3 animate-pulse'>
                    {Array.from({ length: column }).map((_, indexCol) => (
                        <td key={indexCol} className="px-6 py-4">
                            <div className='w-[75%] h-[12px] bg-slate-400 rounded m-auto'></div>
                        </td>
                    ))}
                </tr>
            ))}
        </>
    );
}

function TransactionsTable({ accountId }) {
    const rowLength = 5;
    const [transactions, setTransactions] = useState([]);
    const [steps, setSteps] = useState(rowLength);
    const [isLoading, setIsLoading] = useState(true);

    // Fetch transactions
    useEffect(() => {
        const fetchAccount = async () => {
            try {
                setIsLoading(true);
                const transactionsByte = await getTransactionsByAccount(accountId, { row: steps, length: rowLength });
                setTransactions(prev => [...prev, ...transactionsByte]);
            } catch (error) {
                console.error('Error fetching transactions:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchAccount();
    }, [steps, accountId]);

    // Reset state when accountId changes
    useEffect(() => {
        setTransactions([]);
        setSteps(rowLength);
    }, [accountId]);

    return (
        <div className="relative">
            <div className='overflow-x-auto'>
                <table className="w-full text-sm text-left rtl:text-right">
                    <thead className="text-md text-gray-700 uppercase border">
                        <tr className='text-center'>
                            <th scope="col" className="px-6 py-3">
                                Category
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Transaction
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Amount
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Balance
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Date
                            </th>
                        </tr>
                    </thead>
                    <tbody className='divide-y text-center'>
                        {transactions.map(transaction => (
                            <TableRow key={transaction?._id} {...transaction} />
                        ))}
                        {isLoading && <TableRowSkeleton column={5} row={rowLength} />}
                    </tbody>
                </table>
            </div>
            {(!isLoading && transactions.length === 0) && (
                <div className='pt-4 flex-center flex-col text-sm font-medium lg:min-h-[300px]'>
                    <p>Transaction History Empty</p>
                    <PrimaryLink to="/transactions/create">Add New</PrimaryLink>
                </div>
            )}
            <div className='flex-center pt-4'>
                {!isLoading && (transactions?.length < steps ? (
                    <p className='font-bold text-green-800'>Hey, that's all your transactions.</p>
                ) : (
                    <button
                        onClick={() => setSteps(prev => prev + rowLength)}
                        className='text-sm font-medium text-blue-700'
                        disabled={isLoading}
                        aria-label="Load more transactions"
                    >
                        Load More
                    </button>
                ))}
            </div>
        </div>
    );
}

export default TransactionsTable;