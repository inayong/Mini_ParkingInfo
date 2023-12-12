import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import Comment from "./comment/Comment";

const BoardDetail = () => {

    const navigate = useNavigate();

    const { boardId } = useParams();

    const [boardDetail, setBoardDetail] = useState([]);
    const [showModal, setShowModal] = useState(false);

    //게시글 상세페이지

    const fetchBoardDetail = () => {

        fetch(`http://10.125.121.217:8080/board/detail/${boardId}`)
            .then(resp => resp.json())
            .then(data => {
                setBoardDetail(data)
                // console.log("boarddd", data)
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        fetchBoardDetail();
    }, [boardId])

    //오브젝트 값 가져오기
    useEffect(() => {
        // console.log("useEffect", boardDetail)
        // Object.entries(boardDetail).map((k, idx) => console.log(k,k[0], k[1]))

        // console.log('title', boardDetail['title'])
        // console.log('content', boardDetail['content'])

    }, [boardDetail])



    //날짜
    const dateTimeString = boardDetail['createDate'];
    const dateTime = new Date(dateTimeString);
    let datePart;
    let timePart;
    if (!isNaN(dateTime)) {
        // 날짜 부분 추출 (YYYY-MM-DD 형식)
        datePart = dateTime.toISOString().split('T')[0];

        // 시간 부분 추출 (HH:MM:SS 형식)
        timePart = dateTime.toISOString().split('T')[1].split('.')[0];

        // console.log('Date:', datePart); // 날짜 출력
        // console.log('Time:', timePart); // 시간 출력
    } else {
        console.log('Invalid date');
    }



    //수정 & 삭제 버튼
    const isLoggedIn = () => {
        const loggedInUser = localStorage.getItem('username');
        return loggedInUser === boardDetail['username'];
    };

    //삭제
    const fetchBoardDelete = () => {
        fetch(`http://10.125.121.217:8080/board/delete/${boardId}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem("token")
            },
        })
            .then((resp) => {
                if (resp.ok) {
                    // console.log("삭제 성공")
                    alert("삭제 성공");
                    setShowModal(false);
                    navigate("/board")
                } else {
                    alert("삭제 실패")
                }
            })
            .catch((err) => console.log("게시글 삭제 오류:", err))
    }

    //좋아요&싫어요 버튼
    // const getLocalStorageItem = (key) => {
    //     const storedItem = localStorage.getItem(`${key}-${boardId}`);
    //     return storedItem ? parseInt(storedItem, 10) : 0;
    // };

    // const [like, setLike] = useState(getLocalStorageItem('like'));
    // const [unLike, setUnLike] = useState(getLocalStorageItem('unLike'));

    // useEffect(() => {
    //     localStorage.setItem(`like-${boardId}`, like);
    // }, [like, boardId]);

    // useEffect(() => {
    //     localStorage.setItem(`unLike-${boardId}`, unLike);
    // }, [unLike, boardId]);

    // const handleLike = () => {
    //     setLike(like + 1);
    // };

    // const handleUnLike = () => {
    //     setUnLike(unLike + 1);
    // };

    const handleDelete = () => {
        setShowModal(true);
    }

    // const confirmDelete = () => {

    // }


    return (
        <main className='flex h-screen '>
            <div className="container mx-auto p-4 ">
                <div className="text-3xl font-bold mb-4">게시글 상세</div>
                <div className='h-full pb-40 font-SUITERegular'>
                    <div className='h-full pt-16' >
                        <div className='bg-gradient-to-tr from-blue-800 to-sky-800 p-1 rounded-lg'>
                            <div className='bg-white shadow-md rounded-lg m-1 p-1'>
                                <div className='m-3'>
                                    <div className='flex justify-between pt-2 pb-1'>
                                        <div className=' w-1/2 font-bold text-4xl '>{boardDetail['title']}</div>
                                        {isLoggedIn() && (
                                            <div className='flex items-center'>
                                                <div className='ml-auto'>
                                                    <button className='ml-2'><Link to={`/board/update/${boardId}`}>수정</Link></button>
                                                </div>
                                                <div className='ml-5 mr-3'>
                                                    <button onClick={handleDelete}>삭제</button>
                                                </div>
                                                {showModal && (
                                                    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
                                                        <div className="bg-white p-16 rounded-md">
                                                            <p className='text-2xl'>삭제하시겠습니까?</p>
                                                            <div className="flex justify-center mt-4 pt-3">
                                                                <button onClick={fetchBoardDelete} className="px-3 py-1 bg-red-500 text-white rounded-md">삭제</button>
                                                                <button onClick={() => setShowModal(false)} className="ml-4 px-3 py-1 bg-gray-300 rounded-md">취소</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                    <div className='pt-3 pb-6'>
                                        <div className='grid grid-cols-6 gap-1'>
                                            <div className='col-start-1 col-end-6 font-medium'>{boardDetail['username']}</div>
                                            <div className='col-start-1 col-span-2 text-xs text-gray-400 whitespace-pre'>{datePart}{'     '}{timePart}</div>
                                            <div className='text-xs text-gray-400'>{boardDetail['view']}</div>
                                            <div className='col-end-7 text-xs'>댓글수는 미정</div>
                                        </div>
                                    </div>
                                    <div className='pb-6'>
                                        <div className='bg-gray-50 rounded-xl h-96'>
                                            <div className='p-3'>{boardDetail['content']}</div>
                                        </div>
                                    </div>
                                    {/* <div className='flex justify-center'>
                                        <button onClick={handleLike} className='pr-5'>{like}👍</button>
                                        <button onClick={handleUnLike} className='pl-5'>👎{unLike}</button>
                                    </div> */}
                                    <div className='pt-20 pb-10'>
                                        <Comment datePart={datePart} timePart={timePart} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='flex pt-8 justify-center mb-96'>
                            <button type='button' className='text-2xl border-2 border-slate-300 hover:bg-slate-300 p-2 rounded-lg mb-52'><Link to="/board">글 목록</Link></button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default BoardDetail;