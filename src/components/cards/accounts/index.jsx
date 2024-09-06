import React from 'react'
import { Link } from 'react-router-dom';

import Card from '../'
import { toUserTimeZone } from 'utils/timezone';

import { icons } from 'components/icons/accounts'
import IconLink from 'components/icons';

import { IoSettings } from "react-icons/io5";
import { BiTransferAlt } from "react-icons/bi";

function AccountCard({ url, name, balance, icon, createdAt }) {
  const Icon = icons[icon];
  return (
    <Card shadow={false}>
      <h2 className='text-xl font-bold mb-3 flex gap-2'>{Icon && <Icon className="text-[30px]" />}
        <Link to={url}>{name}</Link>
      </h2>
      <p className='flex items-center justify-between'>
        <span className='bg-green-800 inline px-2 py-1 rounded font-medium text-white'>Rs {balance}</span>
        <div className='flex gap-2'>
          <IconLink title="Transactions" link={`/transactions/${url}`} Icon={BiTransferAlt} customCss="border" />
          <IconLink title="Settings" link={`/accounts/${url}/settings`} Icon={IoSettings} customCss="border" />
        </div>
      </p>
      <p className='text-xs font-bold mt-2'>Created at {toUserTimeZone(createdAt)} </p>
    </Card>
  )
}

export default AccountCard
