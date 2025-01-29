import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';

const GradientButton = ({
  type,
  text,
  loading,
  onClick
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
    >
      {loading ? (
        <span className="flex items-center">
          <FontAwesomeIcon icon={faCircleNotch} spin />
          <span className="ml-2">Loading...</span>
        </span>
      ) : (
        <span style={{color: "white"}}>{text}</span>
      )}
    </button>
  );
};

export default GradientButton;
