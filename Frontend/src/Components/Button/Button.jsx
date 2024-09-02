import React from 'react';
import './Button.css';

const Button = ({ onClick }) => {
  return (
    <button className='panel' onClick={onClick}>
      Search
    </button>
  );
};

export default Button;
