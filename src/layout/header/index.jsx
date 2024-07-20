import PrimaryBtn from "../../components/buttons/primary"

function Header() {
  return (
    <div className="border-b-[1px] w-full py-4 px-2">
      <div className="flex justify-between items-center">
        <a href="/">
          <img src="/images/logo/logo.png" alt="Kanakku Logo" className="max-w-[150px]" />
        </a>
        <div>
          <PrimaryBtn text="Login" link="/login"/>
        </div>
      </div>
    </div>
  )
}

export default Header