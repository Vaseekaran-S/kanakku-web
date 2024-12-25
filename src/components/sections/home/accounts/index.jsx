import { getRecentTransactionsLineChart } from 'api/transactions';
import HomeAccountPortfolioCard from 'components/cards/home/accounts'
import HomeLineChart from 'components/charts/line/home';
import React, { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

function HomeAccountsOverview() {
    const { _id: userId } = useSelector(state => state.user.userData);
    const [accountsOverview, setAccountsOverview] = useState([]);

    const fetchData = useCallback(async () => {
        const data = await getRecentTransactionsLineChart(userId)
        setAccountsOverview(data)
    })

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div className='py-5'>
            <h4 className='font-bold text-xl mb-4'>Accounts Portfolio</h4>
            <div className="grid grid-cols-12 gap-4">
                <table className="col-span-8">
                    <thead className="border-x p-4 bg-green-600 text-white">
                        <tr className='py-4'>
                            <th scope='col' className='py-4 text-left px-4 w-2/12'>Account</th>
                            <th scope='col' className='py-4 w-4/12'>Transactions</th>
                            <th scope='col' className='py-4 text-right w-2/12'>Balance (Rs)</th>
                            <th scope='col' className='py-4 w-2/12'>Type</th>
                        </tr>
                    </thead>
                    <tbody className="border-x border-b divide-y">
                        {accountsOverview.map(account => (
                            <tr key={account?.name} className="text-center my-3">
                                <td className='py-3 px-4 w-2/12 font-bold text-left'>{account.name}</td>
                                <td className='py-3 w-12/12 flex-center'>
                                    {account?.transactions?.length >= 3 ?
                                        <HomeLineChart data={account?.transactions} customClassName="h-[100px] max-w-[200px]" />
                                        : <p className='text-sm h-[100px] flex-center'>Charts are available with a minimum of 3 transactions.</p>
                                    }
                                </td>
                                <td className={`py-3 w-2/12 font-bold text-right ${account?.balance <= 0 && 'text-red-700'}`}>{account?.balance}</td>
                                <td className='py-3 w-2/12'>{account.type}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="col-span-4"></div>
            </div>
        </div>
    )
}

export default HomeAccountsOverview
