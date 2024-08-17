import React, { useState } from 'react';
import * as Yup from 'yup'
import { Form, Formik } from 'formik';
import { StepOne, StepTwo, StepThree } from './stepper';
import { IoArrowBack } from "react-icons/io5";
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { createAccount } from 'api/accounts';
import { APICALL } from 'utils/api';
import { useNavigate } from 'react-router-dom';

const StepOneSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Too Short!')
    .max(20, 'Too Long!')
    .required('Name is required'),
});

const StepTwoSchema = Yup.object().shape({
  balance: Yup.number().min(0, 'Enter value greater than 0').required('Balance is required')
});

const StepThreeSchema = Yup.object().shape({
  type: Yup.string().required('Type is required')
});

const steps = [
  { label: 'Step 1', validationSchema: StepOneSchema },
  { label: 'Step 2', validationSchema: StepTwoSchema },
  { label: 'Step 3', validationSchema: StepThreeSchema }
];

function CreateAccountForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector(store => store.user.userData)
  
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);

  const prevStep = () => {
    setDirection(-1);
    setStep(value => value - 1);
  }

  const nextStep = (validateForm) => async () => {
    const errors = await validateForm();
    if (Object.keys(errors).length === 0) {
      setDirection(1);
      setStep(step + 1);
    }
  };

  const formSubmit = async(values) => {
    if (step !== steps.length - 1) return
    const res = await APICALL(createAccount,{ ...values, userId: userData?._id}, dispatch)
    if(res?.type === "success") return navigate("/accounts")
  }

  const CurrentStep = [StepOne, StepTwo, StepThree][step]
  return (
    <div>
      <Formik initialValues={{
        name: "",
        balance: 0,
        type: ""
      }} validationSchema={steps[step].validationSchema} onSubmit={formSubmit} >
        {({ validateForm }) => (
          <Form>
            <motion.div
              key={step}
              initial={{ opacity: 0.5, x: direction === 1 ? 90 : -90 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0.5, x: direction === 1 ? -90 : 90 }}
              transition={{ duration: 0.3 }}
            >
              <CurrentStep validateForm={validateForm} nextStep={nextStep} />
            <div className='mt-2 px-2'>
              {step !== 0 && <button onClick={prevStep} type='button' className='flex-center gap-1 font-medium'><IoArrowBack />Back</button>}
            </div>
            </motion.div>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default CreateAccountForm
