import React from 'react';

const BoardDelete = ({ onClick }) => {


    const fetchBoardDelete = () => {
        // fetch(`http://10.125.121.217:8080/board/${boardId}`, {
        //     method: "DELETE",
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Authorization': localStorage.getItem("token")
        //     },
        // })
        // .then((resp) => {
        //     if (resp.ok) {
        //         console.log("삭제 성공")
        //     } else {
        //         console.log("삭제 실패")
        //     }
        // })
        // .catch((err) => console.log("게시글 삭제 오류:", err))
    }

  return (
    // <button onClick={fetchBoardDelete}>삭제</button>
    <button>삭제</button>
  )
}

export default BoardDelete;