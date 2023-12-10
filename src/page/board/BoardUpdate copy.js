import React, { useEffect, useState } from 'react';
import { Link, Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';

const BoardUpdate = () => {
    const { boardId } = useParams();
    // const location = useLocation();
    // const datePart = location.state && location.state.datePart;
    // const timePart = location.state && location.state.timePart;

    const navigate = useNavigate();

    const [post, setPost] = useState(null);
    const [title, setTitle] = useState('');
    const [boardContent, setBoardContent] = useState('');
    // const [isEditing, setIsEditing] = useState(false);
    const [currentUsername, setCurrentUsername] = useState('');


    useEffect(() => {
        // boardId 이용해 기존 게시글 데이터 가져오기
        const fetchBoard = async () => {
            try {
                const boardResp = await fetch(`http://10.125.121.217:8080/board/detail/${boardId}`);
                if (boardResp.ok) {
                    const userFromLS = localStorage.getItem('username');
                    const boardData = await boardResp.json();

                    setPost(boardData);
                    setCurrentUsername(userFromLS);
                    setTitle(boardData.title);
                    setBoardContent(boardData.content);
                    // console.log(boardData);
                } else {
                    console.log('게시글 가져오기 실패');
                }
            } catch (err) {
                console.log('게시글 가져오기 중 오류 발생:', err);
            }
        };
        fetchBoard();
    }, [boardId]);

    console.log("post", post)


    const dateTimeString = post && post['createDate']; //객체
    const dateTime = new Date(dateTimeString);
    let datePart;
    let timePart;
    if (!isNaN(dateTime)) {
        datePart = dateTime.toISOString().split('T')[0];
        timePart = dateTime.toISOString().split('T')[1].split('.')[0];
    } else {
        console.log('Invalid date');
    }

    // const isLoggedIn = () => {
    //     const loggedInUser = localStorage.getItem('username');
    //     return loggedInUser === post['username'];
    // };

    const postUsername = post && post['username']
    // console.log("postUsername", postUsername)
    // console.log("currentUsername", localStorage.getItem('username'))

    // useEffect(() => {
    //     if (currentUsername !== postUsername) {
    //         navigate("/board");
    //     }
    // }, [currentUsername, navigate, postUsername]);

    //일단 버튼으로 작동하게함
    const fetchBoardUpdate = () => {
        if (currentUsername !== postUsername) {
            alert("로그인 정보가 맞지 않습니다.");
            navigate("/board");
            // } else if (currentUsername == postUsername) {
        } else {
            // if (isLoggedIn()) {
            fetch(`http://10.125.121.217:8080/board/update/${boardId}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem("token")
                },
                body: JSON.stringify({
                    "title": title,
                    "content": boardContent
                })
            })
                .then((resp) => {
                    if (resp.ok) {
                        setTitle(title);
                        setBoardContent(boardContent);
                        // setIsEditing(false);
                        console.log("username", postUsername)
                        alert("게시글 수정 완료")
                        navigate(`/board/detail/${boardId}`)
                    } else {
                        alert("게시글 수정 실패")
                    }
                })
                .catch((err) => {
                    console.log("게시글 수정 중 오류:", err)
                })
        }
        // else {
        //     alert("로그인 정보가 맞지 않습니다.")
        //     navigate("/board");
        // }
    }


    return (
        <main className='flex h-screen'>
            <div className="container mx-auto p-4 h-screen">
                <div className='h-full pb-40 font-SUITERegular'>
                    <div className='h-full pt-16' >
                        <div className='border-4 border-gray-100 shadow-md rounded-lg m-10 px-3'>
                            <div className='bg-white shadow-md rounded-lg m-1 p-1'>
                                <div className='m-3'>
                                    <div className='flex justify-between pt-2 pb-1'>
                                        <div className=' w-1/2 font-bold text-4xl '>
                                            <input
                                                type="text"
                                                className='outline-none'
                                                value={title}
                                                onChange={(e) => setTitle(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className='pt-3 pb-6'>
                                        {post && (
                                            <div className='grid grid-cols-6 gap-1'>
                                                <div className='col-start-1 col-end-6 font-medium'>{post['username']}</div>
                                                <div className='col-start-1 col-span-2 text-xs text-gray-400'>{datePart} | {timePart}</div>
                                                <div className='text-xs text-gray-400'>{post['view']}</div>
                                                <div className='col-end-7 text-xs'>댓글수는 미정</div>
                                            </div>
                                        )}
                                    </div>
                                    <div className='pb-6'>
                                        <div className='bg-gray-50 rounded-xl h-96'>
                                            <textarea
                                                className='p-3 bg-gray-50 resize-none h-96 w-full outline-none'
                                                value={boardContent}
                                                onChange={(e) => setBoardContent(e.target.value)}
                                            ></textarea>
                                        </div>
                                    </div>
                                    <div className='flex justify-center'>
                                        <button onClick={fetchBoardUpdate} className='bg-slate-300 m-3 p-2 rounded-xl'>수정하기</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default BoardUpdate;