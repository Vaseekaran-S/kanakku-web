import React from 'react';
import CreateAccountForm from 'components/formik/account';
import PageSection from 'components/sections/page';

function CreateAccount() {
  return (
    <PageSection customCss="flex-center flex-col md:flex-row gap-4 py-7">
      <div className='md:w-[40%] flex-center'>
        <img src="/images/vectors/account.jpg" alt="Reset Password" className='w-full max-w-[400px]' />
      </div>
      <div className='flex-center md:w-[40%]'>
        <CreateAccountForm />
      </div>
    </PageSection>
  )
}

export default CreateAccount
