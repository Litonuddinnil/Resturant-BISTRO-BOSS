import React from "react";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import useMenu from "../../../hooks/useMenu";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const ManageItems = () => {
  const [menu, , refetch] = useMenu();
  const axiosSecure = useAxiosSecure();

  const handlerDelete = (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await axiosSecure.delete(`/menu/${item._id}`);
        if (response.data.deletedCount > 0) {
          refetch();
          Swal.fire({
            title: "Deleted!",
            text: `${item.name} has been successfully deleted.`,
            icon: "success",
          });
        }
      }
    });
  };
  const handlerUpdateMenu = (item) => {
    Swal.fire({
      title: "Update Menu Item",
      html: `
        <input id="name" class="swal2-input" placeholder="Name" value="${item.name}" />
        <input id="category" class="swal2-input" placeholder="Category" value="${item.category}" />
        <input id="price" class="swal2-input" placeholder="price" value="${item.price}" />
      `,
      showCancelButton: true,
      confirmButtonText: "Update",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const name = document.getElementById("name").value;
        const category = document.getElementById("category").value;
        const priceInput = document.getElementById("price").value;
        const price = priceInput ? parseFloat(priceInput) : null;
        const updatedItem = {
          name: name,
          category: category,
          price: price,
        };
        const res = await axiosSecure.put(`/menu/${item._id}`, updatedItem);
        if (res.data.modifiedCount > 0) {
          refetch();
          Swal.fire({
            title: "Success",
            text: `${item.name} has been successfully update.`,
            icon: "success",
          });
        }
      }
    });
  };
  return (
    <div>
      <SectionTitle
        heading={"Hurry Up!"}
        subheading={"MANAGE ALL ITEMS"}
      ></SectionTitle>
      {menu && menu.length > 0 ? (
        <div className="lg:w-10/12 shadow-xl mx-auto">
          <div className="flex items-center justify-between font-semibold">
            <h2 className="uppercase md:text-xl text-sm my-4 lg:p-4">
              Total items: {menu.length}
            </h2>
          </div>
          <div className="overflow-x-auto" style={{ height: "100vh" }}>
            <table className="table-auto w-full border border-gray-200">
              <thead className="bg-gray-200 sticky top-0 z-10">
                <tr>
                  <th className="border border-gray-300 px-4 py-2">#</th>
                  <th className="border border-gray-300 px-4 py-2">
                    Item Image
                  </th>
                  <th className="border border-gray-300 px-4 py-2">
                    Item Name
                  </th>
                  <th className="border border-gray-300 px-4 py-2">Price</th>
                  <th className="border border-gray-300 px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {menu.map((item, index) => (
                  <tr key={item._id} className="text-center">
                    <td className="border-b-2 border-gray-300 px-4 py-2">
                      {index + 1}
                    </td>
                    <td className="border-b-2 border-gray-300 px-4 py-2">
                      <div className="flex justify-center items-center">
                        <img
                          className="w-20 h-20 object-cover rounded-lg shadow-md"
                          src={item.image}
                          alt={item.name}
                        />
                      </div>
                    </td>
                    <td className="border-b-2 border-gray-300 px-4 py-2">
                      {item.name}
                    </td>
                    <td className="border-b-2 border-gray-300 px-4 py-2">
                      {item.price !== null &&
                      item.price !== undefined &&
                      !isNaN(item.price)
                        ? `$${item.price.toFixed(2)}`
                        : "$0.00"}{" "}
                      {/* If price is valid, display it formatted, otherwise show default value */}
                    </td>
                    <td className="border-b-2 border-gray-300 px-4 py-2">
                      <div className="flex items-center gap-4 justify-center">
                        <button
                          onClick={() => handlerUpdateMenu(item)}
                          className="bg-blue-500 text-white px-2 py-1 rounded"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handlerDelete(item)}
                          className="bg-red-500 text-white px-2 py-1 rounded"
                        >
                          <RiDeleteBin2Fill />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="text-center text-gray-500 text-xl mt-8">
          Your menu is empty. Start adding items!
        </div>
      )}
    </div>
  );
};

export default ManageItems;
