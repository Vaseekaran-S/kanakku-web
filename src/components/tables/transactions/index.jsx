import React, { useEffect, useState } from 'react'
import { toUserTimeZone } from 'utils/timezone'
import { transactionIcons } from 'components/icons/data';
import { FaArrowUpLong, FaArrowDownLong } from "react-icons/fa6";
import { getTransactionsByAccount } from 'api/transactions';
import PrimaryLink from 'components/links/primary';

function TableRow({ amount, type, category, balance, createdAt }) {
    const Icon = transactionIcons[category];
    const isIncome = type === 'Income';
    const ArrowIcon = isIncome ? FaArrowDownLong : FaArrowUpLong;
    return (
        <tr className='py-3'>
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
                <span className={`font-bold px-2 py-1 rounded ${balance<0 && 'text-red-700'}`}>₹{balance}</span>
            </td>
            <td className="px-6 py-4">
                {toUserTimeZone(createdAt)}
            </td>
        </tr>
    )
}

function TransactionsTable({ accountId }) {
    const [transactions, setTransactions] = useState([]);
    const [steps, setSteps] = useState(5);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchAccount = async () => {
            try {
                const transactions = await getTransactionsByAccount(accountId, { row: steps });
                console.log(transactions);
                
                setTransactions(prev => [...prev, ...transactions]);
            } finally {
                setIsLoading(false);
            }
        };
        fetchAccount();
    }, [steps])

    return (
        <div className="relative overflow-x-auto">
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
                    {transactions.map(transaction => [
                        <TableRow key={transaction?._id} {...transaction} />
                    ])}
                </tbody>
            </table>
            {transactions.length === 0 && <div className='pt-4 flex-center flex-col text-sm font-medium lg:min-h-[300px]'>
                    <p>Transaction History Empty</p>
                    <PrimaryLink to="/transactions/create">Add New</PrimaryLink>
                </div>}
            <div className='flex-center w-full'>
                {transactions?.length < steps || <button onClick={() => setSteps(prev => prev + 5)} className='pt-3 text-sm font-medium text-blue-700'>Load More</button>}
            </div>
        </div>
    )
}

export default TransactionsTable
