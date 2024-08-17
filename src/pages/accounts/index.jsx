import PrimaryBtn from 'components/buttons/primary'
import Card from 'components/cards'
import PrimaryLink from 'components/links/primary'
import React from 'react'
import { Link } from 'react-router-dom'

function Accounts() {
  return (
    <div className='min-h-[90vh] flex flex-col py-6 px-2'>
      <div className='flex justify-between items-center'>
        <h2 className='text-xl md:text-[25px] font-bold'>Accounts</h2>
        <PrimaryBtn label="Create +" link="/accounts/create" customCss="py-[3px] px-2" />
      </div>
      <div className='flex flex-col flex-grow justify-center items-center'>
        <p className='font-medium text-lg'>No Account Found!</p>
        <Link to="/accounts/create" className="mt-1 text-blue-800 font-medium hover:text-blue-900 underline">Create Now</Link>
      </div>
      {/* <div className='grid grid-cols-12 py-5'>
        <div className="col-span-3">
          <Card shadow={false}>
            Hello
          </Card>
        </div>
      </div> */}
    </div>
  )
}

export default Accounts
