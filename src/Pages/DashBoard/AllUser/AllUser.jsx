import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { FaUserGroup } from "react-icons/fa6";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import Swal from "sweetalert2";

const AllUser = () => {
  const axiosSecure = useAxiosSecure();
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });
  const handlerMakeAdmin = (user) => {
    console.log(user);
    axiosSecure.patch(`/users/admin/${user._id}`).then((result) => {
      console.log(result.data);
      if (result.data.modifiedCount > 0) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${user.name} is an admin now!`,
          showConfirmButton: false,
          timer: 1500,
        });
        refetch();
      }
    });
    console.log(user);
  };
  const handlerDeleteUser = (user) => {
    console.log(user);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/users/${user._id}`).then((res) => {
          console.log(res.data);
          if (res.data.deletedCount) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };
  return (
    <div>
      <SectionTitle
        heading={"How Many??"}
        subheading={"MANAGE ALL USERS"}
      ></SectionTitle>

      {users && users.length > 0 ? (
        <div className="lg:w-10/12 shadow-xl mx-auto ">
          <h2 className="font-extrabold text-4xl">
            Total User : {users.length}
          </h2>
          {/* users users List */}
          <div className="overflow-x-auto">
            <table className="table-auto w-full   border border-gray-200">
              <thead className="bg-gray-200">
                <tr>
                  <th className="border border-gray-300 px-4 py-2">#</th>
                  <th className="border border-gray-300 px-4 py-2">Name</th>
                  <th className="border border-gray-300 px-4 py-2">Email</th>
                  <th className="border border-gray-300 px-4 py-2">Role</th>
                  <th className="border border-gray-300 px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={user._id} className="text-center ">
                    <td className="border-b-2 border-gray-300 px-4 py-2">
                      {index + 1}
                    </td>
                    <td className="border-b-2 border-gray-300 px-4 py-2">
                      {user.name}
                    </td>
                    <td className="border-b-2 border-gray-300 px-4 py-2">
                      {user.email}
                    </td>

                    <td className="border-b-2 border-gray-300 px-4 py-2 ">
                      {user.role === "admin" ? (
                        "Admin"
                      ) : (
                        <button
                          onClick={() => handlerMakeAdmin(user)}
                          className="bg-gray-500 text-white px-2 py-1 rounded"
                        >
                          <FaUserGroup />
                        </button>
                      )}
                    </td>
                    <td className="border-b-2 border-gray-300 px-4 py-2">
                      <button
                        onClick={() => handlerDeleteUser(user)}
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
      ) : (
        <div className="text-center text-gray-500 text-xl mt-8">
          Your users is empty. Start adding users!
        </div>
      )}
    </div>
  );
};

export default AllUser;
