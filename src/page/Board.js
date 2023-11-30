import React from 'react';
import { Link } from 'react-router-dom';

const Board = () => {


    return (
        <main className='h-screen bg-gray-100'>
            <div className='h-screen'>
                <div className="container mx-auto p-4">
                    <h1 className="text-3xl font-bold mb-4">게시판</h1>
                    <table className="w-full border-collapse border border-gray-300 mb-4">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="border border-gray-300 p-2">ID</th>
                                <th className="border border-gray-300 p-2">Title</th>
                                <th className="border border-gray-300 p-2">Content</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="bg-gray-100">
                                <td className="border border-gray-300 p-2">1</td>
                                <td className="border border-gray-300 p-2"><Link to="/board/detail">첫 번째 포스트</Link></td>
                                <td className="border border-gray-300 p-2">안녕하세요! 첫 번째 포스트입니다.</td>
                            </tr>
                            <tr className="bg-white">
                                <td className="border border-gray-300 p-2">2</td>
                                <td className="border border-gray-300 p-2">두 번째 포스트</td>
                                <td className="border border-gray-300 p-2">리액트로 게시판을 만들고 있어요!</td>
                            </tr>
                        </tbody>
                    </table>
                    <div className='flex justify-center items-center'>
                        <button type='button' className='bg-gray-400 px-10 py-3 rounded-md'><Link to="/board/boardinsert">글 작성</Link></button>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Board;