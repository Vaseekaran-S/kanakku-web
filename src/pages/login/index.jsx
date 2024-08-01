
import React from 'react'
import RegistrationForm from 'components/sections/registrationForm'

import inputs from 'data/inputs/login'

function Login() {

    const onSubmit = (values) => {
        console.log(values);
    }

    const renderingData = {
        topBoxTitle: "Welcome Back!",
        buttonText: "Login",
        bottomBox: {
            title: "New to Kanakku?",
            text: "SignUp",
            link: "/signup"
        },
        inputs,
        onSubmit
    }

    return (
        <div className="min-h-[90vh] w-full flex-center">
            <RegistrationForm type="login" renderingData={renderingData}/>
        </div>
    )
}

export default Login
