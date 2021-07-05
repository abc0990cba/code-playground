import React from "react";
import PropTypes from "prop-types";

function Categories({ activeCategory, items, onClickCategory }) {
  return (
    <div className="categories">
      <ul>
        <li
          onClick={() => onClickCategory(null)}
          className={activeCategory === null ? "active" : ""}
        >
          Все
        </li>
        {items &&
          items.map((item, ind) => {
            return (
              <li
                onClick={() => onClickCategory(ind)}
                className={activeCategory === ind ? "active" : ""}
                key={item + ind}
              >
                {item}
              </li>
            );
          })}
      </ul>
    </div>
  );
};

Categories.propTypes = {
  // activeCategory : PropTypes.number.isRequired,
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
  onClickCategory: PropTypes.func,
};

export default React.memo(Categories);
