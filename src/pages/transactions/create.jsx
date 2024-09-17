import * as Yup from 'yup';
import React, { useEffect, useRef, useState } from 'react';

import Card from 'components/cards';
import PageSection from 'components/sections/page';
import VerticalStepper from 'components/steppers/vertical';
import { accountIcons, expenseIcons } from 'components/icons/data';

import { getAllAccounts } from 'api/accounts';

import { useSelector } from 'react-redux';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import PrimaryBtn from 'components/buttons/primary';
import { FaCirclePlus } from "react-icons/fa6";

const steps = [
    "Enter Amount", "Select Account", "Select Category", "Upload Bills", "Notes"
]

function CreateTransaction() {
    const [isLoading, setIsLoading] = useState(true);
    const [accounts, setAccounts] = useState([]);
    const [categoryType, setCategoryType] = useState("Fixed");
    const [images, setImages] = useState([]);
    const { _id } = useSelector((store) => store.user.userData);

    useEffect(() => {
        const fetchAccounts = async () => {
            try {
                const data = await getAllAccounts(_id);
                console.log(data);
                
                setAccounts(data);
            } finally {
                setIsLoading(false);
            }
        };
        fetchAccounts();
    }, [_id]);

    const inputRef = useRef(null);
    const selectImage = () => (inputRef.current) && inputRef.current.click();
    const selectedImage = (event) => {
        event.preventDefault();
        const file = event.target?.files[0];
        if (file) setImages([file, ...images])
    }

    const initialValues = {
        amount: "",
        account: "",
        category: "",
        notes: ""
    }

    const validationSchema = Yup.object().shape({
        amount: Yup.number().min(10, 'Enter value greater than 10').max(100000, 'Enter value less than 100000').required('Amount is required'),
        // account: Yup.string().required('Select an Account'),
        category: Yup.string().required('Select an Category')
    })

    const formSubmit = (values) => {
        console.log(values);

        alert(values);
    }

    return (
        <PageSection>
            <div>
                <h2 className='font-bold text-xl'>Add Transaction</h2>
            </div>
            <div className='grid grid-cols-3 lg:grid-cols-12 mt-5 gap-5'>
                <div className="col-span-3 relative">
                    <Card customCss="sticky top-[20px]">
                        <h2 className='mb-4 font-bold text-xl'>Transaction Steps</h2>
                        <VerticalStepper steps={steps} />
                    </Card>
                </div>
                <div className="col-span-3 lg:col-span-9">
                    <Formik validationSchema={validationSchema} initialValues={initialValues} onSubmit={formSubmit}>
                        {({ values, setFieldValue }) => (
                            <Form>
                                <Card shadow={false} customCss="divide-y">
                                    <div className='pb-5'>
                                        <h2 className='font-bold text-xl mb-3'>Amount</h2>
                                        <div className='flex items-start gap-2 font-bold text-2xl'>
                                            <h3>₹</h3>
                                            <div>
                                                <Field name="amount" type='number' placeholder="Enter Amount" className="focus:outline-none w-full md:w-[200px] border-gray-700" />
                                                <ErrorMessage name="amount" component="div" className='text-xs font-medium text-red-600 pl-1' />
                                            </div>
                                        </div>
                                    </div>
                                    <div className='py-5'>
                                        <h2 className='font-bold text-xl'>Select Account</h2>
                                        <div className="grid grid-cols-12 lg:grid-cols-7 gap-2 mt-2">
                                            {accounts.map(({ name, icon, Icon = accountIcons[icon] }) => [
                                                <div key={name} className={`col-span-3 lg:col-span-1 p-4 rounded border cursor-pointer text-center ${values?.account === name ? 'bg-blue-800 text-white' : 'bg-gray-100'} `} onClick={() => setFieldValue('account', name)}>
                                                    <Icon className='text-[20px] m-auto' />
                                                    <p className='font-medium text-sm'>{name}</p>
                                                </div>
                                            ])}
                                        </div>
                                    </div>
                                    <div className='py-5'>
                                        <h2 className='font-bold text-xl'>Select Category
                                            <ErrorMessage name="category" component="div" className='text-xs font-medium text-red-600 pl-1' />
                                        </h2>
                                        <div className='flex gap-2 flex-wrap mt-3'>
                                            {Object.keys(expenseIcons).map(name => [
                                                <span key={name} onClick={() => setCategoryType(name)} className={`border py-1 px-2 text-sm rounded bg-gray-100 cursor-pointer ${categoryType === name && 'font-medium border-black'}`}>{name}</span>
                                            ])}
                                        </div>
                                        <div className="grid grid-cols-8 lg:grid-cols-9 gap-2 mt-5">
                                            {Object.entries(expenseIcons[categoryType]).map(([name, Icon]) => [
                                                <div key={name} onClick={() => setFieldValue('category', name)} className={`col-span-2 lg:col-span-1 px-2 py-3 rounded border cursor-pointer text-center ${values?.category === name ? 'bg-green-800 text-white' : 'bg-gray-200'} `} >
                                                    <Icon className='text-[20px] m-auto' />
                                                    <p className='overflow-hidden text-xs md:text-sm'>{name}</p>
                                                </div>
                                            ])}
                                        </div>
                                    </div>
                                    <div className='py-5'>
                                        <h2 className='font-bold text-xl'>Upload Images</h2>
                                        <div className="grid grid-cols-12 mt-3 gap-3">
                                            {images.map(image => [
                                                <div key={image} className="col-span-3">
                                                    <div className='border rounded bg-gray-200 flex-center cursor-pointer lg:h-[200px] ' >
                                                        <img src={URL.createObjectURL(image)} alt="" className='h-full w-full object-cover rounded'/>
                                                    </div>
                                                </div>
                                            ])}
                                            { images?.length < 4 &&
                                            <div className="col-span-3">
                                                <div className='border p-4 rounded bg-gray-200 flex-center cursor-pointer lg:h-[200px]' onClick={selectImage}>
                                                    <input ref={inputRef} onChange={selectedImage} type="file" hidden accept='image/png, image/gif, image/jpeg' />
                                                    <FaCirclePlus fontSize={30} />
                                                </div>
                                            </div>
                                            }
                                        </div>
                                        { images?.length >= 4 && <p className='font-mediutm text-red-800 mt-2'>Maximum four images can be added</p> }
                                    </div>
                                    <div className='py-5'>
                                        <h2 className='font-bold text-xl'>Notes</h2>
                                        <div className='flex items-center mt-3'>
                                            <textarea onChange={(e) => setFieldValue('notes', e.target.value)} name='notes' placeholder="Enter Notes" className="border w-full p-2 rounded focus:outline-none focus:border-2 border-black" />
                                        </div>
                                        <PrimaryBtn type="submit" customCss="mt-7 w-full">
                                            Add Expense
                                        </PrimaryBtn>
                                    </div>
                                </Card>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </PageSection>
    )
}

export default CreateTransaction
