import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';

const PaymentHistory = () => {
    const axiosSecure = useAxiosSecure();
    const {user} = useAuth();

    const {data:payments=[]} = useQuery({
        queryKey:['payments',user.email],
        queryFn: async ()=>{
            const res = await axiosSecure.get(`/payments/${user.email}`);
            return res.data;
        }
    })
    console.log(payments[0].cartIds);
    return (
        <div>
            <h1 className='text-3xl'>Total Payments:{payments.length}</h1>
            <div className="overflow-x-auto">
                      <table className="table-auto w-full border border-gray-200">
                        <thead className="bg-gray-200">
                          <tr>
                            <th className="border border-gray-300 px-4 py-2 uppercase">#</th>
                            <th className="border border-gray-300 px-4 py-2 uppercase">Email</th>
                            <th className="border border-gray-300 px-4 py-2 uppercase">Transaction Id</th>
                            <th className="border border-gray-300 px-4 py-2 uppercase">Total Price</th>
                            <th className="border border-gray-300 px-4 py-2 uppercase">Payment Date</th>
                            <th className="border border-gray-300 px-4 py-2 uppercase">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          { payments.map((payment, index) => (
                            <tr key={payment._id} className="text-center">
                              <td className="border-b-2 border-gray-300 px-4 py-2">{index + 1}</td>
                              <td className="border-b-2 border-gray-300 px-4 py-2">
                               {payment.email}
                              </td>
                              <td className="border-b-2 border-gray-300 px-4 py-2"> {payment.transactionId}</td>
                              <td className="border-b-2 border-gray-300 px-4 py-2">${payment.price.toFixed(2)}</td>
                              <td className="border-b-2 border-gray-300 px-4 py-2">
                               {payment.date}
                              </td>
                              <td className="border-b-2 border-gray-300 px-4 py-2">
                               {payment.status}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
        </div>
    );
};

export default PaymentHistory;