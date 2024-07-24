import React from 'react'
import PrimaryBtn from 'components/buttons/primary'
import PrimaryInput from 'components/inputs/primary'

function ResetPassword() {
  return (
    <div className='min-h-[90vh] w-full lg:flex'>
      <div className='lg:w-[50%] flex-center'>
        <img src="/images/vectors/reset-password.png" alt="Reset Password" className='w-full max-w-[400px]' />
      </div>
      <div className='flex-center lg:w-[50%]'>
        <div className="rounded p-10 border bg-gray-100 max-w-[450px]">
          <h3 className='font-bold text-xl text-center mb-3'>Reset your Password!</h3>
          <p className='max-w-[400px] mb-5'>Your new password must be different to previous password.</p>
          <PrimaryInput placeholder="New Password" type="password" name="password" className="mb-4"/>
          <PrimaryInput placeholder="Confirm Password" type="password" name="confirm-password"/>
          <PrimaryBtn text="Reset Password" tailwindCss="mt-4 w-full" />
        </div>
      </div>
    </div>
  )
}

export default ResetPassword
