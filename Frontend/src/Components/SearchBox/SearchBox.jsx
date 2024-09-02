import React, { useState } from 'react';
import './SearchBox.css';
import Button from '../Button/Button';
import SearchInput from '../SearchInput/SearchInput';

const SearchBox = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchClick = () => {
    onSearch(searchTerm);
  };

  return (
    <div className="search-box">
      <SearchInput value={searchTerm} onChange={handleInputChange} />
      <Button onClick={handleSearchClick} />
    </div>
  );
};

export default SearchBox;
