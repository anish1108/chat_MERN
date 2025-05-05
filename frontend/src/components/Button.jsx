import React from 'react';

function Button({ name, onclick, type }) {
  return (
    <div>
      <button
        className="border-2 border-solid border-gray-400 w-20 h-12 bg-gray-600 text-white rounded-md text-sm font-medium hover:bg-gray-700 hover:shadow-lg transition-all duration-200"
        type={type}
        onClick={onclick}
      >
        {name}
      </button>
    </div>
  );
}

export default Button;