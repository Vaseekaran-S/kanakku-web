import React from 'react'
import Card from '..'
import { icons } from 'components/icons/accounts'
import { toUserTimeZone } from 'utils/timezone';

function AccountCard({ name, balance, icon, createdAt }) {
  const Icon = icons[icon];
  return (
    <Card shadow={false}>
      <h2 className='text-xl font-bold mb-3 flex gap-2'>{Icon && <Icon className="text-[30px]" />} {name}</h2>
      <p className='bg-green-800 inline px-2 py-1 rounded font-medium text-white'>Rs {balance}</p>
      <p className='text-xs font-bold mt-2'>Created at { toUserTimeZone(createdAt) } </p>
    </Card>
  )
}

export default AccountCard
