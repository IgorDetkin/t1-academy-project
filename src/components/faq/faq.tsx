import React from 'react';
import classes from "./faq.module.css";
import FaqItem from '../faqItem/faqItem';
import { faqData } from '../../utils/faqdata';

const Faq: React.FC = () => {  

  return (
    <section className={classes.faq} id={"faq"}>
        <div className={classes.container}>
            <h2 className={classes.title}>FAQ</h2> 
            <div className={classes.list}>
            {faqData.map(item => 
                <FaqItem
                    key={Math.random()}
                    title={item.title}
                    description={item.description}
                    isVisibleDesc={item.isVisibleDesc}
                />
            )}
            </div>
        </div>
    </section>
  )
}

export default Faq