import PrimaryBtn from "components/buttons/primary"
import { useSelector } from "react-redux"

function NavBar(){
  return (
    <div className="flex">
    </div>
  )
}

function Header() {
  const isAuthenticated = useSelector(store => store.user.isAuthenticated)
  return (
    <div className="border-b-[1px] w-full py-4 px-2">
      <div className="flex justify-between items-center">
        <a href="/">
          <img src="/images/logo/logo.png" alt="Kanakku Logo" className="max-w-[150px]" />
        </a>
        <div>
          {
            isAuthenticated ?
              <div>Profile</div>
              :
              <PrimaryBtn text="Login" link="/login" ok="ok" />
          }
        </div>
      </div>
    </div>
  )
}

export default Header