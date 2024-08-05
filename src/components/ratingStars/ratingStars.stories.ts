import RatingStars from "./ratingStars";
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof RatingStars> = {
    title: 'Molecules/RatingStars',
    component: RatingStars,
    tags: ['autodocs'],
}

type Story = StoryObj<typeof RatingStars>;

export const Primary: Story = {
    name: 'Оценка рейтинга товара по 5-балльной шкале',
    parameters: {
        docs: {
            description: {
                story: 'Оценка рейтинга товара. Рейтинг получаем с сервера.'
            }
        }
    },
    args: {
        rating: 3,
        starsLength: 5
    }
}

export default meta; 