import React from 'react'

function Card({ customCss, children, shadow = true }) {
  return (
    <div className={`border rounded ${shadow && 'shadow-md hover:shadow-xl' } p-5 ${customCss}`}>
      {children}
    </div>
  )
}

export default Card
