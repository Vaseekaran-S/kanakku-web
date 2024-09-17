import PrimaryBtn from 'components/buttons/primary'
import PageSection from 'components/sections/page'
import React from 'react'

function Transactions() {
  return (
    <PageSection>
      <div className='flex justify-between items-center'>
        <h2 className='font-bold text-xl'>Transactions</h2>
        <PrimaryBtn link="/transactions/create">Create +</PrimaryBtn>
      </div>
    </PageSection>
  )
}

export default Transactions
