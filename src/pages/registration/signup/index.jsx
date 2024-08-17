
import React, { useState } from 'react'
import RegistrationForm from 'components/sections/registrationForm'

import inputs from 'data/inputs/signup'
import { userSignUp } from 'api/registration'
import Alert from 'components/alerts'
import { useDispatch } from 'react-redux'
import { setLoaderStatus } from 'redux-store/popups/popupSlice'

function SignUp() {
    const dispatch = useDispatch();
    const [isEmailVerified, setIsEmailVerified] = useState('');
    const [popup, setPopup] = useState({ isVisible: false, message: '', type: '' });

    const onSubmit = async (data) => {
        dispatch(setLoaderStatus(true))
        const res = await userSignUp(data);
        if(res?.message === 'Email is not verified!') setIsEmailVerified(false)
        setPopup({ isVisible: true, message: res?.message, type: res?.type });
        dispatch(setLoaderStatus(false))        
        setTimeout(() => {
            setPopup(prev => ({ ...prev, isVisible: false }));
        }, 5000);
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

    const { isVisible, message, type } = popup;

    return (
        <div className="min-h-[90vh] w-full flex-center">
            { isVisible && <Alert message={message} type={type}/> }
            <RegistrationForm renderingData={renderingData} isEmailVerified={isEmailVerified}/>
        </div>
    )
}

export default SignUp
