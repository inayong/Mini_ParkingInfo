import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const MyPage = () => {

  const [myData, setMyData] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState('');

  useEffect(() => {
    const fetchMyPage = () => {
      fetch("http://10.125.121.217:8080/user/list")
        .then(resp => resp.json())
        .then(data => {
          setMyData(data)
          console.log("myy", data)
        })
        .catch(err => console.log("err:", err))
    }

    fetchMyPage();
    const logIn = localStorage.getItem("username")
    setLoggedInUser(logIn)

  }, [])

  const loggdIn = myData.filter(user => user.username === loggedInUser);

  


  return (
    <div className='bg-slate-50 h-full'>
      <div className="flex flex-col "></div>
      {loggdIn.map((user, idx) => (
        <div key={idx} class="flex flex-col justify-center items-center h-4/5">
          <div className='bg-slate-50 p-5'>이름 : {user.nickname}</div>
          <div className='bg-slate-50 p-5'>아이디 : {user.username}</div>
          <div className='bg-slate-50 p-5'>가입일 : {user.regiDate.slice(0, 10)}</div>
          <button className='bg-slate-50 p-5'><Link to={"/mypage/update"}>회원정보 수정</Link></button>
        </div>
      ))}
      <div className="flex flex-col "></div>
    </div>
  )
}

export default MyPage;