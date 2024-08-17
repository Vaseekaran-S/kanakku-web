import Alert from "components/alerts"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { setPopupAlert } from "redux-store/popups/popupSlice"

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
  const dispatch = useDispatch();
  const [isAlertOn, setIsAlertOn ] = useState(false);
  const { alertStatus, alertMessage, alertType } = useSelector(store => store.popup.alert)
  const isAuthenticated = useSelector(store => store.user.isAuthenticated)

  useEffect(()=>{
    setIsAlertOn(alertStatus)
    if(alertStatus){
      setTimeout(()=>{
        dispatch(setPopupAlert({ alertStatus: false, alertMessage: "", alertType: "" }))
      }, 5000)
    }
  }, [alertStatus]);
  
  return (
    <div>
      { isAlertOn && <Alert message={alertMessage} type={alertType}/> }
      <hr />
      <div className="py-6 px-5">
        <div className="max-w-[400px] m-auto">
          <div className="text-center">
            <img src="/images/logo/logo.png" alt="Kanakku Logo" className="max-w-[150px] m-auto mb-2" />
            <p className="font-medium">Ready to transform Your Manual Accounting into a Digital Masterpiece!</p>
          </div>
          {isAuthenticated &&
            <div className="text-center flex flex-col md:block md:divide-x md:divide-black mt-4">
              {footerLinks.map(footerLink => [
                <Link key={footerLink.link} to={footerLink.link} className="px-2 hover:font-medium">{footerLink.label}</Link>
              ])}
            </div>
          }
        </div>
      </div>
      <p className="pb-3 text-center text-sm font-medium">
        Copyright ©2024 All Rights Reserved
      </p>
    </div>
  )
}

export default Footer