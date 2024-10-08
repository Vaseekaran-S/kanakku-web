import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { getTransactionsDonutChart, getTransactionsByAccount } from 'api/transactions';

import PageSection from 'components/sections/page';
import AccountHeader from 'components/header/account';
import RecentTransaction from 'components/cards/transactions/recent';
import ToggleBtn from 'components/buttons/toggle';
import Card from 'components/cards';
import DonutChart from 'components/charts/donut';

import { selectAccountByUrl } from 'redux-store/accounts/accountSlice';

function ViewAccount() {
    const navigate = useNavigate();
    const { url } = useParams();

    const account = useSelector(state => selectAccountByUrl(state.accounts, url));

    const [isLoading, setIsLoading] = useState(true);
    const [type, setType] = useState("Income");

    const [recentTransactions, setRecentTransactions] = useState([]);
    const [incomeDonut, setIncomeDonut] = useState([]);
    const [expenseDonut, setExpenseDonut] = useState([]);

    const fetchData = useCallback(async () => {
        if (!account?._id) return navigate("/accounts");
        try {
            const [recentTransactions, incomeDonut, expenseDonut] = await Promise.all([
                getTransactionsByAccount(account._id, { length: 5 }),
                getTransactionsDonutChart(account._id, { type: "Income" }),
                getTransactionsDonutChart(account._id, { type: "Expense" }),
            ]);

            setRecentTransactions(recentTransactions);
            setIncomeDonut(incomeDonut);
            setExpenseDonut(expenseDonut);
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
                                <DonutChart key={type} data={type === "Income" ? incomeDonut : expenseDonut} customCss="min-h-[300px]" />
                            </div>
                            <div className="col-span-12 lg:col-span-8">
                                Bar Charts
                            </div>
                        </div>
                    </Card>
                </div>
                <div className="col-span-12 lg:col-span-3">
                    <h2 className="font-medium text-lg px-4 py-3 rounded mb-4 bg-gray-100">
                        Current Balance: <span className="font-bold">₹{balance}</span>
                    </h2>
                    <RecentTransaction transactions={recentTransactions} />
                </div>
            </div>
        </PageSection>
    );
}

export default ViewAccount;