import React, { useEffect, useRef, useState } from 'react'
import { GoSearch } from "react-icons/go";
import { Link, json } from 'react-router-dom';
import KakaoMap from '../ui/KakaoMap';
import { getValue } from '@testing-library/user-event/dist/utils';
import KakaoMap2 from '../ui/KakaoMap';



const Main = () => {
    const [parkData, setParkData] = useState();
    const selRef = useRef();
    const sel2Ref = useRef();
    const [selGu, setSelGu] = useState([]);
    const [selDong, setSelDong] = useState([]);

    //fetch
    const getData = () => {

        fetch("http://10.125.121.217:8080/parking/refer")
            .then(resp => resp.json())
            .then(data => {
                setParkData(data)
                console.log(data)
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        getData();
    }, [])

    //option
    const addGu = parkData ? [...new Set(parkData.map((item) => item.gu))] : [];
    const addrGu = [...addGu].sort();
    console.log(addrGu)
    
    
    //option 선택
    const handleSel1 = (e) => {
        console.log(e.target.value)
        if (selRef.current.value === '') return;

        let selgu = parkData.filter((item) => item.gu === e.target.value);
        console.log("gu", selgu)
        setSelGu(selgu);

        
    }

    // console.log("guuuu", selGu)
    
    const addDong = [...new Set(selGu.map(item => item.dong))];
    const addrDong = [...addDong].sort();
    console.log("dong", addrDong)

    const handleSel2 = (e) => {
        console.log(e.target.value)
        if (sel2Ref.current.value === '') return;
        
        let seldong = selGu.map((item) => item.dong === e.target.value);
        setSelDong(seldong)
        console.log("dong", seldong)
    }

    const searchClick = (e) => {
        e.preventDefault();
        console.log("bu", e.target.value)

    }


    return (
        <main className='flex flex-col bg-slate-500'>
            <section className=" bg-gray-50 py-10 h-screen">
                <div className='flex justify-between pb-5'>
                    <div className='flex items-center'>
                        <h3 className='font-bold text-2xl'>주차장 정보</h3>
                    </div>
                </div>
                <div className='relative flex justify-center py-12'>
                    <div>
                        <select onChange={handleSel1} ref={selRef} className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'>
                            <option value=''>--구--</option>
                            {addrGu.map((address) => (
                                <option key={address} value={address}>
                                    {address}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <select onChange={handleSel2} ref={sel2Ref} className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'>
                            <option value=''>--동--</option>
                            {addrDong.map((address) => (
                                <option key={address} value={address}>
                                    {address}
                                </option>
                            ))}
                        </select>
                    </div>
                    <form className="flex items-center">
                        <label htmlFor="simple-search" className="sr-only">Search</label>
                        <div className="relative w-full">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                </svg>
                            </div>
                            {/* <input type="text" value={nameInput} onChange={getValue} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="주차장명 검색" required /> */}
                            <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="주차장명 검색" />
                        </div>
                        <button type="submit" onClick={searchClick} className="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                            <span className="sr-only">Search</span>
                        </button>
                    </form>
                </div>
            </section>
            <section className="bg-gray-300 py-5 h-screen">
                <div>
                    <div>
                        지도
                        {/* <KakaoMap /> */}
                    </div>
                    <div>

                    </div>
                </div>
            </section>
        </main>
    )
}

export default Main;