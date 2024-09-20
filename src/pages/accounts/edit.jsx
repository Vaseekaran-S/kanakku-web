import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'

import { getAccountByUrl } from 'api/accounts';
import PageSection from 'components/sections/page'
import { accountIcons } from 'components/icons/data';

import AccountForm from 'components/formik/account';
import AccountHeader from 'components/header/account';

function EditAccount() {
    const navigate = useNavigate();
    const { url } = useParams();
    const { _id: userId } = useSelector((store) => store.user.userData);
    const [isLoading, setIsLoading] = useState(true);
    const [account, setAccount] = useState({});

    useEffect(() => {
        const fetchAccount = async () => {
            try {
                const response = await getAccountByUrl(userId, url);
                if (response?.type === "error") return navigate("/accounts")
                setAccount(response);
            } finally {
                setIsLoading(false);
            }
        };
        fetchAccount();
    }, [url, userId])

    const { name, icon } = account;
    const Icon = accountIcons[icon];

    return (
        <div className='pt-5 md:pt-8'>
            <AccountHeader url={url} name={name} Icon={Icon} />
            <PageSection customCss="flex-center flex-col md:flex-row gap-4">
                <div className='md:w-[40%] flex-center'>
                    <img src="/images/vectors/account.jpg" alt="Reset Password" className='w-full max-w-[400px]' />
                </div>
                <div className='flex-center md:w-[40%]'>
                    {!isLoading && <AccountForm data={account} />}
                </div>
            </PageSection>
        </div>
    )
}

export default EditAccount
