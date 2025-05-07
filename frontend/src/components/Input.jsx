import React from 'react';

function Input({ placeholder, onChange, value }) {
  return (
    <span className="border-2 border-gray-300 rounded-lg w-full h-12 flex items-center px-3 shadow-md focus-within:border-gray-500 focus-within:shadow-lg transition-all duration-200">
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className="w-full h-full outline-none text-white placeholder-gray-300 bg-transparent"
      />
    </span>
  );
}

export default Input;