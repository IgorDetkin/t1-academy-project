import SearchForm from './searchForm';
import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof SearchForm> = {
    title: 'Atoms/Input',
    component: SearchForm,
    tags: ['autodocs'],
}

type Story = StoryObj<typeof SearchForm>;


export const Input: Story = {
    name: 'Поле ввода для поиска товаров',
    parameters: {
        docs: {
            description: {
                story: 'Поле ввода для поиска товаров'
            }
        }
    },
    args: {
    },
    render: (args) => {
        const [searchReq, setSearchReq] = useState<string>('');
        return (
            <div>
              <SearchForm {...args} setSearchReq={setSearchReq} />
              <p>Search Request: {searchReq}</p>
            </div>
          );
      },
};

export const InputWithTimeout: Story = {
    name: 'Поле ввода для поиска товаров(debounce)',
    parameters: {
        docs: {
            description: {
                story: 'Поле ввода для поиска товаров c задержкой начала поиска(чтобы пока пользователь вводит слово, на каждый введенный символ не происходил поиск.'
            }
        }
    },
    args: {
        delay: 1500,
    },
    render: (args) => {
        const [searchReq, setSearchReq] = useState<string>('');
        return (
            <div>
              <SearchForm {...args} setSearchReq={setSearchReq} />
              <p>Search Request: {searchReq}</p>
            </div>
          );
      },
}


export default meta; 