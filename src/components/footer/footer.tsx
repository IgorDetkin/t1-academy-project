import React from 'react';
import logo from "../../assets/Logo.svg";
import classes from "./footer.module.css";
import { HashLink } from 'react-router-hash-link';
import { RootState } from '../../store/store';
import { useSelector } from 'react-redux';

const Footer: React.FC = () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  return (

    isAuthenticated &&
    
    <footer className={classes.footer}>
      <HashLink smooth to="/#main" className={classes.link}>
          <img src={logo} alt="лого" className={classes.logo}/>
      </HashLink>
      <nav className={classes.menu}>
        <HashLink smooth to="/#catalog" className={classes.link}>Catalog</HashLink>
        <HashLink smooth to="/#faq" className={classes.link}>FAQ</HashLink>
      </nav>
    </footer>
  )
}

export default Footer