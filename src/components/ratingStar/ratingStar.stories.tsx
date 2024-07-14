import RatingStar from "./ratingStar";
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof RatingStar> = {
    title: 'Atoms/RatingStar',
    component: RatingStar,
    tags: ['autodocs'],
}

type Story = StoryObj<typeof RatingStar>;

export const Primary: Story = {
    name: 'Звезда рейтинга товара',
    parameters: {
        docs: {
            description: {
                story: 'Засчитанная звезда рейтинга товара'
            }
        }
    },
    args: {
        color: 'filledFull'
    }
}

export const Secondary: Story = {
    name: 'Звезда рейтинга товара',
    parameters: {
        docs: {
            description: {
                story: 'Незасчитанная звезда рейтинга товара'
            }
        }
    },
    args: {
        color: ''
    }
}

export default meta; 