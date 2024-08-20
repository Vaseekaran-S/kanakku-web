import React from 'react'
import PrimaryBtn from 'components/buttons/primary';
import FormikField from '../field'
import * as Yup from 'yup'

export const StepOne = {
    schema: Yup.object().shape({
        name: Yup.string()
            .min(3, 'Too Short!')
            .max(20, 'Too Long!')
            .required('Name is required')
    }),
    component: ({ validateForm, nextStep }) =>
    (
        <div className="rounded p-10 border bg-gray-100 max-w-[450px]">
            <h3 className='font-bold text-xl text-center mb-3'>Create an Account!</h3>
            <p className='max-w-[400px] mb-5'>Let's get started by giving your account a name that you'll love!</p>
            <FormikField placeholder="Enter your account name" type="text" name="name" />
            <PrimaryBtn label="Continue" type="submit" onClick={nextStep(validateForm)} customCss="w-full" />
        </div>
    )
}

export const StepTwo = {
    schema: Yup.object().shape({
        balance: Yup.number().min(0, 'Enter value greater than 0').required('Balance is required')
    }),
    component: ({ validateForm, nextStep }) => (
        <div className="rounded p-10 border bg-gray-100 lg:w-[430px]">
            <h3 className='font-bold text-xl text-center mb-4'>Initial Balance</h3>
            <FormikField placeholder="Enter initial balance" type="number" name="balance" />
            <PrimaryBtn label="Continue" type="button" onClick={nextStep(validateForm)} customCss="w-full" />
        </div>
    )
}

export const StepThree = {
    schema: Yup.object().shape({
        type: Yup.string().required('Type is required')
    }),
    component: () => (
        <div className="rounded p-10 border bg-gray-100 lg:w-[450px]">
            <h3 className='font-bold text-xl text-center mb-4'>Account Type</h3>
            <FormikField placeholder="Enter your account type" type="text" name="type" />
            <PrimaryBtn label="Submit" type="submit" customCss="w-full" />
        </div>
    )
}

