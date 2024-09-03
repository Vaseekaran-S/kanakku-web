import React from 'react'
import Card from '..'

function AccountCard({ name, balance, icon }) {
  return (
    <Card shadow={false}>
      <h2 className='text-xl font-bold mb-2'>{name} {icon}</h2>
      <p className='bg-green-800 inline px-2 py-1 rounded font-medium text-white'>Rs {balance}</p>
    </Card>
  )
}

export default AccountCard
