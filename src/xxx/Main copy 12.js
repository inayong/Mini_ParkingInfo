import React, { useEffect, useRef, useState } from 'react'
import { GoSearch } from "react-icons/go";
import { Link, json } from 'react-router-dom';
import KakaoMap from '../ui/KakaoMap';
import { getValue } from '@testing-library/user-event/dist/utils';
import Pagination from 'react-js-pagination';

const pageSize = 10;

const Main = () => {
    const [parkData, setParkData] = useState([]);
    const selRef = useRef();
    const sel2Ref = useRef();
    const [selGu, setSelGu] = useState([]);
    const [selDong, setSelDong] = useState([]);
    const [searInfo, setSearInfo] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);


    //fetch
    const getData = () => {

        fetch("http://10.125.121.217:8080/parking/paging?size=10")
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

   


    return (
        <main className='flex flex-col bg-slate-500'>
            <section className=" bg-gray-50 py-10 h-screen">
                <div className='flex justify-between pb-5'>
                    <div className='flex items-center'>
                        <h3 className='font-bold text-2xl'>주차장 정보</h3>
                    </div>
                </div>
                
            </section>
        </main>
    )
}

export default Main;