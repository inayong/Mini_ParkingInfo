import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const BoardDetail = () => {
    const [boardDetail, setBoardDetail] = useState([]);

    const getData = () => {

        fetch("http://10.125.121.217:8080/board/list")
            .then(resp => resp.json())
            .then(data => {
                setBoardDetail(data)
                // console.log("board",data)
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        getData();
    }, [])

    return (
        <main className='h-screen'>
            <div className="container mx-auto p-4 h-screen">
                <div>BoardDetail</div>
                <h1 className="text-3xl font-bold mb-4">게시글 상세</h1>
                {/* {boardDetail.map((item) => ( */}
                    <div>
                        <div className='border border-gray-400'>
                            <div className='pb-1'>
                                <div className='bg-slate-50 shadow-lg w-1/2 font-medium text-4xl'>제목</div>
                            </div>
                            <div className='pb-6'>
                                <div className='grid grid-cols-6 gap-1 bg-slate-100'>
                                    <div className='col-start-1 col-end-6 font-medium'>아이디</div>
                                    <div className='col-start-1 col-span-2 text-xs text-gray-400'>등록시간</div>
                                    <div className='text-xs text-gray-400'>조회수</div>
                                    <div className='col-end-7 text-xs'>댓글수는 미정</div>
                                </div>
                            </div>
                            <div className='pb-6'>
                                <div className='bg-slate-200'>
                                    <div>글내용</div>
                                </div>
                            </div>
                            <div className='pb-10'>
                                <div className='bg-slate-300'>
                                    <div>댓글</div>
                                </div>
                            </div>
                        </div>
                        <div className='pt-8'>
                            <button type='button' className='border border-slate-400'><Link to="/board">글 목록</Link></button>
                        </div>

                    </div>
                {/* ))} */}
            </div>
        </main>
    )
}

export default BoardDetail;