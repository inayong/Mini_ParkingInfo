import React, { useEffect, useRef, useState } from 'react'
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
    const [prkPlaceNm, setPrkPlaceNm] = useState('');
    const [isAll, setIsAll] = useState(false);
    const parkingNm = useRef();
    const [page, setPage] = useState(0);

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

    useEffect(() => {
        console.log("useEffect",isAll)
    }, [isAll])

    //sel
    const addGu = [...new Set(parkData.map((item) => item.gu))];
    const addrGu = [...addGu].sort();
    // console.log(addrGu)
    const addDong = [...new Set(selGu.map(item => item.dong))];
    const addrDong = [...addDong].sort();
    // console.log("dong", addrDong)

    const handleSel1 = () => {
        // console.log(selRef.current.value)
        if (selRef.current.value === '') return;

        let selgu = parkData.filter((item) => item.gu === selRef.current.value);
        // console.log("gu", selgu)
        setSelGu(selgu);
        setGu(selRef.current.value);
        parkingNm.current.value = '';
        setPrkPlaceNm('');
    }

    const handleSel2 = () => {
        // console.log(sel2Ref.current.value)
        if (sel2Ref.current.value === '') return;

        let seldong = selGu.map((item) => item.dong === sel2Ref.current.value);
        setSelDong(seldong)
        // console.log("dong", seldong)
        setDong(sel2Ref.current.value);
        parkingNm.current.value = '';
        setPrkPlaceNm('');
    }

    //search
    //fetch
    const searchData = () => {

        const url = `http://10.125.121.217:8080/parking/paging?gu=${gu}&dong=${dong}&prkPlaceNm=${prkPlaceNm}&page=${page}`;
        console.log("url", url)
        fetch(url)
            .then(resp => resp.json())
            .then(data => {
                setSearData(data) 
                // setPSize(searData.size)
                // setTotalPage(searData.totalElements)
                console.log(isAll)
                console.log(data)
            })
            .catch(err => console.log(err))
    }


    //option
    // console.log(parkData)
    useEffect(() => {
        searchData();
    }, [prkPlaceNm, gu, dong, page])


    const handleSearch = (e) => {
        e.preventDefault();
        setIsAll(true);
        setPrkPlaceNm(parkingNm.current.value);
        // console.log("Nm", prkPlaceNm)

    }

    const handlePChange = () => {
        selRef.current.value = '';
        sel2Ref.current.value = '';
        setGu('');
        setDong('');
    }


    // console.log("searData", searData.content)

    const search = searData.content

    //페이지
    // const [page, setPage] = useState(0); //현재페이지
    const psize = searData.size //보여줄 개수
    const totalpage = searData.totalElements //전체 개수
    console.log("size, total", psize, totalpage)


    const handlePageChange = (page) => {
        setPage(page);
    }

   


    return (
        <main className='flex flex-col bg-gray-50'>
            <div className="py-10 h-screen">
                {/* <div className='flex justify-between pb-5 h-80' style={{backgroundImage: `url("https://i.ibb.co/345HV53/parking-Banner.png")`, backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: '60%'}}></div> 배너 */}
                <div className='flex h-full pb-10'>
                    <div className='flex-none w-1/5'></div>
                    {/* <div className='w-3/5 bg-white shadow-xl rounded-2xl overflow-auto' style={{backgroundImage: `url("https://i.ibb.co/v34BKSg/parkingimage2.png")`, backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: '120%'}}> */}
                    {/* <div ref={containerRef} className='w-3/5 bg-white shadow-xl rounded-2xl' style={{ height: containerHeight }}> */}
                    <div className='w-3/5 bg-white shadow-xl rounded-2xl overflow-auto'>
                        <div>
                            <div className='text-center pt-5 font-bold font-EFwatermelonSalad text-3xl'>주차장 검색하기</div>
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
                                    <input type="text" ref={parkingNm} onChange={handlePChange} className=" font-omyupretty text-lg bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-ftablel ps-10 p-2.5 " placeholder="주차장명 검색" />
                                    {/* <input type="text" ref={parkingNm} onChange={handleSearch} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-ftablel ps-10 p-2.5 " placeholder="주차장명 검색" /> */}
                                </div>
                                <button onClick={handleSearch} className="p-2.5 ms-2 text-sm font-medium text-white bg-gray-400 rounded-lg border border-gray-400 hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-gray-300 ">
                                    <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                    </svg>
                                    <span className="sr-only">Search</span>
                                </button>
                            </form>
                        </div>
                        <div className="flex pt-10">
                            <div className="flex-none w-1/6 "></div>
                            <div className="grow relative overflow-x-auto mb-20">
                                {!gu && !dong && !prkPlaceNm && !isAll && (
                                    <p className='text-center font-omyupretty text-lg pt-5'>
                                        '구' 또는 '동'을 선택해주시거나 주차장명을 검색해주세요.
                                    </p>
                                )}
                                {gu || dong || prkPlaceNm || isAll ? (
                                    searData && Array.isArray(search) && search.length > 0 ? (
                                        <table className='table-auto w-full text-center font-SUITERegular border border-gray-300'>
                                            <thead className='bg-gradient-to-tr from-sky-800 to-blue-800 text-white'>
                                            {/* <thead className='bg-gray-300'> */}
                                                <tr>
                                                    <th className='px-6 py-5'>No.</th>
                                                    <th className='px-6 py-5'>주차장명</th>
                                                    <th className='px-6 py-5'>주소</th>
                                                    <th className='px-6 py-5'>전화번호</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {searData.content.map((item) => (
                                                    <tr key={item.id} className='border-b'>
                                                        <td className='px-6 py-4 '>{item.id}</td>
                                                        <td className='px-6 py-4 hover:underline'>
                                                            <Link to={`parking/detail/${item.prkPlaceNm}`}>{item.prkPlaceNm}</Link>
                                                        </td>
                                                        <td className='px-6 py-4'>{item.address}</td>
                                                        <td className='px-6 py-4'>{item.phoneNumber}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    ) : (
                                        gu && dong && prkPlaceNm ? (
                                            <p className='text-center font-omyupretty text-lg pt-5'>
                                                검색 결과가 없습니다.
                                            </p>
                                        ) : null
                                    )
                                ) : null}
                                <div className='pt-3 pb-3'>
                                    {isAll && searData && Array.isArray(searData.content) && searData.content.length > 0 && (
                                        <Pagination activePage={page} itemsCountPerPage={psize} totalItemsCount={totalpage} pageRangeDisplayed={5} onChange={handlePageChange} />
                                    )}
                                </div>
                            </div>
                            <div className="flex-none w-1/6 "></div>
                        </div>
                    </div>
                    <div className='flex-none w-1/5'></div>
                </div>
            </div>
            <div className="py-5 h-screen mb-52">
                <div>
                    <div className='flex justify-center pt-20 text-3xl font-EFwatermelonSalad font-bold'>
                        주차장 위치보기
                    </div>
                    <div className='flex justify-center pt-10'>
                        <KakaoMap />
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Main;