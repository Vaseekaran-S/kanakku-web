import { getAccountByUrl } from 'api/accounts';
import { getTransactionsByAccount } from 'api/transactions';
import Card from 'components/cards';
import AccountHeader from 'components/header/account';
import PageSection from 'components/sections/page'
import TransactionsTable from 'components/tables/transactions';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'

function AccountTransaction() {
    const navigate = useNavigate();
    const { url } = useParams();
    const { _id: userId } = useSelector((store) => store.user.userData);

    const [isLoading, setIsLoading] = useState(true);
    const [account, setAccount] = useState({});

    useEffect(() => {
        const fetchAccount = async () => {
            try {
                const account = await getAccountByUrl(userId, url);
                if (account?.type === "error") return navigate("/accounts");
                setAccount(account);
            } finally {
                setIsLoading(false);
            }
        };
        fetchAccount();
    }, [url])

    const { name, icon, balance } = account;

    return (
        <PageSection>
            <AccountHeader url={url} name={name} icon={icon} />
            <div className="grid grid-cols-12 gap-5 pt-4">
                <div className="col-span-3">
                    <Card shadow={false}>
                    </Card>
                </div>
                <div className="col-span-9">
                    <Card shadow={false}>
                        <h2 className='font-bold text-xl mb-5'>Transactions History</h2>
                        { account?._id && <TransactionsTable accountId={account?._id}/> }
                    </Card>
                </div>
            </div>
        </PageSection>
    )
}

export default AccountTransaction
