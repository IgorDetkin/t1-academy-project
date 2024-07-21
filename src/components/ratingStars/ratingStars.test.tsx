import { render, screen} from '@testing-library/react';
import React from 'react';
import RatingStars from './ratingStars';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';

describe('ratingStars component', () => {
    it('проверка, что звёзд пять', () => {
        render(
          <RatingStars 
            rating={5} 
            starsLength={5}            
          />
        );

        const stars = screen.getAllByTestId('rating-star');
        expect(stars).toHaveLength(5);
        
    });

    it('проверка округления', () => {
        const testRating = 3.4;
        const ratingRound = testRating && Math.round(testRating) || 0; 
        expect(ratingRound).toBe(3);
    });
})