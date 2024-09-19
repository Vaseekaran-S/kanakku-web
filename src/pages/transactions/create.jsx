import React from 'react';

import Card from 'components/cards';
import PageSection from 'components/sections/page';
import VerticalStepper from 'components/steppers/vertical';
import TransactionForm from 'components/formik/transaction';

const steps = [ "Enter Amount", "Select Account", "Select Category", "Upload Bills", "Notes" ]

function CreateTransaction() {
    return (
        <PageSection>
            <div className='grid grid-cols-3 lg:grid-cols-12 mt-5 gap-5'>
                <div className="col-span-3 relative">
                    <Card customCss="sticky top-[20px] bg-gray-100" shadow={false}>
                        <h2 className='mb-4 font-bold text-xl'>Create Transaction</h2>
                        <VerticalStepper steps={steps} />
                    </Card>
                </div>
                <div className="col-span-3 lg:col-span-9">
                    <TransactionForm />
                </div>
            </div>
        </PageSection>
    )
}

export default CreateTransaction
