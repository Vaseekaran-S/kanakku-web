import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import useKanakkuApi from 'hooks/api';
import { userSignUp } from 'api/registration'
import RegistrationForm from 'components/sections/registrationForm'
import inputs from 'data/inputs/signup'
import PageSection from 'components/sections/page';
import Card from 'components/cards';

function SignUp() {
    const kanakkuApiCall = useKanakkuApi();
    const [isEmailSend, setIsEmailSend] = useState(false);

    const onSubmit = async (data) => {
        const response = await kanakkuApiCall(userSignUp, data)
        if (response?.type === "success" || response?.mailSend) {
            setIsEmailSend(true)
        }
    };

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
        <PageSection customCss="w-full flex-center">
            {!isEmailSend ?
                <RegistrationForm renderingData={renderingData} /> :
                <Card customCss="md:max-w-[500px] px-10 py-10 text-center">
                    <img src="/images/gif/email-send.gif" alt="Email Send!" className='max-h-[150px] m-auto' />
                    <h2 className='font-bold text-lg my-2'>Check your Inbox!</h2>
                    <p>To start using Kanakku, we need to verify your email. We've already send out the verification link. Please check it and confirm it's really you.</p>
                </Card>}
        </PageSection>
    )
}

export default SignUp
