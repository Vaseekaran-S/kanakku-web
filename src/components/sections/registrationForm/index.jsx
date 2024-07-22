
import { Form, Formik } from 'formik'
import React from 'react'

import * as YUP from "yup";

import FormikField from 'components/formik/field'
import PrimaryBtn from 'components/buttons/primary'

function RegistrationForm({ renderingData }) {

    // Rendering Data
    const { inputs, topBoxTitle, buttonText, bottomBox, onSubmit } = renderingData;

    const initialValues = Object.fromEntries(inputs.map(input => [input?.name, ""]))
    const validationSchema = YUP.object(
        Object.fromEntries(inputs.map(input => [input?.name, YUP.string().required(input?.errorMsg)]))
    );

    return (
        <div className='py-10'>
            <div className="card py-9 px-8 border text-center shadow-sm hover:shadow-lg border-t-[7px] border-t-[green] rounded lg:min-w-[350px]">
                <h2 className='text-xl font-bold mb-5'>{topBoxTitle}</h2>
                <div className='text-start mb-5'>
                    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                        <Form>
                            {inputs.map(input => [
                                <FormikField {...input} key={input?.id} />
                            ])}
                            <PrimaryBtn text={buttonText} tailwindCss="w-full py-2" type="submit" />
                        </Form>
                    </Formik>
                </div>
                <a href="/forgot-password" className='font-medium underline'>Forgot Password</a>
            </div>
            <div className="text-center font-medium border shadow-sm hover:shadow-lg p-5 mt-5 rounded border-b-[5px] border-b-[green]">
                <h4>{bottomBox?.title} <a href={bottomBox?.link} className='text-blue-600'>{bottomBox?.text}</a></h4>
            </div>
        </div>
    )
}

export default RegistrationForm
