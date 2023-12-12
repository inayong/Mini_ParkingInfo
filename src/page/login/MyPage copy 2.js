import React, { useEffect, useState } from 'react'

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

  const [showPasswordForm, setShowPasswordForm] = useState(false);

  const handlePWUpdate = () => {
    setShowPasswordForm(!showPasswordForm);
  };

  const 

  return (
    <div className='bg-slate-50 h-full'>
      <div className="flex flex-col "></div>
      {loggdIn.map((user, idx) => (
      <div key={idx} class="flex flex-col justify-center items-center h-4/5">
        <div className='bg-slate-50 p-5'>이름 : {user.nickname}</div>
        <div className='bg-slate-50 p-5'>아이디 : {user.username}</div>
        <div className='bg-slate-50 p-5'>비밀번호 <button onClick={handlePWUpdate}>변경하기</button></div>
        {showPasswordForm && (
          <div className=' p-5'>
            <input type="password" placeholder="새로운 비밀번호" />
            <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2'>변경</button>
          </div>
        )}
        <div className='bg-slate-50 p-5'>가입일 : {user.regiDate.slice(0, 10)}</div>
      </div>
      ))}
      <div className="flex flex-col "></div>
    </div>
  )
}

export default MyPage;