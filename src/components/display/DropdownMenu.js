import React, { useState } from 'react';

const DropdownMenu = ({ label, options, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

const handleOptionClick = (e, option) => {
  if (typeof onSelect === 'function') {
    onSelect(option);
  } else if (Array.isArray(onSelect)) {
    onSelect.forEach(func => {
      func(option);
    });
  }
    setSelectedOption(option);
    setIsOpen(!isOpen); // Close the dropdown after selecting an option
  };

  return (
    <div className="dropdown" onClick={toggleDropdown} role="button" tabIndex="0" aria-haspopup="true" aria-expanded={isOpen}>
      <span className="dropdown-header" >
        {selectedOption || label || 'Select'}
      </span>
      {isOpen && (
        <div className="dropdown-options">
          {options.map((option, index) => (
            <div
              key={index}
              className="dropdown-option"
              onClick={(e) => handleOptionClick(e, option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;