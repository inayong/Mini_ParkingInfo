import React, { useEffect } from 'react';

const CommentList = ({ comments, setComments, boardId }) => {

    const fetchComments = async () => {
        try {
            const resp = await fetch(`http://10.125.121.217:8080/comment/boardComment/${boardId}`);
            const data = await resp.json();
            setComments(data);
        } catch (err) {
            console.log("댓글 불러오기 실패:", err);
        }
    }
    useEffect(() => {
        fetchComments();
    }, []);
  return (
    <div>
        <h2>댓글 목록</h2>
        <ul>
            {comments && comments.map(comment => (
                <li key={comment.id}>{comment.text}</li>
            ))}
        </ul>
    </div>
  )
}

export default CommentList;