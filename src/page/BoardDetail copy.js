import React from 'react';
import { Link } from 'react-router-dom';

const BoardDetail = () => {

    return (
        <main className='h-screen'>
            <div className="container mx-auto p-4">
                <div>BoardDetail</div>
                <h1 className="text-3xl font-bold mb-4">게시글 상세</h1>
                <table className="w-full border-collapse border border-gray-300">
                    <thead>
                        <tr>
                            <th className="border border-gray-300 p-2">NO</th>
                            <th className="border border-gray-300 p-2">ID</th>
                            <th className="border border-gray-300 p-2">Title</th>
                            <th className="border border-gray-300 p-2">Content</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="border border-gray-300 p-2">No</td>
                            <td className="border border-gray-300 p-2">id</td>
                            <td className="border border-gray-300 p-2">제목</td>
                            <td className="border border-gray-300 p-2">내용</td>
                        </tr>
                    </tbody>
                </table>
                <div>
                    <button type='button' className='pt-8'><Link to="/board">글 목록</Link></button>
                </div>
            </div>
        </main>
    )
}

export default BoardDetail;