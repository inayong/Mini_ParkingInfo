import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { LogAtom } from '../page/login/LogAtom';

const Logout = ({userName}) => {
    const navigate = useNavigate();

    const [isLogAtom, setIsLogAtom] = useRecoilState(LogAtom);

    const inputUserName = document.getElementById('username');
    const inputValue = inputUserName.value;

    const handleLogout = (e) => {
        e.preventDefault();
        localStorage.removeItem("username");
        localStorage.removeItem("token");
        // setUserName(null);
        setIsLogAtom(false);
        alert("로그아웃 완료")
        navigate("/");
    }
  return (
    <div className='flex'>
        <div className='flex-col pr-2'>{inputValue} 님</div>
        <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Logout;