import * as YUP from 'yup';
import React from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';

import { useDispatch, useSelector } from 'react-redux';
import PrimaryBtn from 'components/buttons/primary';
import Card from 'components/cards';

import useKanakkuApi from 'hooks/api';
import { useNavigate } from 'react-router-dom';
import { updateUserData } from 'api/user';
import { fetchUserData } from 'redux-store/user/userSlice';

function FormInputField({ name, type = 'text', placeholder, onChange }) {
    return (
        <div className='mt-2'>
            <Field type={type} onChange={onChange} name={name} placeholder={placeholder} className="border w-full p-2 rounded focus:outline-none focus:border-2 border-black mb-1" />
            <ErrorMessage name={name} component="div" className='text-xs font-medium text-red-600 pl-1' />
        </div>
    )
}

function ProfileEditForm() {
    const apiCall = useKanakkuApi();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { _id: userId, name, email, mobile, role, bio } = useSelector((store) => store.user.userData)

    // Formik Properties
    const initialValues = {
        name: name,
        mobile: mobile,
        bio: bio || "",
        role: role || "",
        userId
    }

    const validationSchema = YUP.object().shape({
        name: YUP.string().required("Name is required!").min(4, "Name must be 4 characters long"),
        mobile: YUP.string().required("Mobile Number is required!").matches(/^\d{10}$/, 'Number must be 10 digits')
    })

    const formSubmit = async (values) => {
        const response = await apiCall(updateUserData, {_id: userId, data: values});
        if (response?.type === "success"){
            dispatch(fetchUserData(email))
            navigate("/")
        }
    }

    return (
        <Formik validationSchema={validationSchema} initialValues={initialValues} onSubmit={formSubmit}>
            {({ values, setFieldValue }) => (
                <Form>
                    <Card shadow={false} customCss="divide-y">
                        <div className='py-5'>
                            <h2 className='font-bold text-xl'>Name</h2>
                            <FormInputField type='text' onChange={(e) => setFieldValue('name', e.target.value)} name='name' placeholder='Enter Name' />
                        </div>
                        <div className='py-5'>
                            <h2 className='font-bold text-xl'>Mobile Number</h2>
                            <FormInputField type='number' onChange={(e) => setFieldValue('mobile', e.target.value)} name='mobile' placeholder='Enter Mobile Number' />
                        </div>
                        <div className='py-5'>
                            <h2 className='font-bold text-xl'>Role</h2>
                            <FormInputField type='text' onChange={(e) => setFieldValue('role', e.target.value)} name='role' placeholder='Enter Your Role' />
                        </div>
                        <div className='py-5'>
                            <h2 className='font-bold text-xl'>Bio</h2>
                            <div className='flex items-center mt-3'>
                                <textarea value={values.bio} onChange={(e) => setFieldValue('bio', e.target.value)} name='bio' placeholder="Enter Bio" className="border w-full p-2 rounded focus:outline-none focus:border-2 border-black" />
                            </div>
                            <div className='flex gap-2 mt-6 max-w-[400px]'>
                                <PrimaryBtn type="button" customCss="w-full bg-gray-600 hover:bg-gray-700">
                                    Cancel
                                </PrimaryBtn>
                                <PrimaryBtn type="submit" customCss="w-full !bg-blue-600 hover:!bg-blue-700">
                                    Save
                                </PrimaryBtn>
                            </div>
                        </div>
                    </Card>
                </Form>
            )}
        </Formik>
    )
}

export default ProfileEditForm
