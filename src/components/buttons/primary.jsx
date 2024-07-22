import React from 'react'

const initialStyle = 'border px-3 py-1 rounded bg-green-600 text-white font-medium hover:bg-green-700'
function PrimaryBtn({ text, tailwindCss, link, ...others }) {
  const className = `${initialStyle} ${tailwindCss}`
  return (
    <>
      { link ? 
        <a href={link} className={className} {...others}>
          {text}
        </a> : 
        <button className={className} {...others}>
          {text}
        </button>
      }
    </>
  )
}

export default PrimaryBtn
