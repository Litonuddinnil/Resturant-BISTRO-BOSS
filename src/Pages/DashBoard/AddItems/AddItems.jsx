import React from "react";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import { useForm } from "react-hook-form";
import { FaUtensils } from "react-icons/fa6";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const Image_Hosting_Key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const Image_Hosting_Api = `https://api.imgbb.com/1/upload?key=${Image_Hosting_Key}`;

const AddItems = () => {
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    //image upload from the imagebb and link here
    const imageFile = { image: data.image[0] };
    const res = await axiosPublic.post(Image_Hosting_Api,imageFile, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if(res.data.success){
    //now menuItems set the database for the form data
    const menuItems = {
        name:data.name,
        category:data.Category,
        price:parseFloat(data.price),
        image:res.data.data.display_url,
        recipe:data.details
    }
    const menuRes = await axiosSecure.post('/menu',menuItems);
    console.log(menuRes.data);
        // console.log(menuItems);
        if(menuRes.data.insertedId){
            //show the popUp success
            reset();
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: `${data.name} Added To The  Items!`,
                showConfirmButton: false,
                timer: 1500
              });
        }
    }
  };

  return (
    <div className="w-11/12 mx-auto">
      <SectionTitle
        heading={"What's new?"}
        subheading={"ADD AN ITEM"}
      ></SectionTitle>
      <div className="bg-base-200 w-full shadow-lg rounded-lg p-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Recipe Name */}
          <div>
            <label className="label">
              <span className="label-text font-medium">Recipe Name*</span>
            </label>
            <input
              {...register("name", { required: "Recipe name is required" })}
              type="text"
              placeholder="Enter recipe name"
              className={`input input-bordered w-full ${
                errors.name ? "border-red-500" : ""
              }`}
            />
            {errors.name && (
              <span className="text-red-500 text-sm">
                {errors.name.message}
              </span>
            )}
          </div>

          {/* Category and Price on the Same Line */}
          <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
            {/* Category */}
            <div className="flex-1">
              <label className="label">
                <span className="label-text font-medium">Category*</span>
              </label>
              <select
                {...register("Category", {
                  required: "Please select a category",
                })}
                className={`select select-bordered w-full ${
                  errors.Category ? "border-red-500" : ""
                }`}
              >
                <option disabled selected>
                  Select a Category
                </option>
                <option value="pizza">Pizza</option>
                <option value="salad">Salad</option>
                <option value="soup">Soup</option>
                <option value="dessert">Dessert</option>
                <option value="drinks">Drinks</option>
              </select>
              {errors.Category && (
                <span className="text-red-500 text-sm">
                  {errors.Category.message}
                </span>
              )}
            </div>

            {/* Price */}
            <div className="flex-1">
              <label className="label">
                <span className="label-text font-medium">Price*</span>
              </label>
              <input
                {...register("price", {
                  required: "Price is required",
                  valueAsNumber: true,
                  validate: (value) =>
                    value > 0 || "Price must be greater than 0",
                })}
                type="number"
                placeholder="Enter price"
                className={`input input-bordered w-full ${
                  errors.price ? "border-red-500" : ""
                }`}
              />
              {errors.price && (
                <span className="text-red-500 text-sm">
                  {errors.price.message}
                </span>
              )}
            </div>
          </div>

          {/* Recipe Details */}
          <div>
            <label className="label">
              <span className="label-text font-medium">Recipe Details*</span>
            </label>
            <textarea
              {...register("details", { required: "Details are required" })}
              placeholder="Enter recipe details"
              className={`textarea textarea-bordered w-full ${
                errors.details ? "border-red-500" : ""
              }`}
              rows="3"
            ></textarea>
            {errors.details && (
              <span className="text-red-500 text-sm">
                {errors.details.message}
              </span>
            )}
          </div>

          {/* Choose a File */}
          <div>
            <label className="label">
              <span className="label-text font-medium">Upload Image*</span>
            </label>
            <input
              {...register("image", { required: "Image upload is required" })}
              type="file"
              className={`file-input w-full max-w-xs ${
                errors.image ? "border-red-500" : ""
              }`}
            />
            {errors.image && (
              <span className="text-red-500 text-sm">
                {errors.image.message}
              </span>
            )}
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="btn bg-[#835D23] text-white rounded-none flex items-center space-x-2"
            >
              <span>Add Item</span>
              <FaUtensils />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddItems;
