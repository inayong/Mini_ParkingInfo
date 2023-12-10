import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Board = () => {
    const [boardData, setBoardData] = useState([]);

    const isLoggedIn = localStorage.getItem('username');


    const getData = () => {

        fetch("http://10.125.121.217:8080/board/list")
            .then(resp => resp.json())
            .then(data => {
                setBoardData(data)
                // console.log("board",data)
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        getData();
    }, [])

    // const boardlist = boardData.map((item) => item.id)
    // console.log(boardlist)

    // const newBoard = (content) => {
    //     fetch("http://10.125.121.217:8080/board/create", {
    //         method: "post",
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Authorization': localStorage.getItem("token")
    //         },
    //         body: JSON.stringify({ 
    //             "contet": content, 
    //             "username": localStorage.getItem("username") 
    //         }),
    //     })
    //         .then((resp) => resp.json())
    //         .then((data) => {
    //             setBoardData([...boardData, data])
    //         })
    //         .catch((err) => console.log("게시글 등록 실패:", err))
    // }


    return (
        <main className='h-screen'>
            <div className='bg-gray-100'>
                <div className="container mx-auto p-4 h-full">
                        <div className="text-3xl font-bold mb-4 pt-10 pl-44 font-GmarketSansMedium">게시판</div>
                    <div className='pt-10 '>
                        <div className='flex justify-center'>
                            <table className="w-3/4 border-collapse border border-gray-300 mb-4 font-NanumSquareNeoVariable">
                                <thead className="bg-gray-300">
                                    <tr>
                                        <th className="border border-gray-100 py-7"></th>
                                        <th className="border border-gray-100">제목</th>
                                        <th className="border border-gray-100">작성자</th>
                                        <th className="border border-gray-100">작성일</th>
                                        <th className="border border-gray-100">조회수</th>
                                    </tr>
                                </thead>
                                <tbody className='text-center'>
                                    {boardData.map((item) => (
                                        <tr key={item.id} className="bg-white">
                                            <td className="border border-gray-300 w-10 h-12 text-xs">{item.id}</td>
                                            <td className="border border-gray-300"><Link to={`detail/${item.id}`}>{item.title}</Link></td>
                                            <td className="border border-gray-300 w-36">{item.username}</td>
                                            <td className="border border-gray-300 w-36">{new Date(item.createDate).toISOString().split('T')[0]}</td>
                                            <td className="border border-gray-300 w-12 px-3">{item.view}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className='flex justify-center items-center pt-10 mb-32'>
                            {isLoggedIn ? (
                                <button type='button' className='bg-[#1e40afcb] px-7 pt-3 pb-2 text-white rounded-md font-GmarketSansMedium '><Link to="/board/insert">글 작성</Link></button>
                            ) : (
                                <p>로그인 후 글을 작성할 수 있습니다.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Board;