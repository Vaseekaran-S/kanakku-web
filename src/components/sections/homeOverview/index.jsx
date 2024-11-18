import HomeOverviewCard from 'components/cards/home-overview'
import React from 'react'

function HomeOverview() {
    const overviews = [
        {
            title: "Accounts",
            count: 2,
            image: "https://static.vecteezy.com/system/resources/previews/000/163/568/large_2x/cpa-accountant-element-vector-illustration.jpg",
            isLive: true
        },
        {
            title: "Events",
            count: 0,
            image: "https://eventifier.com/wp-content/uploads/2022/07/Event-planning-guide-illustration-featured.png",
            isLive: false
        },
        {
            title: "Groups",
            count: 0,
            image: "https://fs.hubspotusercontent00.net/hubfs/1985252/Blog_The%20polite%20persons%20guide%20to%20splitting%20the%20bill%20%28558%20%C3%97%20325%20px%29.png",
            isLive: false
        }
    ]
 
    return (
        <div className='mt-5'>
            <h4 className='font-medium text-xl mb-4'>Overview</h4>
            <div className="grid grid-cols-3 lg:grid-cols-12 gap-4 px-5 md:px-0">
                {overviews.map(overview => [
                    <div key={overview.title} className="col-span-3">
                        <HomeOverviewCard {...overview} />
                    </div>
                ])}
            </div>
        </div>
    )
}

export default HomeOverview
