import React, { useEffect, useRef, useState } from 'react'
import { GoSearch } from "react-icons/go";
import { Link, json } from 'react-router-dom';
import KakaoMap from '../comm/KakaoMap';
import Pagination from 'react-js-pagination';
import "./pagination.css";


const Main = () => {
    const [parkData, setParkData] = useState([]);
    const selRef = useRef();
    const sel2Ref = useRef();
    const [selGu, setSelGu] = useState([]);
    const [selDong, setSelDong] = useState([]);


    //sel
    const [searData, setSearData] = useState([]);
    const [gu, setGu] = useState('');
    const [dong, setDong] = useState('');
    const [prkPlaceNm, setPrkPlaceNm] = useState();
    const parkingNm = useRef();

    //sel fetch
    const selData = () => {
        fetch("http://10.125.121.217:8080/parking/refer")
            .then(resp => resp.json())
            .then(data => {
                setParkData(data)
            })
            .catch(err => console.log(err))
    }
    useEffect(() => {
        selData();
    }, [])

    //sel
    const addGu = [...new Set(parkData.map((item) => item.gu))];
    const addrGu = [...addGu].sort();
    // console.log(addrGu)
    const handleSel1 = () => {
        // console.log(selRef.current.value)
        if (selRef.current.value === '') return;

        let selgu = parkData.filter((item) => item.gu === selRef.current.value);
        // console.log("gu", selgu)
        setSelGu(selgu);
        setGu(selRef.current.value);
    }
    const addDong = [...new Set(selGu.map(item => item.dong))];
    const addrDong = [...addDong].sort();
    // console.log("dong", addrDong)

    const handleSel2 = () => {
        // console.log(sel2Ref.current.value)
        if (sel2Ref.current.value === '') return;

        let seldong = selGu.map((item) => item.dong === sel2Ref.current.value);
        setSelDong(seldong)
        // console.log("dong", seldong)
        setDong(sel2Ref.current.value);
    }

    //search
    //fetch
    const searchData = () => {

        const url = `http://10.125.121.217:8080/parking/paging?gu=${gu}&prkPlaceNm=${prkPlaceNm}&dong=${dong}`;
        // console.log("url", url)
        fetch(url)
            .then(resp => resp.json())
            .then(data => {
                setSearData(data)
                // console.log(data)
            })
            .catch(err => console.log(err))
    }


    //option
    // console.log(parkData)
    useEffect(() => {
        searchData();
    }, [prkPlaceNm])


    const handleSearch = (e) => {
        e.preventDefault();
        // console.log("search", parkingNm.current.value)

        setPrkPlaceNm(parkingNm.current.value);
        // console.log("Nm", prkPlaceNm)
    }
    

    // console.log("searData", searData.content)

    const search = searData.content

    


    return (
        <main className='flex flex-col bg-slate-500'>
            <section className=" bg-gray-50 py-10 h-screen ">
                <div className='flex justify-between pb-5'></div>
                <div className='flex h-full pb-10'>
                    <div className='flex-none w-1/5'></div>
                    <div className='w-3/5 bg-white shadow-xl rounded-2xl'>
                        <div>
                            <h3 className='text-center pt-5 font-bold font-EFwatermelonSalad text-lg'>주차장 검색하기</h3>
                        </div>
                        <div className='relative flex justify-center pt-5 pb-2 sm:text-xs'>
                            <div className='pr-1'>
                                <select onChange={handleSel1} ref={selRef} className='font-omyupretty text-lg bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-ftablel p-2.5 '>
                                    <option value=''>--구--</option>
                                    {addrGu.map((address) => (
                                        <option key={address} value={address}>
                                            {address}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className='pl-1'>
                                <select onChange={handleSel2} ref={sel2Ref} className='font-omyupretty text-lg bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-ftablel p-2.5 '>
                                    <option value=''>--동--</option>
                                    {addrDong.map((address) => (
                                        <option key={address} value={address}>
                                            {address}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className='relative flex justify-center'>
                            <form className="flex items-center">
                                <label htmlFor="simple-search" className="sr-only">Search</label>
                                <div className="relative w-ftablel">
                                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                        </svg>
                                    </div>
                                    {/* <input type="text" ref={parkingNm} onChange={handleSearch} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-ftablel ps-10 p-2.5 " placeholder="주차장명 검색" /> */}
                                    <input type="text" ref={parkingNm} className=" font-omyupretty text-lg bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-ftablel ps-10 p-2.5 " placeholder="주차장명 검색" />
                                </div>
                                <button onClick={handleSearch} className="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 ">
                                    <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                    </svg>
                                    <span className="sr-only">Search</span>
                                </button>
                            </form>
                        </div>
                        <div className="flex pt-10">
                            <div className="flex-none w-1/6 "></div>
                            <div className="grow relative overflow-x-auto shadow-md">
                                {searData && Array.isArray(search) && search.length > 0 ? (
                                    <table className='table-auto w-full text-center font-SUITERegular border border-gray-300'>
                                        <thead className='bg-slate-300'>
                                            <tr>
                                                <th className='px-6 py-5'>No.</th>
                                                <th className='px-6 py-5'>주차장명</th>
                                                <th className='px-6 py-5'>주소</th>
                                                <th className='px-6 py-5'>전화번호</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {search.map((item) => (
                                                <tr key={item.id} className='border-b'>
                                                    <td className='px-6 py-4 '>{item.id}</td>
                                                    <td className='px-6 py-4 hover:underline'><Link to={`parking/detail/${item.prkPlaceNm}`}>{item.prkPlaceNm}</Link></td>
                                                    <td className='px-6 py-4'>{item.address}</td>
                                                    <td className='px-6 py-4'>{item.phoneNumber}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                ) : (
                                    <p className='text-center font-omyupretty text-lg'>'구' 또는 '동'을 선택해주시거나 주차장명을 검색해주세요.</p>
                                )}
                            </div>
                            <div className="flex-none w-1/6 "></div>
                        </div>
                    </div>
                    <div className='flex-none w-1/5'></div>
                </div>
            </section>
            <section className="bg-gray-50 py-5 h-screen">
                <div>
                    <div className='flex justify-center pt-36'>
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