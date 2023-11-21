import React from 'react'
import { GoSearch } from "react-icons/go";
import { Link } from 'react-router-dom';
import KakaoMap from '../ui/KakaoMap';



const Main = () => {
    return (
        // <body>
        <main className='grow flex flex-col bg-slate-500'>
            <section className="bg-gray-50 py-10 h-1/2">
                <div className='flex justify-between pb-5'>
                    <div className='flex items-center'>
                        <h3 className='font-bold text-2xl'>주차장 정보</h3>
                    </div>
                </div>
                <div className='flex justify-center items-center'>
                    <div className='w-6 h-6 px-6'>
                        <select>
                            <option>전체</option>
                        </select>
                    </div>
                    <div className='px-20'>
                        <input type='text' placeholder='주차장명 검색'/>
                        <button type='button'><Link to='/parkinginfo'><GoSearch/></Link></button>
                    </div>
                </div>
            </section>
            <section  className="bg-gray-300 py-5 h-1/2">
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
        // </body>
    )
}

export default Main;