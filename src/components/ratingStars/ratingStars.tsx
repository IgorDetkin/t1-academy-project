import React from 'react';
import classes from "./ratingStars.module.css";
import RatingStar from '../ratingStar/ratingStar';

export interface StarsItem {
  rating?: number | null;
  starsLength?: number;
}

const RatingStars: React.FC<StarsItem> = ({ rating, starsLength = 5 }) => {

  const ratingRound = rating && Math.round(rating) || 0; 

  return (
    <div className={classes.stars}>
      {Array.from({ length: starsLength }, (_, index) => 
      <RatingStar
        key={index}
        color={index < ratingRound ? 'filledFull' : 'empty'}
      /> 
      )}

      
    </div>
  )
}

export default RatingStars;
