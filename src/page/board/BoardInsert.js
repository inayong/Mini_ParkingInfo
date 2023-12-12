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
                // console.log("board",data)
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
                window.location.reload();
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
        alert("작성 완료")
        navigate("/board")
    }
    
    const handleCancel = () => {
        navigate("/board")
    }

    return (
        <main className='h-screen bg-gray-100'>
            <div className="flex justify-center items-center h-full">
                <div className="flex-none w-32"></div>
                <div className="grow flex justify-center items-center h-3/4">
                    <form onSubmit={handleBoardSubmit} className="bg-white p-4 rounded-md w-3/5 h-full relative shadow-md shadow-blue-600/50">
                        <div className="text-xl font-semibold pb-5 font-GmarketSansMedium">새 글 작성하기</div>
                        <div className="mb-4 font-NanumSquareNeoVariable">
                            <label htmlFor="title" className="block text-sm font-semibold text-gray-600 mb-1">제목</label>
                            <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" id="title" name="title" className="w-full border-gray-300 rounded-md px-3 py-2" placeholder="제목을 입력하세요" />
                        </div>
                        <div className="mb-4 font-NanumSquareNeoVariable">
                            <label htmlFor="content" className="block text-sm font-semibold text-gray-600 mb-1">내용</label>
                            <textarea value={content} onChange={(e) => setContent(e.target.value)} id="content" name="content" className="w-full border-gray-300 rounded-md px-3 py-2 resize-none h-96" rows="4" placeholder="내용을 입력하세요"></textarea>
                        </div>
                        <div className="flex justify-center mb-4">
                            <button onClick={handleCancel} type="button" className="bg-gray-300 text-gray-700 px-4 pt-2 pb-1 rounded-md hover:bg-gray-400 font-GmarketSansMedium mr-4">돌아가기</button>
                            <button type="submit" className="bg-blue-500 text-white px-4 pt-2 pb-1 rounded-md hover:bg-blue-600 font-GmarketSansMedium">작성하기</button>
                        </div>
                    </form>
                </div>
                <div className="flex-none w-32"></div>
            </div>
        </main>




    )
}

export default BoardInsert;