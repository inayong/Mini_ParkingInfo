import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import CommentForm from './CommentForm';

const Comment = ({ datePart, timePart }) => {
  const { boardId } = useParams();

  const navigate = useNavigate();

  const [comments, setComments] = useState('');
  const [editComment, setEditComment] = useState(null);

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

  // const name = comments.map((item) => item.username)
  // console.log(name)
  // console.log("name", comments['username']);

  //수정 & 삭제 버튼
  const loginUser = localStorage.getItem('username')

  //댓글 삭제
  //12.09 삭제 404 에러
  const deleteComment = () => {
    fetch(`http://10.125.121.217:8080/comment/delete/${boardId}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem("token")
      }
    })
      .then((resp) => {
        if (resp.ok) {
          alert("삭제 성공");
          // navigate(`/board/detail/${boardId}`)
          window.location.reload();
        } else {
          alert("삭제 실패")
        }
      })
      .catch((err) => console.error("댓글 삭제 오류:", err))
  }

  console.log("댓글", comments)

  //댓글 수정
  //12.09 댓글들의 id가 전부 동일 댓글을 특정지을만한 요소가 없음
  const updateComment = () => {
    fetch(`http://10.125.121.217:8080/comment/update/${boardId}`)
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
                      <button className='ml-10'>수정</button>
                    </div>
                    <div className='ml-2'>
                      <button onClick={deleteComment}>삭제</button>
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