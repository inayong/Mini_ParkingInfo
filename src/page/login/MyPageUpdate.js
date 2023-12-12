import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const MyPageUpdate = () => {

    const [myData, setMyData] = useState([]);
    const [loggedInUser, setLoggedInUser] = useState('');
    const [nickname, setNickName] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

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
    // console.log(myData.map((item) => item.username))
    // console.log(loggdIn)
    const name = myData.map((item) => item.username)

    const fetchMyUpdate = (name) => {
        fetch(`http://10.125.121.217:8080/user/update/${name}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem("token")
            },
            body: JSON.stringify({
                "nickname": nickname,
                "password": password
            })
        })
            .then((resp) => {
                if (resp.ok) {
                    setNickName(nickname);
                    setPassword(password);
                    alert("회원정보 수정 완료")
                    navigate("/mypage")
                } else {
                    alert("회원정보 수정 실패")
                }
            })
            .catch((err) => console.log("회원정보 수정 중 오류:", err))

    }


    return (
        <div className='bg-slate-50 h-full'>
            <div className="flex flex-col "></div>
            {loggdIn.map((user, idx) => (
                <div key={idx} class="flex flex-col justify-center items-center h-4/5">
                    <input value={nickname} onChange={(e) => setNickName(e.target.value)} className='bg-slate-50 p-5' type='text' placeholder='새로운 이름 입력'/>
                    <input value={password} onChange={(e) => setPassword(e.target.value)} className='bg-slate-50 p-5' type='password' placeholder='새로운 비밀번호 입력'/>
                    <button onClick={() => fetchMyUpdate(user.username)} className='bg-slate-50 p-5'>수정 완료</button>
                </div>
            ))}
            <div className="flex flex-col "></div>
        </div>
    )
}

export default MyPageUpdate;