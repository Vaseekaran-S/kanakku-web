import React from 'react'
import PrimaryBtn from 'components/buttons/primary';
import FormikField from '../field'

export function StepOne({ validateForm, nextStep }) {
    return (
        <div className="rounded p-10 border bg-gray-100 max-w-[450px]">
            <h3 className='font-bold text-xl text-center mb-3'>Create an Account!</h3>
            <p className='max-w-[400px] mb-5'>Let's get started by giving your account a name that you'll love!</p>
            <FormikField placeholder="Enter your account name" type="text" name="name" />
            <PrimaryBtn label="Continue" type="button" onClick={nextStep(validateForm)} customCss="w-full" />
        </div>
    )
}

export function StepTwo({ validateForm, nextStep }) {
    return (
        <div className="rounded p-10 border bg-gray-100 lg:w-[430px]">
            <h3 className='font-bold text-xl text-center mb-4'>Initial Balance</h3>
            <FormikField placeholder="Enter initial balance" type="number" name="balance" />
            <PrimaryBtn label="Continue" type="button" onClick={nextStep(validateForm)} customCss="w-full" />
        </div>
    )
}

export function StepThree() {
    return (
        <div className="rounded p-10 border bg-gray-100 lg:w-[450px]">
            <h3 className='font-bold text-xl text-center mb-4'>Account Type</h3>
            <FormikField placeholder="Enter your account type" type="text" name="type" />
            <PrimaryBtn label="Submit" type="submit" customCss="w-full" />
        </div>
    )
}

