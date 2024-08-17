import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PrimaryBtn from 'components/buttons/primary';
import { getAllAccounts } from 'api/accounts';
import { useSelector } from 'react-redux';
import Card from 'components/cards';

function Accounts() {
  const { _id } = useSelector(store => store.user.userData)
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    const getAccounts = async () => {
      const data = await getAllAccounts(_id)
      console.log(data)
      setAccounts(data)
    }
    getAccounts()
  }, [_id])

  return (
    <div className='min-h-[90vh] flex flex-col py-6 px-2'>
      <div className='flex justify-between items-center'>
        <h2 className='text-xl md:text-[25px] font-bold'>Accounts</h2>
        <PrimaryBtn label="Create +" link="/accounts/create" customCss="py-[3px] px-2" />
      </div>
      {accounts.length ?
        <div className='grid sm:grid-cols-6 md:grid-cols-9 lg:grid-cols-12 py-5 gap-3'>
          {accounts.map(account => [
            <div key={account?.name} className="col-span-3">
              <Card shadow={false}>
                <h2 className='text-xl font-bold mb-2'>{account?.name}</h2>
                <p className='bg-green-800 inline px-2 py-1 rounded font-medium text-white'>Rs {account?.balance}</p>
              </Card>
            </div>
          ])}
        </div> :
        <div className='flex flex-col flex-grow justify-center items-center'>
          <p className='font-medium text-lg'>No Account Found!</p>
          <Link to="/accounts/create" className="mt-1 text-blue-800 font-medium hover:text-blue-900 underline">Create Now</Link>
        </div>}
    </div>
  )
}

export default Accounts
