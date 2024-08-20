import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import { Form, Formik } from 'formik';
import * as YUP from 'yup';
import FormikField from 'components/formik/field';

import PageSection from 'components/sections/page';
import PrimaryBtn from 'components/buttons/primary';
import Card from 'components/cards';

import { resetPassword, verifyToken } from 'api/registration';
import useKanakkuApi from 'hooks/api';

function ResetPassword() {
  const kannakuApiCall = useKanakkuApi();
  const { token } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [isTokenValid, setIsTokenValid] = useState(false);
  const [isPasswordReset, setIsPasswordReset] = useState(false);

  useEffect(() => {
    const fetchTokenStatus = async () => {
      const response = await verifyToken(token)
      setIsLoading(false)
      setIsTokenValid(response?.isTokenValid || false)
    }
    setTimeout(() => {
      fetchTokenStatus()
    }, 3000)
  }, [token])

  const initialValues = {
    password: "",
    confirmPassword: ""
  }
  const PasswordSchema = YUP.object().shape({
    password: YUP.string().required("Password is required!")
      .min(6, 'Password must be 6 characters long')
      .matches(/[0-9]/, 'Password requires a number!')
      .matches(/[A-Z]/, 'Password requires an uppercase letter!')
      .matches(/[a-z]/, 'Password requires a lowercase letter!')
      .matches(/[^\w]/, 'Password requires a symbol!'),
    confirmPassword: YUP.string()
      .oneOf([YUP.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
  })

  const formSubmit = async (values) => {
    const response = await kannakuApiCall(resetPassword, { token: token, ...values });
    if (response?.type === 'success') {
      setIsPasswordReset(true)
    }else{
      setIsTokenValid(false)
    }
  }

  return (
    <PageSection customCss='flex-center'>
      {
        isLoading && <div>
          <Card customCss="lg:min-w-[400px] text-center">
            <img src="/images/gif/email-verify.gif" alt="Verifying Email" className='max-w-[400px] max-h-[200px] m-auto' />
            <h2 className='font-bold text-lg'>Verifying User...</h2>
            <p className='mb-5'>This will take few seconds.</p>
          </Card>
        </div>
      }
      {
         (!isLoading && !isPasswordReset) &&
        <div className='grid grid-cols-12 gap-5'>
          <div className="col-span-12 lg:col-span-6">
            <img src={`/images/vectors/${isTokenValid ? 'reset-password' : 'token-expired'}.png`} alt="Token Verification" className='w-full max-h-[400px] object-contain' />
          </div>
          <div className="col-span-12 lg:col-span-6 flex-center">
            {isTokenValid ?
              <div className="rounded p-10 border bg-gray-100 max-w-[450px]">
                <h3 className='font-bold text-xl text-center mb-3'>Reset your Password!</h3>
                <p className='max-w-[400px] mb-5'>Your new password must be different to previous password.</p>
                <Formik initialValues={initialValues} validationSchema={PasswordSchema} onSubmit={formSubmit}>
                  <Form>
                    <FormikField placeholder="New Password" type="password" name="password" />
                    <FormikField placeholder="Confirm Password" type="password" name="confirmPassword" />
                    <PrimaryBtn label="Reset Password" type="submit" customCss="mt-4 w-full" />
                  </Form>
                </Formik>
              </div> :
              <div className="rounded p-10 border bg-gray-100">
                <h3 className='font-bold text-[30px] text-center mb-3'>Link Expired</h3>
                <p className='max-w-[400px] mb-5 text-center'>This link is no longer accepted. <Link to="/login" className='text-blue-600 underline'>Login Now</Link></p>
              </div>}
          </div>
        </div>
      }
      { isPasswordReset && <div>
          <Card customCss="lg:min-w-[400px] text-center py-9">
            <img src="/images/gif/reset-password.gif" alt="Reset Password" className='max-w-[400px] max-h-[200px] m-auto' />
            <h2 className='font-bold text-lg'>Password Changed</h2>
            <p>Your password has been successfully changed.</p>
            <Link to="/" className='text-blue-600 underline mb-5'>Go to Home</Link>
          </Card>
        </div> }
    </PageSection>
  )
}

export default ResetPassword
