import React from 'react';
import classes from "./searchForm.module.css";

const SearchForm: React.FC = () => {
  return (
    <form 
      className={classes.form}
      onSubmit={(e):void => e.preventDefault()}
    >
      <input 
        aria-label="input for searching products"
        type="text" 
        placeholder="Search by title"
        className={classes.input}
      />    
    </form>
  )
}

export default SearchForm