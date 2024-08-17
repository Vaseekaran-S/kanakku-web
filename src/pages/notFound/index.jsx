import React from 'react'
import { Link } from 'react-router-dom'

function PageNotFound() {
    return (
        <div className='min-h-[90vh] flex-center'>
            <div className='text-center'>
                <img src="/images/vectors/404.png" alt="Page Not Found" className='max-h-[350px]'/>
                <p className='text-lg'>This page is Not Found</p>
                <Link to="/" className='underline mt-2 text-blue-800 hover:text-blue-500'>Go to Home</Link>
            </div>
        </div>
    )
}

export default PageNotFound
