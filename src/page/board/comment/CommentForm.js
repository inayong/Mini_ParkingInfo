import React, { useState } from 'react';

const CommentForm = ({ onSubmit }) => {
  const [content, setContent] = useState('');
  const [showModal, setShowModal] = useState(false);

  const isLoggedIn = localStorage.getItem('username');

  const handleChange = (e) => {
    if (!isLoggedIn) {
      setShowModal(true);
      return;
    }
    setContent(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isLoggedIn) {
      setShowModal(true);
      return;
    }
    onSubmit(content);
    setContent('');
    window.location.reload();
  };

  return (
    <div>
      {showModal && (
        <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-md shadow-md w-80 h-40 flex flex-col justify-between items-center">
            <p className="text-lg mb-4">로그인 후 이용해주세요.</p>
            <button onClick={() => setShowModal(false)} className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded-md">닫기</button>
          </div>
        </div>
      )}
      <form onSubmit={handleSubmit} className='flex items-center'>
        <textarea
          value={content}
          onChange={handleChange}
          placeholder='댓글을 입력하세요'
          className='resize-none w-4/5 outline-none border-b-2 mr-8'
        />
        <button type='submit' className='p-2 bg-slate-50 rounded-xl hover:bg-slate-300'>확인</button>
      </form>
    </div>
  )
}

export default CommentForm;
