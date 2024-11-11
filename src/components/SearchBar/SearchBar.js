import React, { useState } from 'react';
import './SearchBar.css';

function SearchBar({ onSearch }) {
  const [input, setInput] = useState('');

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSearch = () => {
    if (input.trim()) {
      onSearch(input);
      setInput('');
    }
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Enter city name"
        value={input}
        onChange={handleInputChange}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}

export default SearchBar;
