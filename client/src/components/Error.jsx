import React from 'react';

const Error = ({ message }) => {
  let errorMessage = message || '에러가 발생했습니다.';
  return <div style={{ backgroundColor: 'red', color: 'white' }}>{errorMessage}</div>;
};

export default Error;
