import React from 'react';
import classes from "./error.module.css"

const Error: React.FC = () => {
  
  return (
    <div className={classes.error}>
        <div className={classes.errorContainer}>
          <h1 className={classes.title}>404</h1>
          <p className={classes.description}>Page not found!</p>
        </div>
      </div>
  )
}

export default Error;