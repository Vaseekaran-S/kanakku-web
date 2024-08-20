import React from 'react'
import Card from 'components/cards'

function AccountCardSkeleton({ name, balance }) {
    return (
        <Card shadow={false}>
            <div className="animate-pulse flex space-x-4">
                <div className="rounded-full bg-slate-700 h-10 w-10"></div>
                <div className="flex-1 space-y-6 py-1">
                    <div className="h-2 bg-slate-700 rounded"></div>
                    <div className="space-y-3">
                        <div className="grid grid-cols-3 gap-4">
                            <div className="h-2 bg-slate-700 rounded col-span-2"></div>
                            <div className="h-2 bg-slate-700 rounded col-span-1"></div>
                        </div>
                        <div className="h-2 bg-slate-700 rounded"></div>
                    </div>
                </div>
            </div>
            <h2 className='text-xl font-bold mb-2'>{name}</h2>
            <p className='bg-green-800 inline px-2 py-1 rounded font-medium text-white'>Rs {balance}</p>
        </Card>
    )
}

export default AccountCardSkeleton
