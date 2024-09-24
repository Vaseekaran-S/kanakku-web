import React from 'react'
import { Link, useParams } from 'react-router-dom'
import Card from '..'
import { transactionIcons } from 'components/icons/data';
import { FaArrowUpLong, FaArrowDownLong } from "react-icons/fa6";
import PrimaryLink from 'components/links/primary';

function TransactionSingle({ amount, type, category, balance }) {
    const Icon = transactionIcons[category];
    const isIncome = type === 'Income';
    const ArrowIcon = isIncome ? FaArrowUpLong : FaArrowDownLong;
    return (
        <div className='flex justify-between py-2'>
            <div className='flex-center gap-1 font-medium'>
                <Icon className='text-lg' /> {category}
            </div>
            <div className='flex-center'>
                <h2 className='font-medium'><span className={`${isIncome ? 'text-green-700' : 'text-red-700'}`}>₹{amount}</span> ({balance})</h2>
                <ArrowIcon className={`text-lg ${isIncome ? 'text-green-700' : 'text-red-700'}`} />
            </div>
        </div>
    )
}

function RecentTransaction({ transactions = [] }) {
    const { url } = useParams();
    return (
        <Card shadow={false} customCss="bg-gray-100">
            <h6 className='font-bold text-center mb-2'>Recent Transactions</h6>
            <hr className='py-2' />
            {transactions.length === 0 ?
                <p className='text-sm flex-center gap-1 h-[200px]'>No Activity Found. <Link to={`/transactions/create?account=${url}`} className='font-medium text-blue-500 hover:text-blue-700'>Create a Transaction</Link></p>
                :
                <>
                    <div className='divide-y'>
                        {transactions.map(transaction => [
                            <TransactionSingle key={transaction?._id} {...transaction} />
                        ])}
                    </div>
                    <div className='flex-center'>
                        <PrimaryLink to={`/transactions/${url}`} customCss="font-medium text-md uppercase mt-2 underline">View All</PrimaryLink>
                    </div>
                </>
            }
        </Card>
    )
}

export default RecentTransaction
