import Card from "components/cards"
import { FaCirclePlus } from "react-icons/fa6";
import { Link } from "react-router-dom";

const ProfileTableCard = ({ icon, label, link }) => {
    return (
        <Link to={link}>
            <Card customCss="flex-center flex-col gap-2 h-[150px] cursor-pointer shadow-none hover:shadow-none hover:bg-gray-100">
                {icon}
                <p className="font-medium">{label}</p>
            </Card>
        </Link>
    )
}

function ProfileTable({ data: {title, icon, link} }) {
    return (
        <div className="py-4">
            <h2 className='text-lg font-bold mb-2'>{title}</h2>
            <div className='grid grid-cols-6 sm:grid-cols-9 md:grid-cols-12 gap-4'>
                <div className="col-span-3">
                    <ProfileTableCard label="Create" link={`/${link}/create`} icon={<FaCirclePlus fontSize={35} />} />
                </div>
                <div className="col-span-3">
                    <ProfileTableCard label={title} link={`/${link}`} icon={icon} />
                </div>
            </div>
        </div>
    )
}

export default ProfileTable;