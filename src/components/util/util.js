import React, { useEffect } from "react";

// toggle visibility of input areas
const visibilityToggle = (boolean, elementId) => {
    console.log(`bool ${boolean}\nelemID: ${elementId}`)
    const element = document.getElementById(elementId);

    if (element) {
        if (boolean === 'True') {
            element.style.display = 'block';
        } else {
            element.style.display = 'none';
        }
    } else {
        console.warn(`Element with id '${elementId}' not found.`);
}
}

const SetContentEditable = ({ parentRef }) => {
    useEffect(() => {
      if (parentRef.current) {
        const children = parentRef.current.querySelectorAll('*');
        children.forEach(child => {
          child.setAttribute('contentEditable', 'true');
        });
      }
    }, [parentRef]);
  
    return null;
  };

export {visibilityToggle, SetContentEditable}