import React from "react";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom"; 
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useCart from "../../hooks/useCart";

const FoodCart = ({ item }) => {
  const { name, recipe, image, price, category, _id } = item;
  const navigate = useNavigate();
  const location = useLocation();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [,refetch] = useCart();
  const handlerAddToFood = () => {
    if (user && user.email) {
      //set cart to the database
      const cartItem = {
        menuId: _id,
        email: user.email,
        name,
        image,
        price,
        category,
      };
      axiosSecure.post("/carts", cartItem)
       .then((result) => {
        console.log(result.data);
        if (result.data.insertedId) {
          Swal.fire({
            position: "top-right",
            icon: "success",
            title: `${name} added to the cart.`,
            showConfirmButton: false,
            timer: 1500,
          });
          //refetch the cart and reload data by email
          refetch();
        }
      });
    } else {
      Swal.fire({
        title: "Please Login in first then add to cart.",
        text: "Login and add to cart!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Login!",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login", { state: { from: location } });
        }
      });
    }
  };
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
            <button
              onClick={handlerAddToFood}
              className="btn btn-sm text-blue-600 btn-outline border-0 border-b-4 border-yellow-500"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodCart;
