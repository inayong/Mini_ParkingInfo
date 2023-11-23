import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const LoginPage = () => {

    const [userName, setUserName] = useState('');
    const [passWord, setPassWord] = useState('');

    const handleLogin = (e) => {
        // e.preventDefault();
        // if (userName === "") {
        //     alert("아이디 다시 입력");
        // } else if (passWord === "") {
        //     alert("비밀번호 다시 입력")
        // } else {
        //     axios.post('http://10.125.121.217:8080/login', {
        //         username: userName,
        //         password: passWord,
        //     })
        //         .then((res) => res.json())
        //         .then((res) => {
        //             if (res.TOKEN) {
        //                 localStorage.setItem('token', `${res.TOKEN}`);
        //                 localStorage.setItem('user_name', `${res.user_name}`);
        //                 alert(userName + "님")
        //             } else {
        //                 alert('다시 확인');
        //             }
        //         }) 
        //         .catch((err) => {
        //             console.log(err);
        //             alert('다시 입력')
        //         })
        // }       
        // e.preventDefault();
        if (userName === "") {
            alert("아이디 다시 입력")
        } else if (passWord === "") {
            alert("비밀번호 다시 입력")
        } else {
            axios.post('http://10.125.121.217:8080/login', {
                username: userName,
                password: passWord,
            })
                .then(function (resp) {
                    // console.log("login")
                    const token = resp.data.token;
                    localStorage.setItem("token:", token)


                    const config = {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    };
                    axios.get('/', config)
                        .then(function (resp) {
                            console.log("token:" + resp.data);
                            alert(userName + "님");
                            window.location.href = "/";
                        })
                        .catch(function (err) {
                            console.log("err" + err);
                        });
                })
                .catch(() => {
                    alert("다시 입력")
                })
        }
    };



    return (
        <main className='grow'>
            <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
                <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                    <div
                        className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl">
                    </div>
                    <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
                        <div className="max-w-md mx-auto">
                            <div>
                                <h1 className="text-2xl font-semibold">Login</h1>
                            </div>
                            <div className="divide-y divide-gray-200">
                                <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                                    <div className="relative">
                                        <input onChange={(e) => setUserName(e.target.value)} value={userName} id="email" name="email" type="text" className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Email address" />
                                        <label htmlFor="email" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">아이디</label>
                                    </div>
                                    <div className="relative">
                                        <input onChange={(e) => setPassWord(e.target.value)} value={passWord} id="password" name="password" type="password" className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Password" />
                                        <label htmlFor="password" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">비밀번호</label>
                                    </div>
                                    <div className="relative">
                                        <button onClick={handleLogin} className="bg-blue-500 text-white rounded-md px-2 py-1">로그인</button>
                                        <button className="bg-blue-500 text-white rounded-md px-2 py-1"><Link to='/signup'>회원가입</Link></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>

    )
}

export default LoginPage;