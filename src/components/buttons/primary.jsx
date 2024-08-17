import React from 'react'
import { Link } from 'react-router-dom'

const initialStyle = 'border px-3 py-2 rounded bg-green-600 text-white font-medium hover:bg-green-700'
function PrimaryBtn({ label, customCss, link, children, ...others }) {
  const className = `${initialStyle} ${customCss}`
  return (
    <>
      { link ? 
        <Link to={link} className={className} {...others}>
          {children || label}
        </Link> : 
        <button className={className} {...others}>
          {children || label}
        </button>
      }
    </>
  )
}

export default PrimaryBtn
