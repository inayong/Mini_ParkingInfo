import React from 'react';

const BoardInsert = () => {
    return (
        <main className='h-screen bg-gray-100'>
            <div className="p-4">
                <div>BoardInsert</div>
                <div className="max-w-xl mx-auto">
                    <h1 className="text-3xl font-bold mb-4">게시판</h1>
                    <div className="space-y-4">
                        {/* 새 게시물 작성 폼 */}
                        <form className="bg-white p-4 shadow rounded-md">
                            <h2 className="text-xl font-semibold mb-2">새 글 작성하기</h2>
                            <div className="mb-4">
                                <label htmlFor="title" className="block text-sm font-semibold text-gray-600 mb-1">제목</label>
                                <input type="text" id="title" name="title" className="w-full border-gray-300 rounded-md px-3 py-2" placeholder="제목을 입력하세요" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="content" className="block text-sm font-semibold text-gray-600 mb-1">내용</label>
                                <textarea id="content" name="content" className="w-full border-gray-300 rounded-md px-3 py-2" rows="4" placeholder="내용을 입력하세요"></textarea>
                            </div>
                            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">작성하기</button>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default BoardInsert;