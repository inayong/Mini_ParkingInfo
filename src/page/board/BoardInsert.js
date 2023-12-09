import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const BoardInsert = () => {

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [boardData, setBoardData] = useState([]);

    const navigate = useNavigate();

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

    const newBoard = () => {
        // console.log("title", title)
        fetch("http://10.125.121.217:8080/board/create", {
            method: "post",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem("token")
            },
            body: JSON.stringify({ 
                "title": title,
                "content": content, 
                // "username": localStorage.getItem("username") 
            }),
        })
            // .then((resp) => resp.json())  //type error
            .then((data) => {
                setBoardData([...boardData, data])
                // const newPostId = data.id;
                // console.log("newid", newPostId)
                // console.log("boardData, data", [...boardData, data])
                // navigate(`/board/detail/${newPostId}`)
                // navigate("/board")
            })
            .catch((err) => console.error("게시글 등록 실패:", err))
    }
    // useEffect(() => {
    //     newBoard
    // }, [])

    const handleBoardSubmit = (e) => {
        // e.preventDefault();
        newBoard();
        setTitle('');
        setContent('');
        navigate("/board")
    }

    return (
        <main className='h-screen bg-gray-100'>
            <div className="p-4">
                <div>BoardInsert</div>
                <div className="max-w-xl mx-auto">
                    <h1 className="text-3xl font-bold mb-4">게시판</h1>
                    <div className="space-y-4">
                        <form onSubmit={handleBoardSubmit} className="bg-white p-4 shadow rounded-md">
                            <h2 className="text-xl font-semibold mb-2">새 글 작성하기</h2>
                            <div className="mb-4">
                                <label htmlFor="title" className="block text-sm font-semibold text-gray-600 mb-1">제목</label>
                                <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" id="title" name="title" className="w-full border-gray-300 rounded-md px-3 py-2" placeholder="제목을 입력하세요" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="content" className="block text-sm font-semibold text-gray-600 mb-1">내용</label>
                                <textarea value={content} onChange={(e) => setContent(e.target.value)} id="content" name="content" className="w-full border-gray-300 rounded-md px-3 py-2" rows="4" placeholder="내용을 입력하세요"></textarea>
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