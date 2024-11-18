import React from 'react'
import { useSelector } from 'react-redux'

import HomeOverview from 'components/sections/homeOverview';

function Home() {
  const { name } = useSelector(state => state.user.userData);

  return (
    <div className='min-h-[100vh] py-10 lg:px-5'>
      <div>
        <h2 className='font-bold text-2xl'>Hello, {name}</h2>
      </div>
      <HomeOverview />
    </div>
  )
}

export default Home
