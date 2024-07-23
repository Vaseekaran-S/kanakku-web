import React from 'react'

function PrimaryInput(props) {
  return (
    <>
        <input {...props} className="w-full border border-green-300 px-3 py-2 rounded focus:outline-none focus:border-green-600"/>
    </>
  )
}

export default PrimaryInput
