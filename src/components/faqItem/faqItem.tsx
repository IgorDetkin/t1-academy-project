import React, { useState } from 'react';
import classes from "./faqItem.module.css";
import { faqProps } from '../../types/faq';

const FaqItem: React.FC<faqProps> = ({title, description, isVisibleDesc }) => {

    const [isVisible, setIsVisible] = useState<boolean>(isVisibleDesc);

    const changeVisibleDesc = () => {
      setIsVisible(!isVisible);
    };

  return (
    <article className={classes.item} onClick={changeVisibleDesc}>
    <div className={classes.titleAndButton}>
        <h3 className={classes.itemTitle}>{title}</h3>
        <button 
            className={`${classes.button} ${isVisible ? classes.buttonActive : ''}`} 
            // onClick={changeVisibleDesc}
            aria-label='open or close description'
        >
            <svg aria-hidden="true" width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.9509 12.387H25V13.637H12.9509V25.5002H11.5731V13.637H0V12.387H11.5731V0.500244H12.9509V12.387Z" fill="white"/>
            </svg>
        </button> 
    </div>
    <p className={`${classes.description} ${isVisible ? classes.visible : ''}`}>
        {description}
    </p>
</article>
  )
}

export default FaqItem