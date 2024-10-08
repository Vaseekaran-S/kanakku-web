import React from 'react'
import * as Yup from 'yup'
import { ErrorMessage } from 'formik';
import FormikField from '../field'
import { accountIcons } from 'components/icons/data';
import PrimaryBtn from 'components/buttons/primary';

export const StepOne = {
    schema: Yup.object().shape({
        name: Yup.string()
            .min(3, 'Too Short!')
            .max(20, 'Too Long!')
            .required('Name is required')
    }),
    component: ({ validateForm, nextStep, isEditPage }) =>
    (
        <div className="rounded p-10 border bg-gray-100 max-w-[450px]">
            <h3 className='font-bold text-xl text-center mb-3'>{isEditPage ? "Update Account!" : "Create a Account!"}</h3>
            {isEditPage ?
                <p className='lg:w-[400px] mb-2 font-medium'>Account Name:</p>
                :
                <p className='max-w-[400px] mb-5'>Let's get started by giving your account a name that you'll love!</p>
            }
            <FormikField placeholder="Enter your account name" type="text" name="name" />
            <PrimaryBtn label="Continue" type="submit" onClick={nextStep(validateForm)} customCss="w-full" />
        </div>
    )
}

export const StepTwo = {
    schema: Yup.object().shape({
        balance: Yup.number().min(0, 'Enter value greater than 0').required('Balance is required')
    }),
    component: ({ validateForm, nextStep, isEditPage }) => (
        <div className="rounded p-10 border bg-gray-100 lg:w-[430px]">
            <h3 className='font-bold text-xl text-center mb-4'>{isEditPage ? "Current Balance!" : "Initial Balance!"}</h3>
            <FormikField placeholder="Enter initial balance" type="number" name="balance" />
            <PrimaryBtn label="Continue" type="submit" onClick={nextStep(validateForm)} customCss="w-full" />
        </div>
    )
}

export const StepThree = {
    schema: Yup.object().shape({
        icon: Yup.string().required('Please! Select an Account Type')
    }),
    component: ({ setFieldValue, values, isEditPage }) => {
        return (
            <div className="rounded p-10 border bg-gray-100 lg:w-[450px]">
                <h3 className='font-bold text-xl text-center mb-4'>Account Type</h3>
                <div className="grid grid-cols-12 gap-2">
                    {Object.entries(accountIcons).map(([name, Icon]) => [
                        <div key={name} className={`col-span-4 lg:col-span-3 p-4 rounded border cursor-pointer text-center ${values?.icon === name ? 'bg-green-800 text-white' : 'bg-white'} `} onClick={() => setFieldValue('icon', name)}>
                            <Icon className='text-[30px] m-auto' />
                            {name}
                        </div>
                    ])}
                </div>
                <ErrorMessage name="icon" component="div" className='text-sm font-medium text-red-600 pl-1 mt-3' />
                <PrimaryBtn label={isEditPage ? "Update" : "Create"} type="submit" customCss="w-full mt-2" />
            </div>
        )
    }
}