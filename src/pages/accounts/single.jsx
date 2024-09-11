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
import Card from 'components/cards';

function ViewAccount() {
    const navigate = useNavigate();

    const { _id } = useSelector((store) => store.user.userData);
    const { user = _id, url } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [account, setAccount] = useState({});

    useEffect(() => {
        const fetchAccount = async () => {
            try {
                const response = await getAccountByUrl(user, url);
                if(response?.type === "error") return navigate("/accounts")
                setAccount(response);
            } finally {
                setIsLoading(false);
            }
        };
        fetchAccount();
    }, [url])

    const { name, icon, balance } = account;
    const Icon = accountIcons[icon];

    return (
        <PageSection>
            <div className='flex justify-between items-center mb-3'>
                <h2 className='text-2xl font-bold flex gap-3 items-center'>{Icon && <Icon className="text-[40px]" />}{name}</h2>
                <div className='flex gap-2'>
                    <IconLink title="Transactions" link={`/transactions/${url}`} Icon={BiTransferAlt} customCss="text-[20px]" />
                    <IconLink title="Edit" link={`/accounts/${url}/edit`} Icon={MdModeEdit} customCss="text-[20px]" />
                    <IconLink title="Settings" link={`/accounts/${url}/settings`} Icon={IoSettings} customCss="text-[20px]" />
                </div>
            </div>
            <div className='grid grid-cols-12 py-3'>
                <div className='col-span-9'>
                    <h2 className='font-bold text-xl ml-3'>Balance: ₹ {balance}</h2>
                </div>
                <div className="col-span-3">
                    <Card shadow={false} customCss="bg-gray-100">
                        <h6 className='font-bold text-center mb-2'>Recent Transactions</h6>
                        <hr className='py-2'/>
                        <p className='text-sm flex-center gap-1 lg:h-[200px]'>No Activity Found. <Link to={`/transactions/create?account=${url}`} className='font-medium text-blue-500 hover:text-blue-700'>Create a Transaction</Link></p>
                    </Card>
                </div>
            </div>
        </PageSection>
    )
}

export default ViewAccount
