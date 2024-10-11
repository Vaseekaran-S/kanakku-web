import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { getTransactionsDonutChart, getTransactionsByAccount, getTransactionsLineChart } from 'api/transactions';

import PageSection from 'components/sections/page';
import AccountHeader from 'components/header/account';
import RecentTransaction from 'components/cards/transactions/recent';
import ToggleBtn from 'components/buttons/toggle';
import Card from 'components/cards';
import DonutChart from 'components/charts/donut';

import { selectAccountByUrl } from 'redux-store/accounts/accountSlice';
import LineChart from 'components/charts/line';

function ViewAccount() {
    const navigate = useNavigate();
    const { url } = useParams();

    const account = useSelector(state => selectAccountByUrl(state.accounts, url));

    const [isLoading, setIsLoading] = useState(true);
    const [type, setType] = useState("Income");

    const [recentTransactions, setRecentTransactions] = useState([]);
    const [incomeDonut, setIncomeDonut] = useState([]);
    const [expenseDonut, setExpenseDonut] = useState([]);
    const [lineChartData, setLineChartData] = useState({});

    const fetchData = useCallback(async () => {
        const accountId = account?._id;
        if (!accountId) return navigate("/accounts");
        try {
            const [recentTransactions, incomeDonut, expenseDonut, lineChartData] = await Promise.all([
                getTransactionsByAccount(accountId, { length: 5 }),
                getTransactionsDonutChart(accountId, { type: "Income" }),
                getTransactionsDonutChart(accountId, { type: "Expense" }),
                getTransactionsLineChart(accountId)
            ]);

            setRecentTransactions(recentTransactions);
            setIncomeDonut(incomeDonut);
            setExpenseDonut(expenseDonut);
            setLineChartData(lineChartData);
        } catch (error) {
            navigate("/accounts");
        } finally {
            setIsLoading(false);
        }
    }, [account, navigate]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const { name, icon, balance } = account;
    const donutChartData = type === "Income" ? incomeDonut : expenseDonut;

    return (
        <PageSection>
            <AccountHeader url={url} name={name} icon={icon} />
            <div className="grid grid-cols-12 py-3 gap-3">
                <div className="col-span-12 lg:col-span-9">
                    <div className="flex gap-1 pb-5">
                        {["Income", "Expense"].map((label) => (
                            <ToggleBtn key={label} active={type === label} onClick={() => setType(label)} customCss="rounded-[20px]">
                                {label}
                            </ToggleBtn>
                        ))}
                    </div>
                    <Card shadow={false} customCss="lg:p-10">
                        <div className="grid grid-cols-12">
                            <div className="col-span-12 lg:col-span-4">
                                <DonutChart key={type} data={donutChartData} />
                            </div>
                            <div className="col-span-12 lg:col-span-8">
                                {isLoading ?
                                    <div className='px-5'>
                                        <img src="/images/gif/linechart_loading.webp" alt="Line Chart Loading" />
                                    </div>
                                    :
                                    <LineChart key={type} data={lineChartData[type]} />
                                }
                            </div>
                        </div>
                    </Card>
                </div>
                <div className="col-span-12 lg:col-span-3">
                    <h2 className="font-medium text-lg px-4 py-3 rounded mb-4 bg-gray-100">
                        Current Balance: <span className="font-bold">₹{balance}</span>
                    </h2>
                    <RecentTransaction transactions={recentTransactions} isLoading={isLoading} />
                </div>
            </div>
        </PageSection>
    );
}

export default ViewAccount;