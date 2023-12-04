import React, { useEffect, useRef, useState } from 'react'
import { GoSearch } from "react-icons/go";
import { Link, json } from 'react-router-dom';
import KakaoMap from '../ui/KakaoMap';
import { getValue } from '@testing-library/user-event/dist/utils';
import Pagination from 'react-js-pagination';
import "./pagination.css";


const Main = () => {
    const [parkData, setParkData] = useState([]);
    const selRef = useRef();
    const sel2Ref = useRef();
    const [selGu, setSelGu] = useState([]);
    const [selDong, setSelDong] = useState([]);
    const [searInfo, setSearInfo] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const displayData = searInfo.slice(startIndex, endIndex);

    // const [page, setPage] = useState(1);
    // const [post, setPost] = useState([]);
    // const pageRange = 5;
    // const totalPost = 598;
    // const btnRange = 5;

    // const currentSet = Math.ceil(page / btnRange);
    // const startPage = (currentSet - 1) * btnRange + 1;

    // const endPage = startPage + btnRange - 1;
    // const totalSet = Math.ceil(Math.ceil(totalPost / pageRange) / btnRange);

    // const startPost = (page - 1) * pageRange + 1;
    // const endPost = startPost + pageRange - 1;


    //fetch
    const getData = () => {

        fetch("http://10.125.121.217:8080/parking/refer")
            .then(resp => resp.json())
            .then(data => {
                setParkData(data)
                // console.log(data)
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        getData();
    }, [])

    //option
    const addGu = [...new Set(parkData.map((item) => item.gu))];
    const addrGu = [...addGu].sort();
    // console.log(addrGu)


    //option 선택
    const handleSel1 = () => {
        // console.log(selRef.current.value)
        if (selRef.current.value === '') return;

        let selgu = parkData.filter((item) => item.gu === selRef.current.value);
        // console.log("gu", selgu)
        setSelGu(selgu);


    }

    // console.log("guuuu", selGu)

    const addDong = [...new Set(selGu.map(item => item.dong))];
    const addrDong = [...addDong].sort();
    // console.log("dong", addrDong)

    const handleSel2 = () => {
        // console.log(sel2Ref.current.value)
        if (sel2Ref.current.value === '') return;

        let seldong = selGu.map((item) => item.dong === sel2Ref.current.value);
        setSelDong(seldong)
        // console.log("dong", seldong)
    }

    const searchClick = (e) => {
        e.preventDefault();
        const selGuValue = selRef.current.value; // 선택된 '구' 값
        const selDongValue = sel2Ref.current.value; // 선택된 '동' 값
        // console.log("selGuValue", selGuValue)
        // console.log("selDongValue", selDongValue)

        let searGuDong = parkData.filter((item) => {
            if (!selDongValue) {
                return item.gu === selGuValue;
            } else {
                return item.gu === selGuValue && item.dong === selDongValue;
            }
        });
        // console.log("info", searGuDong)
        setSearInfo(searGuDong);
    }

    console.log("info", searInfo)

    //검색기능

    const handleSearch = (e) => {
        // e.preventDefault();
        // console.log(e.target.value)
        let searPrkNm = parkData.filter((item) =>
            item.prkPlaceNm.includes(e.target.value) || item.address.includes(e.target.value)
        );
        console.log("search", searPrkNm)
        setSearInfo(searPrkNm);
    }

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    }




    return (
        <main className='flex flex-col bg-slate-500'>
            <section className=" bg-gray-50 py-10 h-screen ">
                <div className='flex justify-between pb-5'>
                    <div className='flex items-center'>
                        <h3 className='font-bold text-2xl'>주차장 정보</h3>
                    </div>
                </div>
                <div className='flex h-full pb-10'>
                    <div className='flex-none w-1/5'></div>
                    <div className='w-3/5 bg-white shadow-xl rounded-2xl'>
                        <div className='relative flex justify-center pt-12 pb-2'>
                            <div>
                                <select onChange={handleSel1} ref={selRef} className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-ftablel p-2.5 '>
                                    <option value=''>--구--</option>
                                    {addrGu.map((address) => (
                                        <option key={address} value={address}>
                                            {address}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <select onChange={handleSel2} ref={sel2Ref} className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-ftablel p-2.5 '>
                                    <option value=''>--동--</option>
                                    {addrDong.map((address) => (
                                        <option key={address} value={address}>
                                            {address}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <button type="submit" onClick={searchClick} className="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 ">
                                <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                </svg>
                                <span className="sr-only">Search</span>
                            </button>
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
                                    <input type="text" onChange={handleSearch} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-ftablel ps-10 p-2.5 " placeholder="주차장명 검색" />
                                </div>
                            </form>
                        </div>
                        <div className="flex pt-5">
                            <div className="flex-none w-1/6 "></div>
                            <div className="grow relative overflow-x-auto shadow-md sm:rounded-lg">
                                {searInfo && searInfo.length > 0 ? (
                                    <table className='table-auto w-full text-center  border border-gray-300'>
                                        <thead className='bg-slate-300 '>
                                            <tr>
                                                <th className='px-6 py-3'>No.</th>
                                                <th className='px-6 py-3'>주차장명</th>
                                                <th className='px-6 py-3'>주소</th>
                                                <th className='px-6 py-3'>전화번호</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {displayData.map((items) => (
                                                <tr key={items.id} className='border-b'>
                                                    <td className='px-6 py-4'>{items.id}</td>
                                                    <td className='px-6 py-4 hover:underline'><Link to={`parking/detail/${items.prkPlaceNm}`}>{items.prkPlaceNm}</Link></td>
                                                    <td className='px-6 py-4'>{items.address}</td>
                                                    <td className='px-6 py-4'>{items.phoneNumber}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                ) : (
                                    <p className='text-center'>'구' 또는 '동'을 선택해주시거나 주차장명을 검색해주세요.</p>
                                )}

                                <Pagination activePage={currentPage} itemsCountPerPage={itemsPerPage} totalItemsCount={searInfo.length} pageRangeDisplayed={5} onChange={handlePageChange} />
                            </div>
                            <div className="flex-none w-1/6 "></div>
                        </div>
                    </div>
                    <div className='flex-none w-1/5'></div>
                </div>
            </section>
            <section className="bg-gray-300 py-5 h-screen">
                <div>
                    <div>
                        지도
                        <KakaoMap />
                    </div>
                    <div>

                    </div>
                </div>
            </section>
        </main>
    )
}

export default Main;