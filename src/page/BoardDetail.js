import React from 'react';
import { Link } from 'react-router-dom';

const BoardDetail = () => {

    return (
        <main className='h-screen'>
            <div className="container mx-auto p-4">
                <div>BoardDetail</div>
                <h1 className="text-3xl font-bold mb-4">게시글 상세</h1>
                <table className="w-full border-collapse border border-gray-300">
                        <tr>
                            <td className="border border-gray-300 p-2">ID</td>
                        </tr>
                        <tr>
                            <td className="border border-gray-300 p-2">Title</td>
                        </tr>
                        <tr>
                            <td className="border border-gray-300 p-2">Content</td>
                        </tr>
                        <tr>
                            <td className="border border-gray-300 p-2">id</td>
                        </tr>
                        <tr>
                            <td className="border border-gray-300 p-2">제목</td>
                        </tr>
                        <tr>
                            <td className="border border-gray-300 p-2">내용</td>
                        </tr>
                </table>
                <div>
                    <button type='button'><Link to="/board">글 목록</Link></button>
                </div>
            </div>
        </main>
    )
}

export default BoardDetail;