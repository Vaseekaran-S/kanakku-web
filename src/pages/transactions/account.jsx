import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { selectAccountByUrl } from 'redux-store/accounts/accountSlice';


import ToggleBtn from 'components/buttons/toggle';
import Card from 'components/cards';
import AccountHeader from 'components/header/account';
import PageSection from 'components/sections/page'
import TransactionsTable from 'components/tables/transactions';

function AccountTransaction() {
    const navigate = useNavigate();
    const { url } = useParams();
    const account = useSelector(state => selectAccountByUrl(state.accounts, url));
    const [type, setType] = useState("Both");

    useEffect(() => {
        if (!Object.keys(account).length) return navigate("/accounts");
    }, [url, account, navigate])

    const { name, icon } = account;

    return (
        <PageSection>
            <AccountHeader url={url} name={name} icon={icon} />
            <div className="grid grid-cols-12 gap-5 pt-4">
                <div className="col-span-12 lg:col-span-3">
                    <Card shadow={false}>
                        <h5 className='mb-3 font-bold text-xl'>Filters:</h5>
                        <div className="flex gap-2 pb-5">
                            {["Income", "Expense", "Both"].map((label) => (
                                <ToggleBtn key={label} active={type === label} onClick={() => setType(label)} customCss="rounded-lg w-full">
                                    {label}
                                </ToggleBtn>
                            ))}
                        </div>
                    </Card>
                </div>
                <div className="col-span-12 lg:col-span-9">
                    <Card shadow={false}>
                        <h2 className='font-bold text-xl mb-5'>Transactions History</h2>
                        <TransactionsTable accountId={account?._id} />
                    </Card>
                </div>
            </div>
        </PageSection>
    )
}

export default AccountTransaction
