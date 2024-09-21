import * as Yup from 'yup';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';

import { getAllAccounts } from 'api/accounts';
import { useSelector } from 'react-redux';

import { FaCirclePlus } from "react-icons/fa6";
import { accountIcons, expenseIcons, incomeIcons } from 'components/icons/data';
import PrimaryBtn from 'components/buttons/primary';
import Card from 'components/cards';
import useKanakkuApi from 'hooks/api';
import { createTransaction } from 'api/transactions';
import { useNavigate } from 'react-router-dom';

function TransactionForm({ transactionData, formType }) {
    const apiCall = useKanakkuApi();
    const navigate = useNavigate();

    const { _id: userId } = useSelector((store) => store.user.userData);
    const [isLoading, setIsLoading] = useState(true);
    const [accounts, setAccounts] = useState([]);
    useEffect(() => {
        const fetchAccounts = async () => {
            try {
                const data = await getAllAccounts(userId);
                setAccounts(data);
            } finally {
                setIsLoading(false);
            }
        };
        fetchAccounts();
    }, [userId]);

    const [transactionType, setTransactionType] = useState("Income");
    const categoryIcons = useMemo(() => transactionType === "Income" ? incomeIcons : expenseIcons, [transactionType]);
    const [iconCategoryType, setIconCategoryType] = useState("Fixed");
    useEffect(() => {
        setIconCategoryType(transactionType === "Income" ? "Salary" : "Fixed");
    }, [transactionType])

    // Images Upload
    const [images, setImages] = useState([]);

    const inputRef = useRef(null);
    const selectImage = () => (inputRef.current) && inputRef.current.click();
    const selectedImage = (event) => {
        event.preventDefault();
        const file = event.target?.files[0];
        if (file) setImages([file, ...images])
    }

    // Select Transaction Type
    const selectTransactionType = (type, setFieldValue) => {
        setFieldValue('type', type);
        setFieldValue('category', '');
        setTransactionType(type);
    }

    // Formik Properties
    const initialValues = {
        amount: "",
        type: transactionType,
        account: "",
        category: "",
        notes: "",
        userId
    }

    const validationSchema = Yup.object().shape({
        amount: Yup.number().min(10, 'Enter value greater than 10').max(100000, 'Enter value less than 100000').required('Amount is required'),
        account: Yup.string().required('Select an Account*'),
        category: Yup.string().required('Select a Category*')
    })

    const formSubmit = async(values) => {
        const response = await apiCall(createTransaction, values);
        if(response?.type === "success") navigate("/transactions")
    }

    return (
        <Formik validationSchema={validationSchema} initialValues={initialValues} onSubmit={formSubmit}>
            {({ values, setFieldValue }) => (
                <Form>
                    <Card shadow={false} customCss="divide-y">
                        <div className='py-5'>
                            <div className='flex gap-1 mb-3'>
                                {["Income", "Expense"].map(label => [
                                    <button key={label} onClick={() => selectTransactionType(label, setFieldValue) } disabled={transactionType === label} className={`px-3 py-2 border font-bold rounded-lg w-full ${transactionType === label ? 'bg-green-600 hover:bg-green-800 text-white' : 'bg-gray-100 hover:bg-gray-300 text-black'}`} >{label}</button>
                                ])}
                            </div>
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
                            <ErrorMessage name="account" component="div" className='text-xs font-medium text-red-600 pl-1' />
                            <div className="grid grid-cols-12 lg:grid-cols-7 gap-2 mt-2">
                                {isLoading ?
                                    Array.from({ length: 5 }).map((_, i) => [
                                        <div key={i} className="col-span-4 md:col-span-3 lg:col-span-1 p-4 rounded border bg-gray-200 cursor-pointer animate-pulse" >
                                            <div className="rounded-lg bg-slate-700 h-6 w-6 m-auto"></div>
                                            <div className="rounded-lg bg-slate-700 mt-3 h-2 w-[80%] m-auto"></div>
                                        </div>
                                    ])
                                    :
                                    accounts.map(({ _id, name, icon, Icon = accountIcons[icon] }) => [
                                        <div key={name} className={`col-span-4 md:col-span-3 lg:col-span-1 p-4 rounded border cursor-pointer text-center ${values?.account === _id ? 'bg-blue-800 text-white' : 'bg-gray-100'} `} onClick={() => setFieldValue('account', _id)}>
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
                                {Object.keys(categoryIcons).map(name => [
                                    <span key={name} onClick={() => setIconCategoryType(name)} className={`border py-1 px-2 text-sm rounded bg-gray-100 cursor-pointer ${iconCategoryType === name && 'font-medium border-black'}`}>{name}</span>
                                ])}
                            </div>
                            <div className="grid grid-cols-12 lg:grid-cols-9 gap-2 mt-5">
                                {Object.entries(categoryIcons[iconCategoryType] || {}).map(([name, Icon]) => [
                                    <div key={name} onClick={() => setFieldValue('category', name)} className={`col-span-3 md:col-span-2 lg:col-span-1 px-2 py-3 rounded border cursor-pointer text-center ${values?.category === name ? 'bg-green-800 text-white' : 'bg-gray-200'} `} >
                                        <Icon className='text-[20px] m-auto' />
                                        <p className='overflow-hidden text-xs md:text-sm'>{name}</p>
                                    </div>
                                ])}
                            </div>
                        </div>
                        <div className='py-5'>
                            <h2 className='font-bold text-xl'>Upload Images</h2>
                            <div className="grid grid-cols-6 md:grid-cols-12 mt-3 gap-4">
                                {images.map((image) => [
                                    <div key={image} className="col-span-3">
                                        <div className='aspect-square relative border rounded bg-gray-200 flex-center flex-col cursor-pointer overflow-hidden' >
                                            <img src={URL.createObjectURL(image)} alt="" className='h-full w-full object-cover rounded-t' />
                                            <button type='button' onClick={() => setImages(prevImages => prevImages.filter(img => img !== image))} className='absolute bottom-0 left-0 bg-red-800 w-full rounded-b flex-center font-medium text-white py-1'>Delete</button>
                                        </div>
                                    </div>
                                ])}
                                {images?.length < 4 &&
                                    <div className="col-span-3">
                                        <div className='aspect-square border p-4 flex-col rounded bg-gray-200 flex-center cursor-pointer' >
                                            <input ref={inputRef} onChange={selectedImage} type="file" hidden accept='image/*' />
                                            {/* <FaCirclePlus fontSize={30} /> */}
                                            <p className='font-bold text-green'>Coming Soon</p>
                                        </div>
                                    </div>
                                }
                            </div>
                            {images?.length >= 4 && <p className='font-medium text-sm text-red-800 mt-2'>Maximum four images can be added</p>}
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
    )
}

export default TransactionForm
