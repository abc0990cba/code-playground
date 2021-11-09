import React from 'react';

interface MyButtonProps {
    color: string;
    
}


export const MyButton: React.FC<MyButtonProps> = ({
                                                    children,
                                                    color,
                                                    ...props}) => {
    return (
        <button {...props} style={{color}}>
            {children}
        </button>
    );
}