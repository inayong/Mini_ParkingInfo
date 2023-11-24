import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { LogAtom} from '../page/'

const Logout = ({userName, setUserName}) => {
    const navigate = useNavigate();

    const [isLogIn, setIsLogIn] = useRecoilState(LogAtom);

    const handleLogout = () => {
        localStorage.removeItem("username");
        localStorage.removeItem("token");
        setUserName(null);
        // setToken(null);
        navigate("/");
    }
  return (
    <div>
        <div>{userName} 님</div>
        <button handleClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Logout;