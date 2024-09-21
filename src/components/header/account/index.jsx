import React from 'react'
import { Link, useLocation } from 'react-router-dom'

import IconLink from 'components/icons'
import { BiTransferAlt } from 'react-icons/bi'
import { IoSettings } from 'react-icons/io5'
import { MdModeEdit } from 'react-icons/md'
import { accountIcons } from 'components/icons/data';

function AccountHeader({ url, name, icon }) {
    const { pathname } = useLocation();

    const links = [
        {
            name: "Transactions",
            icon: BiTransferAlt,
            link: `/transactions/${url}`
        },
        {
            name: "Edit",
            icon: MdModeEdit,
            link: `/accounts/${url}/edit`
        },
        {
            name: "Settings",
            icon: IoSettings,
            link: `/accounts/${url}/settings`
        }
    ]

    const Icon = accountIcons[icon];

    return (
        <div className='flex justify-between items-center mb-4'>
            <Link to={`/accounts/${url}`}>
                <h2 className='text-xl font-bold flex gap-1 items-center'>
                    {Icon && <Icon className="text-[30px]" />}{name}
                </h2>
            </Link>
            <div className='flex gap-2'>
                {links.map(elem => [
                    <IconLink key={elem.name} title={elem.name} link={elem.link} Icon={elem.icon} customCss={`text-[15px] lg:text-[17px] ${pathname === elem.link && 'outline'}`} />
                ])}
            </div>
        </div>
    )
}

export default AccountHeader
