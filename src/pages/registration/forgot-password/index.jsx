import React, { useState } from 'react'

import { Form, Formik } from 'formik';
import FormikField from 'components/formik/field';
import * as YUP from 'yup'

import PrimaryBtn from 'components/buttons/primary'
import PrimaryLink from 'components/links/primary'
import { forgotPassword } from 'api/registration';
import useKanakkuApi from 'hooks/api';

function ForgotPassword() {
  const kanakkuApiCall = useKanakkuApi();
  const [isEmailSend, setIsEmailSend] = useState(false);

  const formSubmit = async (values) => {
    const response = await kanakkuApiCall(forgotPassword, values?.email)
    if (response?.type === "success") {
      setIsEmailSend(true);
    }
  }

  return (
    <div className='min-h-[90vh] w-full lg:flex'>
      <div className='lg:w-[50%] flex-center'>
        <img src="/images/vectors/forgot-password.png" alt="Forgot Password" className='w-full' />
      </div>
      <div className='flex-center lg:w-[50%]'>
        {!isEmailSend ?
          <div className="rounded p-10 border bg-gray-100">
            <h3 className='font-bold text-xl text-center mb-3'>Forgot your password?</h3>
            <p className='max-w-[400px] mb-5'>No problem! Enter your email address below, and we'll send you a link to reset your password.</p>
            <Formik
              initialValues={{ email: "" }}
              validationSchema={YUP.object({ email: YUP.string().required("Email is required!").email('Invalid Email format') })}
              onSubmit={formSubmit}>
              <Form>
                <FormikField placeholder="Enter Email ID" type="email" name="email" />
                <PrimaryBtn label="Continue" customCss="mt-1 w-full" type="submit" />
              </Form>
            </Formik>
            <p className='text-center mt-5'>Don't have a account? <PrimaryLink to="/signup">SignUp</PrimaryLink> </p>
          </div> :
          <div className="rounded p-10 border text-center max-w-[450px]">
            <img src="/images/gif/email-send.gif" alt="Email Send!" className='max-h-[150px] m-auto' />
            <h2 className='font-bold text-lg my-3'>Check your Inbox!</h2>
            <p>We've already send out the reset password link. Please check it and change your password.</p>
          </div>}
      </div>
    </div>
  )
}

export default ForgotPassword
