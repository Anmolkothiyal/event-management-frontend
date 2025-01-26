import React, { useState } from 'react';
import { Input } from 'antd';
import { Search as SearchIcon } from 'lucide-react';

const Search = ({ 
  onSearch, 
  placeholder = "Search...", 
  className = "", 
  style = {},
  debounceTime = 300 
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (value) => {
    if (onSearch) {
      onSearch(value);
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    // Debounce search to reduce unnecessary calls
    const timeoutId = setTimeout(() => {
      handleSearch(value);
    }, debounceTime);

    return () => clearTimeout(timeoutId);
  };

  return (
    <div className={`universal-search-wrapper ${className}`} style={style}>
      <Input
        prefix={<SearchIcon size={20} className="text-gray-400 mr-2" />}
        placeholder={placeholder}
        value={searchTerm}
        onChange={handleChange}
        allowClear
        className="universal-search-input"
      />
    </div>
  );
};

export default Search;