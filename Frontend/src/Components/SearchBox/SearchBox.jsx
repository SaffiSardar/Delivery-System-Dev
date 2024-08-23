import React from 'react'
import './SearchBox.css'
import Button from '../Button/Button'
import SearchInput from '../SearchInput/SearchInput'

const SearchBox = () => {
  return (
        <div className="searchbox">
            <SearchInput/>
            <Button/>
      </div>
  )
}

export default SearchBox