import React from 'react'
import GradientText from '../../animations/texts/gradient'

function Welcome() {
    return (
        <div className='min-h-[90vh] w-full flex-center'>
            <div className='flex flex-col items-center'>
                <h2 className='text-[30px] md:text-[45px] font-bold text-green-600'>
                    <GradientText>Welcome to Kannaku!</GradientText>
                </h2>
                <p className='font-medium text-lg mt-1'>Transform Your Manual Accounting into a Digital Masterpiece</p>
                <img src="/images/vectors/welcome.png" alt="Welcome to Kanakku" className='max-h-[250px] mt-3 object-contain' />
                <h4 className='text-xl font-bold text-blue-700'>Coming Soon...</h4>
            </div>
        </div>
    )
}

export default Welcome
