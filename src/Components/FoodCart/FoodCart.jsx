import React from "react";

const FoodCart = ({ item }) => {
  const { name, recipe, image, price, category } = item;

  return (
    <div className="container mx-auto p-4">
      <div className="card bg-base-100 shadow-lg border border-b-2 border-yellow-500">
        {/* Card Image */}
        <figure className="relative">
          <img
            src={image}
            alt={name}
            className="w-full h-48 object-cover rounded-t-lg"
          />
          <span className="absolute top-2 left-2 bg-yellow-500 text-white px-3 py-1 text-xs font-bold uppercase rounded-lg">
            {category}
          </span>
        </figure>

        {/* Card Body */}
        <div className="card-body">
          <h2 className="card-title text-xl font-bold">{name}</h2>
          <p className="text-gray-600 text-sm mt-2">{recipe}</p>

          <div className="mt-4 flex items-center justify-between">
            <p className="text-lg font-bold text-yellow-500">
              ${price.toFixed(2)}
            </p>
            <button className="btn btn-sm text-blue-600 btn-outline border-0 border-b-4 border-yellow-500">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodCart;
