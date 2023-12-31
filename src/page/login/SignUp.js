import axios from 'axios';
import React, { useState } from 'react';
// import {ReactComponent as Carsignup} from '../ui/images/CarSignup.svg';
import { FaCarTunnel } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';


const SignUp = () => {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const register = () => {

        fetch("http://10.125.121.217:8080/user/join", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    },
                body: JSON.stringify({
                    "nickname": name,
                    "username": id,
                    "password": password,
                    "checkPassword": confirmPassword
                }),
            })
            .then((resp) => {
                // console.log(resp);
                if ((resp.status === 200)) {
                    alert("회원가입 완료");
                    navigate("/login");
                } else if ((resp.status) === 406) {
                    // console.log("500",resp.status)
                    alert("이미 존재하는 아이디입니다. 아이디를 변경해서 가입해주세요.")
                }
            })
            .catch((err) => {
                console.log("error", err)
            })
    };

    const handleName = (e) => {
        // console.log("이름",e.target.value)
        setName(e.target.value);
    }
    const handleId = (e) => {
        // console.log("아이디",e.target.value)
        setId(e.target.value);
    }
    const handlePassword = (e) => {
        // console.log("비번",e.target.value)
        setPassword(e.target.value);
    }
    const handleConfirmPassword = (e) => {
        // console.log("확인",e.target.value)
        setConfirmPassword(e.target.value);
    }



    return (

        <main>
            <div className="min-w-screen min-h-screen flex items-center justify-center px-5 py-5">
                <div className="bg-gray-100 text-gray-500 rounded-3xl shadow-xl w-1/2 overflow-hidden">
                    <div className="md:flex w-full">
                        <div className="hidden md:block w-1/2 bg-gradient-to-r from-sky-900 to-blue-900 py-10 px-10">
                            {/* <Carsignup className='justify-center items-center mt-60 mr-96'/> */}
                            <FaCarTunnel className='w-full h-full fill-white' />
                        </div>
                        <div className="w-full md:w-1/2 py-10 px-5 md:px-10">
                            <div className="text-center mb-10">
                                <h1 className="font-bold text-3xl text-gray-900">SignUp</h1>
                                <p>회원가입을 해보옵시다아</p>
                            </div>
                            <div>
                                <div className="flex -mx-3">
                                    <div className="w-full px-3 mb-5">
                                        <label htmlFor="" className="text-xs font-semibold px-1">이름</label>
                                        <div className="flex">
                                            <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i className="mdi mdi-email-outline text-gray-400 text-lg"></i></div>
                                            <input type="text" onChange={handleName} className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-sky-800" placeholder="8글자 이하" />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex -mx-3">
                                    <div className="w-full px-3 mb-5">
                                        <label htmlFor="" className="text-xs font-semibold px-1">아이디</label>
                                        <div className="flex">
                                            <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i className="mdi mdi-email-outline text-gray-400 text-lg"></i></div>
                                            <input type="text" onChange={handleId} className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-sky-800" placeholder="영문 및 숫자" />
                                        </div>
                                        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                                    </div>
                                </div>
                                <div className="flex -mx-3">
                                    <div className="w-full px-3 mb-5">
                                        <label htmlFor="" className="text-xs font-semibold px-1">비밀번호</label>
                                        <div className="flex">
                                            <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i className="mdi mdi-email-outline text-gray-400 text-lg"></i></div>
                                            <input type="password" onChange={handlePassword} className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-sky-800" placeholder="************" />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex -mx-3">
                                    <div className="w-full px-3 mb-5">
                                        <label htmlFor="" className="text-xs font-semibold px-1">비밀번호 확인</label>
                                        <div className="flex">
                                            <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i className="mdi mdi-email-outline text-gray-400 text-lg"></i></div>
                                            <input type="password" onChange={handleConfirmPassword} className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-sky-800" placeholder="************" />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex -mx-3">
                                    <div className="w-full px-3 mb-5">
                                        <button onClick={register} className="block w-full max-w-xs mx-auto bg-blue-800 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-3 font-semibold">REGISTER NOW</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex items-end justify-end fixed bottom-0 right-0 mb-4 mr-4 z-10">
                <div>

                </div>
            </div>
        </main>
    )
}

export default SignUp;