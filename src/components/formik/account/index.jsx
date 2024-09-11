import React, { useState } from 'react';
import { Form, Formik } from 'formik';
import { StepOne, StepTwo, StepThree } from './stepper';
import { IoArrowBack } from "react-icons/io5";
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { createAccount, updateAccount } from 'api/accounts';
import { useNavigate } from 'react-router-dom';
import useKanakkuApi from 'hooks/api';

const steps = [
  { label: 'Step 1', validationSchema: StepOne.schema, component: StepOne.component },
  { label: 'Step 2', validationSchema: StepTwo.schema, component: StepTwo.component },
  { label: 'Step 3', validationSchema: StepThree.schema, component: StepThree.component }
];

function AccountForm({ data }) {
  const navigate = useNavigate();
  const kanakkuApiCall = useKanakkuApi();
  const userData = useSelector(store => store.user.userData);

  const isEditPage = data;
  const apiCallFun = isEditPage ? updateAccount : createAccount;

  const formSubmit = async (values) => {
    if (step !== steps.length - 1) return;
    const res = await kanakkuApiCall(apiCallFun, { ...values, userId: userData?._id });
    if (res?.type === "success") return navigate("/accounts");
  }

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

  const currentSchema = steps[step].validationSchema;
  const CurrentStep = steps[step].component;

  const initialValues = data || {
    name: "",
    balance: 0,
    icon: ""
  }

  return (
    <div>
      <Formik initialValues={initialValues} validationSchema={currentSchema} onSubmit={formSubmit} >
        {({ setFieldValue, values, validateForm }) => (
          <Form>
            <motion.div
              key={step}
              initial={{ opacity: 0.5, x: direction === 1 ? 90 : -90 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0.5, x: direction === 1 ? -90 : 90 }}
              transition={{ duration: 0.3 }}
            >
              <h6 className='mb-2 text-end pr-3 font-medium'>{step + 1}/{steps.length}</h6>
              <CurrentStep setFieldValue={setFieldValue} values={values} validateForm={validateForm} nextStep={nextStep} isEditPage={isEditPage} />
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

export default AccountForm
