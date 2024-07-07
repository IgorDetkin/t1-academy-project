import React from 'react';
import classes from "./error.module.css"

// import { useRouteError } from "react-router-dom";

const Error: React.FC = () => {
    // const error = useRouteError();
    // console.error(error);

  return (
    <div className={classes.error}>
        <div className={classes.errorContainer}>
          <h1 className={classes.title}>404</h1>
          <p className={classes.description}>Страница не найдена!</p>
        </div>
      </div>
  )
}

export default Error;