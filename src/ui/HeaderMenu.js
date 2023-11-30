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
    <header>
      <nav className="flex bg-slate-300 h-20">
        <div className="w-full grid grid-cols-5 gap-4 items-center text-center">
          <div className="text-2xl font-['KCC-Ganpan']"><Link to="/">부산 주차장 정보</Link></div>
          <div>
            <ul>
              <div className="float-right">
                <li className="text-lg font-EFwatermelonSalad">
                  <Link to="/board" className="border-b-4">주차서비스</Link>
                </li>
              </div>
            </ul>
          </div>
          <div>
            <ul>
              <div>
                <li className="text-lg font-EFwatermelonSalad">
                  <Link to="/parkingfee" className="border-b-4">주차요금</Link>
                </li>
              </div>
            </ul>
          </div>
          <div >
            <ul >
              <div className="float-left">
                <li className="text-lg font-EFwatermelonSalad">
                  <Link to="/parking" className="border-b-4">주차장</Link>
                </li>
              </div>
            </ul>
          </div>
          <div>
            {isLogAtom ? <Logout user={user} /> 
            : <Link to="/login" role="button" className="border-2 rounded-lg inline-flex py-2 px-4">
              로그인</Link>}
          </div>
          
        </div>
      </nav>
    </header >
  )
}

export default HeaderMenu;