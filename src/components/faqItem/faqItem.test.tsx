import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import FaqItem from './faqItem';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';

describe('FaqItem component', () => {
    it("render", () => {
        render(<FaqItem title="Заголовок" description="Описание" isVisibleDesc={false}/>);
        expect(screen.getByText(/Заголовок/i)).toBeInTheDocument();
        expect(screen.queryByText(/Описание/i)).toBeInTheDocument();
    })
    
    it("toggles description visible" , () => {
        render(<FaqItem title="Заголовок" description="Описание" isVisibleDesc={false} />);
        const button = screen.getByRole('button', { name: /open or close description/i });
        fireEvent.click(button);
        expect(screen.getByText(/Описание/i)).toBeVisible();
    })

    it("change isVisibleDesc boolean" , () => {
        const isVisible = true;
        expect(isVisible).toBeTruthy();
        render(<FaqItem title="Заголовок" description="Описание" isVisibleDesc={isVisible} />);
        const button = screen.getByRole('button', { name: /open or close description/i });
        fireEvent.click(button);
        expect(screen.getByText(/Описание/i)).toBeVisible();
    })
});