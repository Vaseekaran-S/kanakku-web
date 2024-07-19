import React from 'react'
import Header from './header'
import Footer from './footer'

function Layout({ children }) {
  return (
    <div className='container-lg'>
      <Header />
      {children}
      <Footer />
    </div>
  )
}

export default Layout
