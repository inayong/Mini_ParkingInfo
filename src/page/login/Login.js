import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogAtom } from './LogAtom';
import { useRecoilState } from 'recoil';

const LoginPage = () => {

    const [userName, setUserName] = useState('');
    const [passWord, setPassWord] = useState('');

    const [isLogAtom, setIsLogAtom] = useRecoilState(LogAtom);

    const navigate = useNavigate();

    const handleLogin = (e) => {
        // e.preventDefault();

        if (userName === "") {
            alert("아이디를 입력 해주세요.")
        } else if (passWord === "") {
            alert("비밀번호를 입력 해주세요.")
        } else {
            fetch("http://10.125.121.217:8080/login", {
                method: "post",
                body: JSON.stringify({
                    "username": userName,
                    "password": passWord
                }),
            })
                .then((resp) => {
                    // const tokentest = resp.headers.get("Authorization");
                    // console.log(tokentest);
                    // console.log(resp)
                    if (resp.status === 200) {
                        localStorage.setItem("token", resp.headers.get("Authorization"))
                        localStorage.setItem("username", userName)
                        setIsLogAtom(true);
                        navigate("/");
                    } else {
                        alert("아이디 및 비밀번호를 다시 확인해주세요.")
                    }
                })
                .catch((err) => {
                    console.log("err", err);
                });
        }

    };



    return (
        <main className='grow'>
            <div className="h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
                <div className="relative py-3 sm:max-w-3xl sm:mx-auto">
                    <div
                        className="absolute inset-0 bg-gradient-to-r from-blue-900 to-sky-900 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl">
                    </div>
                    <div className="relative px-4 bg-white shadow-lg sm:rounded-3xl sm:p-20 ">
                        <div className="max-w-md mx-auto">
                            <div>
                                <h1 className="text-2xl font-semibold">Login</h1>
                            </div>
                            <div className="divide-y divide-gray-200">
                                <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                                    <div className="relative">
                                        <input onChange={(e) => setUserName(e.target.value)} id="username" type="text" className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="아이디" />
                                        <label htmlFor="username" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">아이디</label>
                                    </div>
                                    <div className="relative">
                                        <input onChange={(e) => setPassWord(e.target.value)} id="password" type="password" className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="비밀번호" />
                                        <label htmlFor="password" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">비밀번호</label>
                                    </div>
                                    <div className="relative ">
                                        <button onClick={handleLogin} className="bg-blue-900 text-white rounded-md px-2 py-1">로그인</button>
                                    </div>
                                </div>
                            </div>
                            <div className='flex '>
                                <p className='text-gray-400 text-xs pt-1'>회원이 아니시면...</p>
                                <p className="text-gray-400 underline text-sm"><Link to='/signup'>회원가입</Link></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>

    )
}

export default LoginPage;