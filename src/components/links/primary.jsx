import React from 'react'
import { Link } from 'react-router-dom'

function PrimaryLink({ to, children, customCss }) {
    return (
        <>
            <Link to={to} className={`text-blue-600 font-medium ${customCss}`}>{children}</Link>
        </>
    )
}

export default PrimaryLink
