import PrimaryBtn from 'components/buttons/primary'
import PrimaryInput from 'components/inputs/primary'
import PrimaryLink from 'components/links/primary'
import React from 'react'

function ForgotPassword() {
  return (
    <div className='min-h-[90vh] w-full lg:flex'>
      <div className='lg:w-[50%] flex-center'>
        <img src="/images/vectors/forgot-password.png" alt="Forgot Password" className='w-full' />
      </div>
      <div className='flex-center lg:w-[50%]'>
        <div className="rounded p-10 border bg-gray-100">
          <h3 className='font-bold text-xl text-center mb-3'>Forgot your password?</h3>
          <p className='max-w-[400px] mb-5'>No problem! Enter your email address below, and we'll send you a link to reset your password.</p>
          <PrimaryInput placeholder="Enter Email Id!" type="email" />
          <PrimaryBtn text="Continue" tailwindCss="mt-4 w-full" />
          <p className='text-center mt-5'>Don't have a account? <PrimaryLink to="/signup">SignUp</PrimaryLink> </p>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword
