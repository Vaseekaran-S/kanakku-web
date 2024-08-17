import { ErrorMessage, Field } from 'formik'
import React, { useState } from 'react'

import { FaEye, FaEyeSlash } from "react-icons/fa";

function FormikField({ name, errorMsg, type, ...props }) {
  
  const isPassword = type === "password";
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  return (
    <div className='mb-3 relative'>
      <Field name={name} {...props} type={isPassword && isPasswordVisible ? "text" : type} className="w-full border border-green-300 px-3 py-2 rounded focus:outline-none focus:border-green-600 mb-1" />
      {isPassword && <button type='button' onClick={() => setIsPasswordVisible(!isPasswordVisible)} className='absolute top-[13px] right-[10px]'>{isPasswordVisible ? <FaEye /> : <FaEyeSlash />}</button>}
      <ErrorMessage name={name} component="div" className='text-xs font-medium text-red-600 pl-1' />
    </div>
  )
}

export default FormikField
