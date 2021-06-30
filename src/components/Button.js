import classNames from "classnames";

const Button = ({ onClick, outline, children, className }) => {
    return (
      <button className={classNames("button", className, { "button--outline": outline })}
              onClick={onClick}>
        {children}
      </button>
    );
};

export default Button;