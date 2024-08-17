
import { Form, Formik } from 'formik'
import React from 'react'

import * as YUP from "yup";

import FormikField from 'components/formik/field'
import PrimaryBtn from 'components/buttons/primary'
import PrimaryLink from 'components/links/primary';
import { Link } from 'react-router-dom';

function RegistrationForm({ renderingData }) {

    // Rendering Data
    const { inputs, topBoxTitle, buttonText, bottomBox, onSubmit } = renderingData;
    const isLogin = buttonText === "Login";

    const initialValues = Object.fromEntries(inputs.map(input => [input?.name, ""]));
    const validationEntries = isLogin ? {} : {
        name: YUP.string().required("Name is required!").min(4, "Name must be 4 characters long"),
        mobile: YUP.string().required("Mobile Number is required!").matches(/^\d{10}$/, 'Number must be 10 digits')
    }
    const validationSchema = YUP.object({
        ...validationEntries,
        email: YUP.string().required("Email is required!").email('Invalid Email format'),
        password: YUP.string().required("Password is required!")
            .min(6, 'Password must be 6 characters long')
            .matches(/[0-9]/, 'Password requires a number!')
            .matches(/[A-Z]/, 'Password requires an uppercase letter!')
            .matches(/[a-z]/, 'Password requires a lowercase letter!')
            .matches(/[^\w]/, 'Password requires a symbol!')
    });

    return (
        <div className='py-10'>
            <div className="card py-9 px-8 bg-gray-100 border text-center shadow-sm hover:shadow-lg border-t-[7px] border-t-[green] rounded sm:min-w-[350px]">
                <h2 className='text-xl font-bold mb-5'>{topBoxTitle}</h2>
                <div className='text-start mb-5'>
                    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                        <Form>
                            {inputs.map(input => [
                                <FormikField {...input} key={input?.id} />
                            ])}
                            <PrimaryBtn label={buttonText} customCss="w-full py-2" type="submit" />
                        </Form>
                    </Formik>
                </div>
                {isLogin && <Link to="/forgot-password" className='font-medium underline'>Forgot Password</Link>}
            </div>
            <div className="text-center bg-gray-100 font-medium border shadow-sm hover:shadow-lg p-5 mt-5 rounded border-b-[5px] border-b-[green]">
                <h4>{bottomBox?.title} <PrimaryLink to={bottomBox?.link}>{bottomBox?.text}</PrimaryLink></h4>
            </div>
        </div>
    )
}

export default RegistrationForm
