import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { LogAtom } from './LogAtom';

const Logout = ({userName}) => {
    const navigate = useNavigate();

    const [isLogAtom, setIsLogAtom] = useRecoilState(LogAtom);

    // const inputUserName = document.getElementById('username');
    // const inputValue = inputUserName.value;

    const handleLogout = (e) => {
        // e.preventDefault();
        localStorage.removeItem("username");
        localStorage.removeItem("token");
        // setUserName(null);
        setIsLogAtom(false);
        alert("로그아웃 완료")
        navigate("/");
    }
  return (
    <div className='flex items-center'>
        <div className='flex-col pr-2 font-NanumSquareNeoVariable '><Link to="/mypage" className='hover:underline'>{userName} 님</Link></div>
        <button onClick={handleLogout} className='border-2 rounded-lg inline-flex py-1 px-2 font-HakgyoansimWoojuR font-semibold'>로그아웃</button>
    </div>
  )
}

export default Logout;