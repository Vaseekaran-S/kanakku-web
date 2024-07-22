import { ErrorMessage, Field } from 'formik'
import React from 'react'

function FormikField({ name, errorMsg, ...props }) {
  return (
    <div className='mb-3'>
        <Field name={name} {...props} className="w-full border border-green-300 px-3 py-2 rounded focus:outline-none focus:border-green-600"/>
        <ErrorMessage name={name} component="div" className='text-sm font-medium text-red-600 pl-1'/>
    </div>
  )
}

export default FormikField
