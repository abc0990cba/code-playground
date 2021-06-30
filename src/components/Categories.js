import React, {useState} from "react";

const Categories = ({items}) => {

    const [activeItem, setActiveItem] = useState(null);

  return (
    <div className="categories">
      <ul>
        <li onClick = {() => setActiveItem(null)}
            className={activeItem === null ? "active" : ""}
        >Все</li>
        {items.map((item, ind) => {
            return (
              <li
                onClick={() => setActiveItem(ind)}
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

export default Categories;