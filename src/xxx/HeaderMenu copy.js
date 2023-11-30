import { useEffect, useState } from "react";
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
    <header className="grow">
      <nav className="flex bg-slate-300 px-4 py-2.5 h-20 ">
        <div className="flex justify-between items-center w-full">
          <span className="text-xl font-semibold"><Link to="/">부산 주차장 정보</Link></span>
          <div className="flex items-center lg:order-2">
            {isLogAtom ? <Logout user={user} /> : <Link to="/login" role="button">로그인</Link>}
          </div>
          <div className="lg:w-auto">
            <ul className="flex flex-col mt-4  lg:flex-row lg:space-x-8 lg:mt-0 ">
              <div className="pr-10">
                <li className="border-b-4">
                  <Link to="/board" className="font-semibold">주차서비스</Link>
                </li>
              </div>
              <div className="pr-10">
                <li className="border-b-4">
                  <Link to="/parkingfee" className="">주차요금</Link>
                </li>
              </div>
              <div className="pr-10">
                <li className="border-b-4">
                  <Link to="/parking" className="">주차장</Link>
                </li>
              </div>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default HeaderMenu;