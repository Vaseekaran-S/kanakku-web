import React from 'react';
import { IoIosCloseCircle } from "react-icons/io";

function Modal({ children, title, closeModal }) {
    return (
        <div className='fixed top-0 left-0 h-full w-full flex-center'>
            <div className='absolute top-0 left-0 bg-gray-100 bg-opacity-70 h-full w-full z-5' onClick={closeModal}></div>
            <div className="border bg-white p-5 rounded md:min-w-[350px] z-10">
                <div className='md:text-lg lg:text-xl font-bold flex justify-between items-center'>
                    {title}
                    <IoIosCloseCircle  onClick={closeModal} className='cursor-pointer'/>
                </div>
                {children}
            </div>
        </div>
    )
}

export default Modal
