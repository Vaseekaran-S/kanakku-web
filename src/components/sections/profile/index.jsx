import Card from "components/cards"
import { FaCirclePlus } from "react-icons/fa6";
import { Link } from "react-router-dom";

const ProfileTableCard = ({ icon, label, link, badge = false }) => {
    return (
        <Link to={link}>
            <Card customCss="relative flex-center flex-col gap-2 h-[150px] cursor-pointer shadow-none hover:shadow-none hover:bg-gray-100">
                {icon}
                <p className="font-medium">{label}</p>
                {badge && <span className="absolute top-1 right-1 px-2 py-0 bg-green-800 text-white rounded-full">{badge}</span>}
            </Card>
        </Link>
    )
}

function ProfileTable({ title, count = 0, icon, isLive, link } ) {
    return (
        <div className="py-4">
            <h2 className='text-lg font-bold mb-2'>{title} ({count})</h2>
            <div className='grid grid-cols-6 sm:grid-cols-9 md:grid-cols-12 gap-4'>
                <div className="col-span-3">
                    <ProfileTableCard label="Create" link={`/${link}/create`} icon={<FaCirclePlus fontSize={35} />} />
                </div>
                <div className="col-span-3">
                    <ProfileTableCard label={title} link={`/${link}`} icon={icon} badge={count || false} />
                </div>
            </div>
        </div>
    )
}

export default ProfileTable;