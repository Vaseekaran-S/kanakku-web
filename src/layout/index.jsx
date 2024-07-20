import React from 'react'
import Header from './header'
import Footer from './footer'

function Layout({ children }) {
  return (
    <div className='container mx-auto'>
      <Header />
      <div className='px-3'>
        {children}
      </div>
      <Footer />
    </div>
  )
}

export default Layout
