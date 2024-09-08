import React from 'react'
import Card from 'components/cards'

function AccountCardSkeleton() {
    return (
        <Card shadow={false}>
            <div className="animate-pulse">
                <div className='flex items-center gap-2 mb-3'>
                    <div className="rounded-lg bg-slate-700 h-9 w-9"></div>
                    <span className="w-[50%] py-2 bg-slate-700 rounded"></span>
                </div>
                <div className="flex justify-between">
                    <p className='bg-slate-700 inline px-5 py-3 rounded font-medium'></p>
                    <div className='flex items-center gap-1'>
                        <span className='bg-slate-700 rounded p-2'></span>
                        <span className='bg-slate-700 rounded p-2'></span>
                    </div>
                </div>
                <div className="h-2 bg-slate-700 rounded mt-2 lg:w-[70%]"></div>
            </div>
        </Card>
    )
}

export default AccountCardSkeleton
