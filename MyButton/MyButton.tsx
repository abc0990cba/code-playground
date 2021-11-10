import React from 'react';
import './MyButton.css';

export interface MyButtonProps {
    color: string;
    big?: boolean; 
}


const MyButton: React.FC<MyButtonProps> = ({
                                                    children,
                                                    color,
                                                    big,
                                                    ...props}) => {

    const rootClasses = ["my-button"];
    if(big){
        rootClasses.push("big-button");
    }         

    return (
        <button {...props} className={rootClasses.join(' ')} style={{color}}>
            {children}
        </button>
    );
}

export default MyButton;