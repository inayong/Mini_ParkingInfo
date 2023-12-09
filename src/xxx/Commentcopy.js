import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CommentForm from '../page/board/comment/CommentForm';

const Comment = () => {
    const { boardId } = useParams();

    const [comments, setComments] = useState('');
    const [editComment, setEditComment] = useState(null);

    //댓글 불러오기
    const commentFetch = () => {
        const url = `http://10.125.121.217:8080/comment/boardComment/${boardId}`;
        // console.log(url)
        fetch(url)
            .then(resp => resp.json())
            .then(data => setComments(data))
            .catch(err => console.log("err", err))
    }

    useEffect(() => {
        commentFetch();
    }, [])

    //댓글 입력
    const addComment = (content) => {
        fetch(`http://10.125.121.217:8080/comment/create/${boardId}`, {
            method: "post",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem("token")
            },
            body: JSON.stringify({
                "content": content
                // "username": localStorage.getItem("username")
            }),
        })
            .then((data) => {
                setComments([...comments, data])
                // commentFetch();
            })
            .catch((err) => console.log("댓글 등록 실패:", err))
    }

    //댓글 수정
    const updateComment = () => {
        fetch(`http://10.125.121.217:8080/comment/update/${boardId}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem("token")
            },
            body: JSON.stringify({
                "content": newContent
            })
        })
    }


    return (
        <div>
            <div className='text-lg'>댓글목록
                {comments && Array.isArray(comments) && comments.map((item) => (
                    <div key={item.id} className='bg-slate-300'>
                        <div>
                            <div>작성자: {item.username}</div>
                            <div>내용: {item.content}</div>
                            <div>작성일: {item.createDate}</div>
                        </div>
                    </div>
                ))}
                <CommentForm onSubmit={addComment} />
            </div>
        </div>
    )
}

export default Comment;