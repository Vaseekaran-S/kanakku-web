
import React, { useState } from 'react'
import RegistrationForm from 'components/sections/registrationForm'

import inputs from 'data/inputs/login'
import { useNavigate } from 'react-router-dom';
import { userLogin } from 'api/registration';
import Alert from 'components/alerts';
import { useDispatch } from 'react-redux';
import { setAuthentication } from 'redux-store/user/userSlice';

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [popup, setPopup] = useState({ isVisible: false, message: '', type: '' });

    const onSubmit = async (data) => {
        const res = await userLogin(data);
        setPopup({ isVisible: true, message: res.message, type: res.type });
        if(res?.type === 'success'){
            localStorage.setItem("kanakku-user-token", res?.token)
            dispatch(setAuthentication(true));
            return navigate('/');
        }
        setTimeout(() => {
            setPopup(prev => ({ ...prev, isVisible: false }));
        }, 5000);
    };

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

    const { isVisible, message, type } = popup;
    return (
        <div className="min-h-[90vh] w-full flex-center">
            { isVisible && <Alert message={message} type={type}/> }
            <RegistrationForm type="login" renderingData={renderingData}/>
        </div>
    )
}

export default Login
