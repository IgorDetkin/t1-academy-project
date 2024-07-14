export interface controlProps {
    countInBasket: number;
    addCount: () => void;
    removeCount: () => void;
    size: 'small' | 'big';
    sizeControl?: 'bigControl';  
}