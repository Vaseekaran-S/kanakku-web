
function Header() {
  return (
    <div className="border-b-[1px] w-full py-5 px-2">
      <div className="flex justify-between">
        <a href="/">
          <img src="/logo/logo.png" alt="Kanakku Logo" className="max-w-[150px]" />
        </a>
        <div>
          <a href="/" className="">+ Create </a>
        </div>
      </div>
    </div>
  )
}

export default Header