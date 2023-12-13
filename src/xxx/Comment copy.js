import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import CommentForm from '../page/board/comment/CommentForm';


const Comment = ({ datePart, timePart }) => {
  const { boardId } = useParams();
  const { commentId } = useParams();

  const navigate = useNavigate();

  const [comments, setComments] = useState('');


  // const [hour, minute] = timePart.split(':');
  const [hour, minute] = timePart ? timePart.split(':') : ['', ''];


  //댓글 목록
  const listComment = () => {
    fetch(`http://10.125.121.217:8080/comment/boardComment/${boardId}`)
      .then((resp) => resp.json())
      .then((data) => setComments(data))
      .catch((err) => console.error("댓글 불러오기 오류:", err))
  }

  useEffect(() => {
    listComment();
  }, [])
  // }, [boardId]); // boardId가 변경될 때마다 댓글을 새로 불러옴

  //댓글 작성
  const addComment = (content) => {
    fetch(`http://10.125.121.217:8080/comment/create/${boardId}`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem("token")
      },
      body: JSON.stringify({
        "content": content
      })
    })
      .then((data) => {
        setComments([...comments, data])
      })
      .catch((err) => console.error("댓글 등록 실패:", err))
  }

  const idss = comments && comments.map((item) => item.id)
  console.log("id", idss)
  // console.log("name", comments['username']);

  //수정 & 삭제 버튼
  const loginUser = localStorage.getItem('username')
  // console.log("댓글id", comments['id'])

  //댓글 삭제
  const deleteComment = (id) => {
    const url = `http://10.125.121.217:8080/comment/delete/${id}`
    console.log(url)
    fetch(url, {
      method: "DELETE",
      headers: {
        // 'Content-Type': 'application/json',
        'Authorization': localStorage.getItem("token")
      }
    })
      .then((resp) => {
        if (resp.ok) {
          alert("삭제 성공");
          // navigate(`/board/detail/${boardId}`)
          // setComments(comments.filter((comment) => comment.id !== idss))
          window.location.reload();
        } else {
          alert("삭제 실패")
        }
      })
      .catch((err) => console.error("댓글 삭제 오류:", err))
  }

  console.log("댓글", comments)
  // console.log("id", com)

  //댓글 수정

  const [editComment, setEditComment] = useState({});
  const [selectedCommentId, setSelectedCommentId] = useState('');

  const startEditing = (id, content) => {
    setEditComment({
      ...editComment,
      [id]: content
    })
    setSelectedCommentId(id);
  }

  const cancelEditing = () => {
    setEditComment({});
    setSelectedCommentId('');
  }


  const updateComment = (id) => {
    fetch(`http://10.125.121.217:8080/comment/update/${id}`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem("token")
      },
      body: JSON.stringify({
        "content": editComment[id]
      })
    })
      .then((resp) => {
        if (resp.ok) {
          // setEditComment(editComment);
          alert("댓글 수정 완료")
          window.location.reload();
          cancelEditing();
        } else {
          alert("댓글 수정 실패")
        }
      })
      .catch((err) => {
        console.log("댓글 수정 중 오류:", err)
      })


  }


  return (
    <div className='font-NanumSquareNeoVariable'>
      <div className='pb-2 font-GmarketSansMedium text-lg'>댓글</div>
      <div>
        {comments && Array.isArray(comments) && comments.map((item) => (
          <div>
            <div key={item.id} className=' pt-5 px-5'>
              <div className='flex'>
                <div className='font-black p-2'>{item.username}</div>
                {loginUser === item.username && (
                  <div className='flex text-sm items-center'>
                    <div className='ml-auto'>
                      {selectedCommentId === item.id ? (
                        <div>
                          <textarea
                            value={editComment[item.id]}
                            onChange={(e) => setEditComment({
                              ...editComment,
                              [item.id]: e.target.value
                            })
                            }
                          />
                          <button onClick={() => updateComment(item.id)}>저장</button>
                          <button onClick={() => cancelEditing()}>취소</button>
                        </div>
                      ) : (
                        <button key={item.id} className='ml-10' onClick={() => startEditing(item.id, item.content)}>수정</button>
                      )}
                    </div>
                    <div className='ml-2'>
                      <button key={item.id} onClick={() => deleteComment(item.id)}>삭제</button>
                    </div>
                  </div>
                )}
              </div>
              <div className='pl-3 pt-1'>{item.content}</div>
              {/* <div>{item.createDate}</div> */}
              <div className="whitespace-pre pt-2 text-xs text-gray-500 border-b">{datePart}{'     '}{hour}:{minute}</div>
              {/* <div>
                {datePart && `${datePart} `}
                {hour && minute && <>&nbsp;&nbsp;{hour}:{minute}</>}
              </div> */}
            </div>
          </div>
        ))}
        <div className='pt-20 pl-5'>
          <CommentForm onSubmit={addComment} />
        </div>
      </div>
    </div>
  )
}

export default Comment;