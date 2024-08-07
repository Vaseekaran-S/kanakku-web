
import React, { useCallback, useState } from 'react'
import RegistrationForm from 'components/sections/registrationForm'

import inputs from 'data/inputs/signup'
import { userSignUp } from 'api/registration'
import Alert from 'components/alerts'
import { useNavigate } from 'react-router-dom'

function SignUp() {
    const navigator = useNavigate()
    const [popup, setPopup] = useState({ isVisible: false, message: '', type: '' });

    const onSubmit = useCallback(async (data) => {
        const res = await userSignUp(data);
        console.log(res);
        
        setPopup({ isVisible: true, message: res.message, type: res.type });
        if(res?.type === 'success'){
            localStorage.setItem("kanakku-user-token", res?.token)
            return navigator('/');
        }
        setTimeout(() => {
            setPopup(prev => ({ ...prev, isVisible: false }));
        }, 5000);
    }, []);

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
            <RegistrationForm renderingData={renderingData}/>
        </div>
    )
}

export default SignUp
