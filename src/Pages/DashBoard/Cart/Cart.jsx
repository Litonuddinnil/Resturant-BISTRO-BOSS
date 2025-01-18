import React from 'react';
import useCart from '../../../hooks/useCart';
import { RiDeleteBin2Fill } from 'react-icons/ri';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import SectionTitle from '../../../Components/SectionTitle/SectionTitle';
import { Link } from 'react-router-dom';

const Cart = () => {
  const [cart, refetch] = useCart();
  const axiosSecure = useAxiosSecure();
  const totalPrice = cart.reduce((acc, item) => acc + item.price, 0);

  const handleDelete = async (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axiosSecure.delete(`/carts/${id}`);
          if (response.data.deletedCount) {
            refetch();
            Swal.fire('Deleted!', 'Your item has been deleted.', 'success');
          }
        } catch (error) {
          Swal.fire('Error!', 'Something went wrong while deleting.', 'error');
        }
      }
    });
  };

  return (
    <div className="container mx-auto p-4">
      {/* Section Title */}
      <SectionTitle heading="My Cart" subheading="Wanna Add More?" />

      {/* Cart Content */}
      <div className="lg:w-10/12 shadow-xl mx-auto">
        {/* Cart Summary */}
        <div className="flex items-center justify-between font-semibold">
          <h2 className="uppercase md:text-xl text-sm my-4 lg:p-4">Total orders: {cart.length}</h2>
          <h2 className="uppercase md:text-xl text-sm lg:mb-4">Total price: ${totalPrice.toFixed(2)}</h2>

          {/* Payment Button */}
          <Link to="/dashboard/payment">
            <button
              className={`mb-2 mr-6 lg:px-6 px-4 py-2 lg:py-4 rounded-lg text-white ${
                cart.length > 0 ? 'bg-yellow-600' : 'bg-gray-400 cursor-not-allowed'
              }`}
              disabled={cart.length === 0}
            >
              Pay
            </button>
          </Link>
        </div>

        {/* Cart Items Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full border border-gray-200">
            <thead className="bg-gray-200">
              <tr>
                <th className="border border-gray-300 px-4 py-2">#</th>
                <th className="border border-gray-300 px-4 py-2">Item Image</th>
                <th className="border border-gray-300 px-4 py-2">Item Name</th>
                <th className="border border-gray-300 px-4 py-2">Price</th>
                <th className="border border-gray-300 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item, index) => (
                <tr key={item._id} className="text-center">
                  <td className="border-b-2 border-gray-300 px-4 py-2">{index + 1}</td>
                  <td className="border-b-2 border-gray-300 px-4 py-2">
                    <img className="w-40 p-4" src={item.image} alt={item.name} />
                  </td>
                  <td className="border-b-2 border-gray-300 px-4 py-2">{item.name}</td>
                  <td className="border-b-2 border-gray-300 px-4 py-2">${item.price.toFixed(2)}</td>
                  <td className="border-b-2 border-gray-300 px-4 py-2">
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="bg-red-500 text-white px-2 py-1 rounded"
                    >
                      <RiDeleteBin2Fill />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Cart;
