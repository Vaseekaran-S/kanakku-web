import React from 'react'

function Alert({ message, type }) {
    const statusColors = {
        success: "green",
        error: "red",
        warning: "orange"
    }
    const status = statusColors[type];

    console.log("Status: ", status);
    

    return (
        <div className={`fixed right-[20px] bottom-[20px] flex `}>
            <div className={`border rounded bg-white flex px-3 py-1 border-b-4 border-b-[${status.trim()}]`}>
                <p className='font-medium'>{message}</p>
            </div>
        </div>
    )
}

export default Alert
