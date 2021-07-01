import classNames from 'classnames';
import PropTypes from 'prop-types';

const Button = ({ onClick, outline, children, className }) => {
    return (
      <button className={classNames("button", className, { "button--outline": outline })}
              onClick={onClick}>
        {children}
      </button>
    );
};

Button.propTypes = {
  onClick: PropTypes.func,
}

export default Button;