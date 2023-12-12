import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Logout from "../page/login/Logout";
import { LogAtom } from "../page/login/LogAtom";
import { useRecoilState, useRecoilValue } from "recoil";
import { TbParking } from "react-icons/tb";

const HeaderMenu = () => {
  
  const [isLogAtom, setIsLogAtom] = useRecoilState(LogAtom);

  

  useEffect(() => {
    
    setIsLogAtom(localStorage.getItem("username"))
    
  }, [isLogAtom]);

  return (
    <header>
      <nav className="flex h-20 bg-gradient-to-tr from-blue-900 to-sky-900 text-white">
        <div className="w-full grid grid-cols-5 gap-4 items-center text-center">
          <div onClick={() => {window.location.reload()}} className="flex justify-between items-center">
            <Link to="/">
              <ul>
                <li className="flex">
                  <div className="text-3xl pl-2"><TbParking /></div>
                  <div className="text-2xl font-KCCGanpan pl-2">부산 주차장 정보</div> 
                </li>
              </ul>
            </Link>
          </div>
          <div>
            <ul>
              <div className="float-right">
                <li className="text-lg font-EFwatermelonSalad">
                  <Link to="/board" className="border-b-2">주차서비스</Link>
                </li>
              </div>
            </ul>
          </div>
          <div>
            <ul>
              <div>
                <li className="text-lg font-EFwatermelonSalad">
                  <Link to="/parkingfee" className="border-b-2">주차요금</Link>
                </li>
              </div>
            </ul>
          </div>
          <div >
            <ul >
              <div className="float-left">
                <li className="text-lg font-EFwatermelonSalad">
                  <Link to="/parking" className="border-b-2">주차장</Link>
                </li>
              </div>
            </ul>
          </div>
          <div>
            {isLogAtom ? <Logout userName={isLogAtom} />
              : <Link to="/login" role="button" className="border-2 rounded-lg inline-flex py-2 px-4 font-HakgyoansimWoojuR font-semibold">
                로그인</Link>}
          </div>

        </div>
      </nav>
    </header >
  )
}

export default HeaderMenu;