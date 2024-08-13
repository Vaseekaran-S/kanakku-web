import React from 'react'
import { Link } from 'react-router-dom'

const initialStyle = 'border px-3 py-2 rounded bg-green-600 text-white font-medium hover:bg-green-700'
function PrimaryBtn({ text, tailwindCss, link, ...others }) {
  const className = `${initialStyle} ${tailwindCss}`
  return (
    <>
      { link ? 
        <Link to={link} className={className} {...others}>
          {text}
        </Link> : 
        <button className={className} {...others}>
          {text}
        </button>
      }
    </>
  )
}

export default PrimaryBtn
