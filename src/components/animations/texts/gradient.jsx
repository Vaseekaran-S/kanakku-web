import React from 'react'

function GradientText({ children }) {
  return (
    <span className='bg-gradient-to-r from-green-600 via-orange-500 to-blue-600 bg-clip-text text-transparent animate-gradient'>
      { children }
    </span>
  )
}

export default GradientText
