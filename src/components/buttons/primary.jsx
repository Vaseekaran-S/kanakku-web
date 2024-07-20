import React from 'react'

const initialStyle = 'border px-3 py-1 rounded bg-green-600 text-white font-medium'
function PrimaryBtn({ text, style, link }) {
  const className = `${initialStyle} ${style}`
  return (
    <>
      { link ? 
        <a href={link} className={className}>
          {text}
        </a> : 
        <button className={className}>
          {text}
        </button>
      }
    </>
  )
}

export default PrimaryBtn
