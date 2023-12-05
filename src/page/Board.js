import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Board = () => {
    const [boardData, setBoardData] = useState([]);

    const getData = () => {

        fetch("http://10.125.121.217:8080/board/list")
            .then(resp => resp.json())
            .then(data => {
                setBoardData(data)
                console.log("board",data)
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        getData();
    }, [])

    // const boardlist = boardData.map((item) => item.id)
    // console.log(boardlist)
    


    return (
        <main className='h-screen bg-gray-100'>
            <div className='h-screen'>
                <div className="container mx-auto p-4">
                    <h1 className="text-3xl font-bold mb-4">게시판</h1>
                    <table className="w-full border-collapse border border-gray-300 mb-4">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="border border-gray-300 p-2"></th>
                                <th className="border border-gray-300 p-2">제목</th>
                                <th className="border border-gray-300 p-2">작성자</th>
                                <th className="border border-gray-300 p-2">작성일</th>
                                <th className="border border-gray-300 p-2">조회수</th>
                            </tr>
                        </thead>
                        <tbody className='text-center'>
                            {boardData.map((item) => (
                            <tr key={item.id} className="bg-white">
                                <td className="border border-gray-300 p-2">{item.id}</td>
                                <td className="border border-gray-300 p-2"><Link to={`detail/${item.id}`}>{item.title}</Link></td>
                                <td className="border border-gray-300 p-2">{item.username}</td>
                                <td className="border border-gray-300 p-2">{new Date(item.createDate).toISOString().split('T')[0]}</td>
                                <td className="border border-gray-300 p-2">{item.view}</td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className='flex justify-center items-center'>
                        <button type='button' className='bg-gray-400 px-10 py-3 rounded-md'><Link to="/board/insert">글 작성</Link></button>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Board;