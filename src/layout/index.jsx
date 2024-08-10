import React from 'react'
import Header from './header'
import Footer from './footer'
import Loader from 'components/loader'
import { useSelector } from 'react-redux'

function Layout({ children }) {
  const isLoaderOn = useSelector(store => store.popup.isLoaderOn)
  return (
    <div className='container mx-auto'>
      { isLoaderOn && <Loader /> }
      <Header />
      <div className='px-3'>
        {children}
      </div>
      <Footer />
    </div>
  )
}

export default Layout
