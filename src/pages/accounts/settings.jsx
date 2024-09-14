import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom'

import { getAccountByUrl } from 'api/accounts';
import PageSection from 'components/sections/page'
import { accountIcons } from 'components/icons/data';

import IconLink from 'components/icons';
import { IoSettings } from "react-icons/io5";
import { BiTransferAlt } from "react-icons/bi";
import { MdModeEdit, MdOutlinePublic } from "react-icons/md";
import { RiGitRepositoryPrivateFill } from "react-icons/ri";

import Card from 'components/cards';
import PrimaryBtn from 'components/buttons/primary';

import { toUserTimeZone } from 'utils/timezone';

function AccountSettings() {
    const navigate = useNavigate();

    const { _id } = useSelector((store) => store.user.userData);
    const { user = _id, url } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [account, setAccount] = useState({});

    useEffect(() => {
        const fetchAccount = async () => {
            try {
                const response = await getAccountByUrl(user, url);
                if (response?.type === "error") return navigate("/accounts")
                setAccount(response);
            } finally {
                setIsLoading(false);
            }
        };
        fetchAccount();
    }, [url])

    const { name, icon, balance, createdAt } = account;
    const Icon = accountIcons[icon];

    return (
        <PageSection>
            <div className='flex justify-between items-center mb-3'>
                <Link to={`/accounts/${url}`}>
                    <h2 className='text-xl font-bold flex gap-1 items-center'>
                        {Icon && <Icon className="text-[30px]" />}{name}
                    </h2>
                </Link>
                <div className='flex gap-2'>
                    <IconLink title="Transactions" link={`/transactions/${url}`} Icon={BiTransferAlt} customCss="text-[20px]" />
                    <IconLink title="Edit" link={`/accounts/${url}/edit`} Icon={MdModeEdit} customCss="text-[20px]" />
                    <IconLink title="Settings" link={`/accounts/${url}/settings`} Icon={IoSettings} customCss="text-[20px] border-2 border-black" />
                </div>
            </div>
            <div className="max-w-[800px] bg-gray-200 rounded mt-10 p-5 m-auto">
                <h2 className='font-bold text-xl'>Account Details</h2>
                <div className='font-medium mt-4'>Name: <span className='font-bold'>{name}</span></div>
                <div className='font-medium mt-2'>Balance: <span className='font-bold'>Rs.{balance}</span></div>
                <div className='font-medium mt-2 flex gap-1'>Type: <span className='font-bold flex items-center'>Private <RiGitRepositoryPrivateFill/> </span></div>
                <div className='font-medium mt-2'>Created At: <span className='font-bold'>{toUserTimeZone(createdAt)}</span></div>
            </div>
            <div className="max-w-[800px] divide-y divide-black bg-gray-200 rounded mt-10 p-5 m-auto">
                <h2 className='font-bold text-xl'>Account Settings</h2>
                <div className='flex justify-between items-center mt-3 p-2'>
                    <p className='font-medium'>Edit this Account:</p>
                    <PrimaryBtn link={`/accounts/${url}/edit`} customCss="p-[2px] text-sm"> Edit </PrimaryBtn>
                </div>
                <div className='flex justify-between items-center p-2'>
                    <p className='font-medium'>Change Account visibility:</p>
                    <PrimaryBtn  customCss="p-[2px] text-sm bg-blue-600 hover:bg-blue-800">Change to Public</PrimaryBtn>
                </div>
                <div className='flex justify-between items-center pt-2 px-2'>
                    <p className='font-medium'>Delete this Account:</p>
                    <PrimaryBtn customCss="p-[2px] text-sm bg-red-700 hover:bg-red-800">Delete</PrimaryBtn>
                </div>
            </div>
        </PageSection>
    )
}

export default AccountSettings