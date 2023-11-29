import { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-router-dom";
import Logout from "../page/Logout";
import { LogAtom } from "../page/login/LogAtom";
import { useRecoilState } from "recoil";

const HeaderMenu = () => {
  const [user, setUser] = useState(null);
  const [isLogAtom, setIsLogAtom] = useRecoilState(LogAtom);

  useEffect(() => {
    setUser(localStorage.getItem("username"))
    if (!user) {
      setIsLogAtom(false)
    } else {
      setIsLogAtom(true)
    }
  }, [setIsLogAtom, user]);

  return (
    <header className="justify-center items-center">
      <nav className="bg-slate-300 px-4 py-2.5">
        <div className="flex flex-wrap justify-between items-center mx-auto">
            <span className="text-xl font-semibold"><Link to="/">부산 주차장 정보</Link></span>
          <div className="flex items-center lg:order-2">
            { isLogAtom ? <Logout user={user} /> : <Link to="/login" role="button">로그인</Link> }
            {/* <a className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"><FiSearch /></a>
            <a className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"><GiHamburgerMenu /></a> */}
          </div>
          <div className="justify-between items-center w-full lg:flex lg:w-auto lg:order-1" id="mobile-menu-2">
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              <li>
                <Link to="/board" className=" py-2 pr-4 pl-3 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0">주차서비스</Link>
              </li>
              <li>
                <Link to="/parkingfee" className="block py-2 pr-4 pl-3 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0">주차요금</Link>
              </li>
              <li>
                <Link to="/parking" className="block py-2 pr-4 pl-3 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0">주차장</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default HeaderMenu;