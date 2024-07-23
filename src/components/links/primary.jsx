import React from 'react'
import { Link } from 'react-router-dom'

function PrimaryLink({ to, children }) {
    return (
        <>
            <Link to={to} className='text-blue-600 font-medium'>{children}</Link>
        </>
    )
}

export default PrimaryLink
