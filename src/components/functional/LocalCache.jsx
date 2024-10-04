import {  useState } from 'react';

const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStored] = useState(() => {
    try {
      let item = window.localStorage.getItem(key)
      return item
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    if (!value){
        setStored("blank")
    }
    try {
      window.localStorage.setItem(key, value);
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue];
};

export {useLocalStorage}
