import PrimaryBtn from "components/buttons/primary";

function HomeOverviewCard({ title, image, isLive }) {
    return (
        <div
            className="relative border h-[280px] md:h-auto md:aspect-square bg-gray-200 rounded-lg"
            style={{
                backgroundImage: `url(${image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}
        >
            <span className='font-bold bg-white rounded-3xl px-3 py-1 absolute left-[15px] top-[15px]'>{title}</span>
            { isLive ? <PrimaryBtn link="/accounts" customCss="absolute bottom-[10px] w-full flex-center border-none text-sm hover:underline">View All</PrimaryBtn>
                : <p className="absolute bottom-[10px] py-1 w-full text-center font-bold bg-white text-green-800">Coming Soon</p>}
        </div>
    );
}

export default HomeOverviewCard;