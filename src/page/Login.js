import React, { useState, useEffect, useRef } from 'react';
import HeaderMenu from '../ui/HeaderMenu';

const LoginPage = ({ setUser }) => {
    const [inUser, setInUser] = useState();
    const [inPw, setInPw] = useState();

    const handleLogin = (e) => {
        e.priventDefault();
    }

    useEffect(() => {

    }, [inUser, inPw]);
    
    


    return (
        <main className='grow'>
            <section className="bg-slate-50">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="stext-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                                로그인
                            </h1>
                            <form className="space-y-4 md:space-y-6" action="/MainPage">
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">아이디</label>
                                    <input type="email" name="email" id="email" onChange={(e) => setInUser(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="name@company.com" required="" />
                                </div>
                                <div>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">비밀번호</label>
                                    <input type="password" name="password" id="password" onChange={(e) => setInPw(e.target.value)} placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required="" />
                                </div>
                                <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full' type='submit' onClick={handleLogin}>로그인</button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </main>

    )
}

export default LoginPage;