
import React from 'react'
import RegistrationForm from 'components/sections/registrationForm'

import inputs from 'data/inputs/signup'

function SignUp() {

    const onSubmit = () => {
        console.log("Hee");
    }

    const renderingData = {
        topBoxTitle: "SignUp Today!",
        buttonText: "SignUp",
        bottomBox: {
            title: "Already have an account?",
            text: "Login",
            link: "/login"
        },
        inputs,
        onSubmit
    }

    return (
        <div className="min-h-[90vh] w-full flex-center">
            <RegistrationForm renderingData={renderingData}/>
        </div>
    )
}

export default SignUp
