import React from 'react';

function ToggleBtn({ label, customCss, active, link, children, ...others }) {
    const className = `border px-3 py-2 rounded font-medium ${active ? 'text-white bg-green-600 hover:bg-green-700' : 'hover:bg-gray-100'} ${customCss}`
    return (
        <button className={className} {...others}>
            {children || label}
        </button>
    )
}

export default ToggleBtn
