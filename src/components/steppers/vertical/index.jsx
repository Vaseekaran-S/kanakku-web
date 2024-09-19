import React from 'react'

function VerticalStepper({ steps }) {
    return (
        <div className='flex flex-col gap-1'>
            {steps.map((step, index) => [
                <div key={step} className='flex gap-3'>
                    <div>
                        <p className='bg-green-800 h-[27px] w-[27px] flex-center font-medium text-white border-white border-2 rounded-full outline outline-green-900'>{index + 1}</p>
                        { steps.length - 1 > index && <div className="w-1 min-h-4 h-full bg-gray-300 rounded-xl mx-auto"></div> }
                    </div>
                    <div>
                        <h2 className='font-bold'>{step}</h2>
                    </div>
                </div>
            ])}
        </div>
    )
}

export default VerticalStepper
