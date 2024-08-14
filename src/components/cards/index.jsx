import React from 'react'

function Card({ customCss, children }) {
  return (
    <div className={`border rounded shadow-md hover:shadow-xl p-5 ${customCss}`}>
      {children}
    </div>
  )
}

export default Card
