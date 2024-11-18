import React from 'react'
import { useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { setAuthentication } from 'redux-store/user/userSlice';

import { userLogin } from 'api/registration';
import RegistrationForm from 'components/sections/registrationForm'
import inputs from 'data/inputs/login'
import useKanakkuApi from 'hooks/api';
import PageSection from 'components/sections/page';

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const kanakkuApiCall = useKanakkuApi();

    const onSubmit = async (data) => {
        const res = await kanakkuApiCall(userLogin, data)
        if(res?.type === 'success'){
            localStorage.setItem("kanakku-user-token", res?.token)
            dispatch(setAuthentication(true));
            return navigate('/');
        }
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

    return (
        <PageSection customCss="w-full flex-center min-h-[100vh]">
            <RegistrationForm type="login" renderingData={renderingData}/>
        </PageSection>
    )
}

export default Login
