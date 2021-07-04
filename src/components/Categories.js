import React, { useState } from "react";

function Categories({ items, onClickItem }) {
  const [activeItem, setActiveItem] = useState(null);

  const onSelectItem = (index) => {
    setActiveItem(index);
    onClickItem(index);
  };

  return (
    <div className="categories">
      <ul>
        <li
          onClick={() => onSelectItem(null)}
          className={activeItem === null ? "active" : ""}
        >
          Все
        </li>
        {items &&
          items.map((item, ind) => {
            return (
              <li
                onClick={() => onSelectItem(ind)}
                className={activeItem === ind ? "active" : ""}
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

export default React.memo(Categories);
