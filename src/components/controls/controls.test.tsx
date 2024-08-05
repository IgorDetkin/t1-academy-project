import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import Controls from './controls';
import { describe, it, expect,  } from 'vitest';
import '@testing-library/jest-dom';

describe('Controls component', () => {
    const mockAddCount = () => {};
    const mockRemoveCount = () => {};

    it('если количество товаров в корзине равно одному', () => {
        render(
          <Controls 
            countInBasket={1} 
            addCount={mockAddCount} 
            removeCount={mockRemoveCount} 
            size="big" 
            sizeControl="bigControl" 
            stock={5} 
          />
        );
        expect(screen.getByText(/1 item/i)).toBeInTheDocument();
    })


    it('если количество товаров в корзине больше одного', () => {
        render(
          <Controls 
            countInBasket={2} 
            addCount={mockAddCount} 
            removeCount={mockRemoveCount} 
            size="big" 
            sizeControl="bigControl" 
            stock={5} 
          />
        );
        expect(screen.getByText(/2 items/i)).toBeInTheDocument();
    })

    it('если количество товаров в корзине равно количеству товаров в stock', () => {
        render(
            <Controls 
                countInBasket={10} 
                addCount={mockAddCount} 
                removeCount={mockRemoveCount} 
                size="big" 
                sizeControl="bigControl" 
                stock={10} 
            />
        );
        const addButton = screen.getByLabelText('add to cart');
        expect(addButton).toBeDisabled();
    });
})

