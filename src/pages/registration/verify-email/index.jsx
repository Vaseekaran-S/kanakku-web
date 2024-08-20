import { verifyEmailToken } from 'api/registration';
import Card from 'components/cards';
import PageSection from 'components/sections/page';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

function EmailVerification() {
    const { token } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [isEmailVerified, setIsEmailVerified] = useState(false);

    useEffect(() => {
        const verifyToken = async () => {
            const response = await verifyEmailToken(token);
            setIsLoading(false);
            setIsEmailVerified(response?.isEmailVerified || false);
        }
        setTimeout(() => {
            verifyToken();
        }, 3000)
    }, [token])

    return (
        <PageSection customCss='flex-center'>
            {
                isLoading ? <div>
                    <Card customCss="lg:min-w-[400px] text-center">
                        <img src="/images/gif/email-verify.gif" alt="Verifying Email" className='max-w-[400px] max-h-[200px] m-auto' />
                        <h2 className='font-bold text-lg'>Verifying User...</h2>
                        <p className='mb-5'>This will take few seconds.</p>
                    </Card>
                </div>
                    :
                    <div className='grid grid-cols-12 gap-5'>
                        <div className="col-span-12 lg:col-span-6">
                            <img src={`/images/vectors/${isEmailVerified ? 'verify-email' : 'token-expired'}.png`} alt="Email Verification" className='w-full max-h-[400px] object-contain' />
                        </div>
                        <div className="col-span-12 lg:col-span-6 flex-center">
                            <div className="rounded p-10 border bg-gray-100">
                                <h3 className='font-bold text-[30px] text-center mb-3'>{isEmailVerified? 'Email Verified': 'Link Expired or Not Valid'}</h3>
                                { isEmailVerified ?
                                <p className='max-w-[400px] mb-5 text-center'>Your email has been successfully verified. Welcome aboard! <Link to="/login" className='text-blue-600 underline'>Login Now</Link></p> :
                                <p className='max-w-[400px] mb-5 text-center'>This link is no longer accepted. <Link to="/login" className='text-blue-600 underline'>Login Now</Link></p>
                                }
                            </div>
                        </div>
                    </div>
            }
        </PageSection>
    )
}

export default EmailVerification
