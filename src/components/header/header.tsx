import React from 'react';
import classes from "./header.module.css";
import logo from "../../assets/Logo.svg";
import Navigation from '../navigation/navigation';
import { HashLink } from 'react-router-hash-link';


const Header = () => {
  return (
    // <div className={classes.wrapper}>
      <header className={classes.header} id={"main"}> 
        <HashLink smooth to="/" className={classes.link}>
          <img src={logo} alt="лого" className={classes.logo}/>
        </HashLink>
        <Navigation/>
      </header>
    // </div>
  )
}

export default Header;