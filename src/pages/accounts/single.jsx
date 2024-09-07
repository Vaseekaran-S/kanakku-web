import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'

import { getAccountByUrl } from 'api/accounts';
import PageSection from 'components/sections/page'
import { accountIcons } from 'components/icons/data';

import IconLink from 'components/icons';
import { IoSettings } from "react-icons/io5";
import { BiTransferAlt } from "react-icons/bi";
import { MdModeEdit } from "react-icons/md";

function ViewAccount() {
    const { _id } = useSelector((store) => store.user.userData);
    const { user = _id, url } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [account, setAccount] = useState({});

    useEffect(() => {
        const fetchAccount = async () => {
            try {
                const data = await getAccountByUrl(user, url);
                setAccount(data);
            } finally {
                setIsLoading(false);
            }
        };
        fetchAccount();
    }, [url])

    const { name, icon } = account;
    const Icon = accountIcons[icon];

    return (
        <PageSection>
            <div className='flex justify-between items-center'>
                <h2 className='text-2xl font-bold flex gap-3 items-center'>{Icon && <Icon className="text-[40px]" />}{name}</h2>
                <div className='flex gap-2'>
                    <IconLink title="Transactions" link={`/transactions/${url}`} Icon={BiTransferAlt} customCss="text-[20px]" />
                    <IconLink title="Edit" link={`/accounts/${url}/edit`} Icon={MdModeEdit} customCss="text-[20px]" />
                    <IconLink title="Settings" link={`/accounts/${url}/settings`} Icon={IoSettings} customCss="text-[20px]" />
                </div>
            </div>
        </PageSection>
    )
}

export default ViewAccount
