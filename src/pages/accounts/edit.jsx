import { getAccountByUrl } from 'api/accounts';
import AccountForm from 'components/formik/account'
import PageSection from 'components/sections/page'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

function EditAccount() {
    const navigate = useNavigate();
    const { _id: userId } = useSelector((store) => store.user.userData);
    const { url } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [account, setAccount] = useState({});

    useEffect(() => {
        const fetchAccount = async () => {
            try {
                const response = await getAccountByUrl(userId, url);
                if(response?.type === "error") return navigate("/accounts")
                setAccount(response);
            } finally {
                setIsLoading(false);
            }
        };
        fetchAccount();
    }, [url, userId])

    return (
        <PageSection customCss="flex-center flex-col md:flex-row gap-4 py-7">
            <div className='md:w-[40%] flex-center'>
                <img src="/images/vectors/account.jpg" alt="Reset Password" className='w-full max-w-[400px]' />
            </div>
            <div className='flex-center md:w-[40%]'>
                {!isLoading && <AccountForm data={account} />}
            </div>
        </PageSection>
    )
}

export default EditAccount
