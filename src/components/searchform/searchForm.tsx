import React, { useEffect, useState } from 'react';
import classes from "./searchForm.module.css";


interface SearchInputProps {
  setSearchReq: (searchReq: string) => void;
  delay?: number;
}

const SearchForm: React.FC<SearchInputProps> = ({ setSearchReq, delay = 700 }) => {

  const [value, setValue] = useState<string>('');


  useEffect(() => {
      const handler = setTimeout(() => {
        setSearchReq(value);
      }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay, setSearchReq]);


  return (
    <form 
      className={classes.form}
      onSubmit={(e):void => e.preventDefault()}
    >
      <input 
        aria-label="input for searching products"
        type="text" 
        placeholder="Search by title"
        value={value}
        className={classes.input}
        onChange={(e) => setValue(e.target.value)}
      />    
    </form>
  )
}

export default SearchForm