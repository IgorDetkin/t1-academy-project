import Controls from './controls';
import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Controls> = {
    title: 'Molecules/Controls',
    component: Controls,
    tags: ['autodocs'],
}

type Story = StoryObj<typeof Controls>;

export const Primary: Story = {
    name: 'Количество товаров в корзине',
    parameters: {
        docs: {
            description: {
                story: 'Количество товаров, равное одному'
            }
        }
    },
    args: {
        countInBasket: 1,
    },
    render: (args) => {
        const [count, setCount] = useState(args.countInBasket);
        const addCount = () => setCount(count + 1);
        const removeCount = () => setCount(count > 0 ? count - 1 : 0);
    
        return <Controls 
            countInBasket={count} 
            addCount={addCount} 
            removeCount={removeCount} 
            size='small'
        />;
      },
};

export const Secondary: Story = {
    name: 'Количество товаров в корзине',
    parameters: {
        docs: {
            description: {
                story: 'Количество товаров, больше одного'
            }
        }
    },
    args: {
        countInBasket: 5
    },
    render: (args) => {
        const [count, setCount] = useState(args.countInBasket);
        const addCount = () => setCount(count + 1);
        const removeCount = () => setCount(count > 0 ? count - 1 : 0);
    
        return <Controls 
            countInBasket={count} 
            addCount={addCount} 
            removeCount={removeCount} 
            size='small'
        />;
      },
};

export const BigSize: Story = {
    name: 'Количество товаров в корзине (Большой размер)',
    parameters: {
        docs: {
            description: {
                story: 'Блок количества товаров для страницы Продукта (Большой размер)'
            }
        }
    },
    args: {
        countInBasket: 5
    },
    render: (args) => {
        const [count, setCount] = useState(args.countInBasket);
        const addCount = () => setCount(count + 1);
        const removeCount = () => setCount(count > 0 ? count - 1 : 0);
    
        return <Controls 
            countInBasket={count} 
            addCount={addCount} 
            removeCount={removeCount} 
            size='big'
            sizeControl='bigControl'
        />;
      },
}


export default meta; 





// import React, { useState } from 'react';
// import { Meta, Story } from '@storybook/react';
// import Controls from './controls';

// export default {
//   title: 'Atoms/Controls',
//   component: Controls,
//   tags: ['autodocs'],
// } as Meta;

// const Template: Story<{ countInBasket: number }> = (args) => {
//   const [count, setCount] = useState(args.countInBasket);

//   const addCount = () => setCount(count + 1);
//   const removeCount = () => setCount(count > 0 ? count - 1 : 0);

//   return <Controls countInBasket={count} addCount={addCount} removeCount={removeCount} />;
// };

// export const Primary = Template.bind({});
// Primary.args = {
//   countInBasket: 1,
  
// };

// export const Secondary = Template.bind({});
// Secondary.args = {
//   countInBasket: 5,
// };
