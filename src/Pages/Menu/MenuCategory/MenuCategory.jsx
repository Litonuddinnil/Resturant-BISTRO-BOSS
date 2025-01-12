import React from "react";
import MenuItems from "../../Shared/MenuItem/MenuItems";
import { Link } from "react-router-dom";

import Cover from "../../Shared/Cover/Cover";

const MenuCategory = ({ item, heading, subheading,image }) => {
  return (
    <div>
     {heading &&  <Cover image={image} heading={heading} subheading={subheading}></Cover>}
      <div className="grid grid-cols-1 md:grid-cols-2  gap-4">
        {item.map((item) => (
          <MenuItems key={item._id} item={item}></MenuItems>
        ))}
      </div>
      <div className="flex items-center justify-center">
        <Link to={`/order/${heading}`}>
          <button className="btn btn-outline border-0 mb-6  border-b-4">
            View Full Menu.
          </button>
        </Link>
      </div>
    </div>
  );
};

export default MenuCategory;
