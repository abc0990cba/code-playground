import React from "react";

const Categories = ({items}) => {
  return (
    <div className="categories">
      <ul>
        <li className="active">Все</li>
        {items.map((item, ind) => {
            return <li key={item + ind}>{item}</li>
        })}
      </ul>
    </div>
  );
};

export default Categories;