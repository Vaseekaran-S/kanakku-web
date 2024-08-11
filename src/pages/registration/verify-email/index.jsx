import { verifyEmailToken } from 'api/registration';
import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'

function EmailVerification() {
    const { token } = useParams();
    
    const verifyToken = async() => {
        const response = await verifyEmailToken(token)
    }
    useEffect(()=>{
        verifyToken()
    }, [token])

    return (
        <div className='min-h-[80vh] flex-center'>
            <div className='grid grid-cols-12 gap-5'>
                <div className="col-span-12 lg:col-span-6">
                    <img src="/images/vectors/verify-email.png" alt="Email Verification" className='w-full max-h-[400px] object-contain' />
                </div>
                <div className="col-span-12 lg:col-span-6 flex-center">
                    <div className="rounded p-10 border bg-gray-100">
                        <h3 className='font-bold text-[30px] text-center mb-3'>Email Verified</h3>
                        <p className='max-w-[400px] mb-5 text-center'>Your email has been successfully verified. Welcome aboard! <Link to="/login" className='text-blue-600 underline'>Login Now</Link></p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EmailVerification
