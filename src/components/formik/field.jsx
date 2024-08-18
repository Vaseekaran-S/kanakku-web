import { ErrorMessage, Field } from 'formik'
import React, { useState } from 'react'

import { FaEye, FaEyeSlash } from "react-icons/fa";

function FormikField({ errorMsg, type, options, ...props }) {

  const isPassword = type === "password";
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const className = "w-full border border-green-300 px-3 py-2 rounded focus:outline-none focus:border-green-600 mb-1";

  return (
    <div className='mb-3 relative'>
      {type === "select" ?
        <Field as={type} {...props} className={className}>
          <option value="" disabled>{props?.placeholder || "Select"}</option>
          {options.map(option => [
            <option key={option?.value} value={option?.value}>{option?.label}</option>
          ])}
        </Field>
        :
        <Field {...props} type={isPassword && isPasswordVisible ? "text" : type} className={className} />
      }
      {isPassword && <button type='button' onClick={() => setIsPasswordVisible(!isPasswordVisible)} className='absolute top-[13px] right-[10px]'>{isPasswordVisible ? <FaEye /> : <FaEyeSlash />}</button>}
      <ErrorMessage name={props?.name} component="div" className='text-xs font-medium text-red-600 pl-1' />
    </div>
  )
}

export default FormikField
