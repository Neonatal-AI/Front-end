import React, { useState } from 'react';

const DropdownMenu = ({ label, options }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(!isOpen); // Close the dropdown after selecting an option
  };

  return (
    <span className="dropdown" onClick={toggleDropdown}>
      <span className="dropdown-header" >
        {selectedOption || 'Select'}
      </span>
      {isOpen && (
        <div className="dropdown-options">
          {options.map((option, index) => (
            <div
              key={index}
              className="dropdown-option"
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </span>
  );
};

export default DropdownMenu;