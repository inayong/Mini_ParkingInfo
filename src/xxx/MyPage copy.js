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

  return (
    <div className=''>
      {/* <div className=''> */}
        {loggdIn.map((user, idx) => (
          <div key={idx} class="flex flex-col items-center">
            <div className='bg-slate-50 p-5'>이름 : {user.nickname}</div>
            <div className='bg-slate-50 p-5'>아이디 : {user.username}</div>
            <div className='bg-slate-50 p-5'>가입일 : {user.regiDate.slice(0, 10)}</div>
          </div>
        ))}
      {/* </div> */}
    </div>
  )
}

export default MyPage;