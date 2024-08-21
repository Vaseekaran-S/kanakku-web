import PrimaryBtn from "components/buttons/primary";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const footerLinks = [
  {
    label: "Accounts",
    link: "/accounts"
  },
  {
    label: "Transactions",
    link: "/transactions"
  },
  {
    label: "Events",
    link: "/events"
  },
  {
    label: "Groups",
    link: "/groups"
  },
  {
    label: "Profile",
    link: "/profile"
  },
]

function Footer() {
  const isAuthenticated = useSelector(store => store.user.isAuthenticated)

  return (
    <div>
      <hr />
      <div className="py-6 px-5 bg-gray-100">
        <div className="max-w-[400px] m-auto">
          <div className="text-center">
            <img src="/images/logo/logo.png" alt="Kanakku Logo" className="max-w-[150px] m-auto mb-2" />
            <p className="font-medium">Effortless financial management, empowering your financial future.</p>
          </div>
          <div className="py-4 text-center">
            {isAuthenticated ?
              <div className="flex flex-col md:block md:divide-x md:divide-black">
                {footerLinks.map(footerLink => [
                  <Link key={footerLink.link} to={footerLink.link} className="px-2 hover:font-medium">{footerLink.label}</Link>
                ])}
              </div> :
              <PrimaryBtn label="SignUp Now" link="/signup" customCss="mb-4" />
            }
          </div>
        </div>
        <p className="text-center text-sm font-medium">
          Copyright ©2024 All Rights Reserved
        </p>
      </div>
    </div>
  )
}

export default Footer