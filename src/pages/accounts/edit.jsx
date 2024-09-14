import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom'

import { getAccountByUrl } from 'api/accounts';
import PageSection from 'components/sections/page'
import { accountIcons } from 'components/icons/data';

import IconLink from 'components/icons';
import { IoSettings } from "react-icons/io5";
import { BiTransferAlt } from "react-icons/bi";
import { MdModeEdit } from "react-icons/md";
import AccountForm from 'components/formik/account';

function EditAccount() {
    const navigate = useNavigate();
    const { _id: userId } = useSelector((store) => store.user.userData);
    const { url } = useParams();
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

    const { name, icon, balance } = account;
    const Icon = accountIcons[icon];

    return (
        <div>
            <div className='flex justify-between items-center mb-3 mt-10'>
                <Link to={`/accounts/${url}`}>
                    <h2 className='text-xl font-bold flex gap-1 items-center'>
                        {Icon && <Icon className="text-[30px]" />}{name}
                    </h2>
                </Link>
                <div className='flex gap-2'>
                    <IconLink title="Transactions" link={`/transactions/${url}`} Icon={BiTransferAlt} customCss="text-[20px]" />
                    <IconLink title="Edit" link={`/accounts/${url}/edit`} Icon={MdModeEdit} customCss="text-[20px] border-2 border-black" />
                    <IconLink title="Settings" link={`/accounts/${url}/settings`} Icon={IoSettings} customCss="text-[20px]" />
                </div>
            </div>
            <PageSection customCss="flex-center flex-col md:flex-row gap-4 py-5">
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
