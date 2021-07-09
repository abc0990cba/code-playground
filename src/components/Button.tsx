import React from "react";
import classNames from "classnames";

interface Props{
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  className: string;
  outline?: boolean;
  children?: React.ReactNode;
}

const Button: React.FC<Props> = ({ onClick, className = "", outline=false, children=null}) => {
  return (
    <button
      onClick={onClick}
      className={classNames("button", className, {
        "button--outline": outline,
      })}
    >
      {children}
    </button>
  );
};


export default Button;
