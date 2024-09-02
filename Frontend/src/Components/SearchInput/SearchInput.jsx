import React from 'react';
import './SearchInput.css';

const SearchInput = ({ value, onChange }) => {
  return (
    <input 
      type="text" 
      className='input' 
      placeholder='Name' 
      value={value} 
      onChange={onChange} 
    />
  );
};

export default SearchInput;
