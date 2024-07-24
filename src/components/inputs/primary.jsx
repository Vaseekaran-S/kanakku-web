import React, { useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa';

function PrimaryInput(props) {
  const isPassword = props?.type === "password";
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  return (
    <div className='relative'>
      <input {...props} className={`w-full border border-green-300 px-3 py-2 rounded focus:outline-none focus:border-green-600 ${props?.className}`} />
      {isPassword && <button type='button' onClick={() => setIsPasswordVisible(!isPasswordVisible)} className='absolute top-[13px] right-[10px]'>{isPasswordVisible ? <FaEye /> : <FaEyeSlash />}</button>}
    </div>
  )
}

export default PrimaryInput
