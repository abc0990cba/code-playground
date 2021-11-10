import React from 'react';
import './MyButton.css';
export interface MyButtonProps {
    color: string;
    big?: boolean;
}
declare const MyButton: React.FC<MyButtonProps>;
export default MyButton;
