import React, { useState } from 'react';

const CommentForm = ({ onSubmit }) => {
    const [text, setText] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(text);
        setText('');
    };

  return (
    <form onSubmit={handleSubmit}>
        <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder='댓글을 입력하세요' />
        <button type='submit'>확인</button>
    </form>
  )
}

export default CommentForm;