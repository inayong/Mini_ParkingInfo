import React, { useState } from 'react';

const CommentForm = ({ onSubmit }) => {
    const [content, setContent] = useState('');

    const handleSubmit = (e) => {
        // e.preventDefault();
        onSubmit(content);
        setContent('');
    };

  return (
    <form onSubmit={handleSubmit}>
        <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder='댓글을 입력하세요' />
        <button type='submit'>확인</button>
    </form>
  )
}

export default CommentForm;