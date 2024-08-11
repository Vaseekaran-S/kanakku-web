import React from 'react'

function Alert({ message, type }) {
    const statusColors = {
        success: "border-b-[green]",
        error: "border-b-[red]",
        warning: "border-b-[orange]"
    }
    const status = statusColors[type];

    return (
        <div className={`fixed right-[20px] bottom-[20px] flex `}>
            <div className={`border rounded bg-white flex px-3 py-1 border-b-4 ${status}`}>
                <p className='font-medium'>{message}</p>
            </div>
        </div>
    )
}

export default Alert
