import React from 'react';

const SearchBar = ({ value, onChange }) => {
  return (
    <input
      type="text"
      placeholder="Search courses..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{
        padding: '10px',
        width: '300px',
        fontSize: '16px',
        borderRadius: '6px',
        border: '1px solid #ccc',
        marginBottom: '20px'
      }}
    />
  );
};

export default SearchBar;
