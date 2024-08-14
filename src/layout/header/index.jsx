import PrimaryBtn from "components/buttons/primary"
import { useSelector } from "react-redux";
import { MdAccountBalanceWallet, MdEventNote } from "react-icons/md";
import { HiUserGroup } from "react-icons/hi2";
import { GrTransaction } from "react-icons/gr";

import { Link } from "react-router-dom";
import Avatar from "react-avatar";
import store from "redux-store/store";

function Header() {
  const isAuthenticated = useSelector(store => store.user.isAuthenticated)
  const userData = useSelector(store => store.user.userData)

  console.log(userData);
  
  return (
    <div className="border-b-[1px] w-full py-4 px-2">
      <div className="flex justify-between items-center">
        <Link to="/">
          <img src="/images/logo/logo.png" alt="Kanakku Logo" className="max-w-[150px]" />
        </Link>
        <div>
          {
            isAuthenticated ?
              <div className="flex items-center gap-4">
                <Link to="/transactions">
                  <GrTransaction className="text-xl hover:text-blue-800" title="Transactions"/>
                </Link>
                <Link to="/events">
                  <MdEventNote className="text-xl hover:text-blue-800" title="Events"/>
                </Link>
                <Link to="/groups">
                  <HiUserGroup className="text-xl hover:text-blue-800" title="Groups"/>
                </Link>
                <Link to="/profile">
                  <Avatar name="Vasi" title="Profile" className="max-h-[40px] max-w-[40px] rounded-full font-bold text-2xl"/>
                </Link>
              </div>
              :
              <PrimaryBtn text="Login" link="/login" ok="ok" />
          }
        </div>
      </div>
    </div>
  )
}

export default Header