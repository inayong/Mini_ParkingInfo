import React from 'react'
import { GoChevronRight, GoSearch } from "react-icons/go";


const MainPage = () => {
    return (
        // <body>
        <main className='grow flex flex-col'>
            <section className="bg-gray-50 py-10">
                <div className='flex pb-5'>
                    <div className='flex'>
                        <h3 className='font-bold text-2xl'>주차장 정보</h3>
                    </div>
                    <div>
                        <select>
                            <option>전체</option>
                        </select>
                    </div>
                    <div>
                        <input type='text' placeholder='주차장명 검색' />
                        <button type='button'><GoSearch/></button>
                    </div>
                </div>
                <div className='flex flex-col p-5 max-w-sm bg-white rounded-xl pt-0'>
                    <div className='flex align-middle justify-between h-16 px-0 py-5 text-2xl border-b-2'> {/*head*/}
                        <div className='font-semibold'>
                            명륜역
                        </div>
                        <button className='hover:bg-gray-100'><GoChevronRight /></button>
                    </div>
                    <div className='py-5 h-16 justify-between'>
                        <div className='text-xl pt-0 pb-3'>주차장 위치</div>
                        <div className='border-b-2 pb-2'>부산광역시</div>
                    </div>
                </div>
            </section>
            <section className='bg-gray-500 '>
                <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
                    <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
                        222
                    </div>
                </div>
            </section>
        </main>
        // </body>
    )
}

export default MainPage;