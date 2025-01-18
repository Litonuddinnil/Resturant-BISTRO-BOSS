import React, { useEffect, useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useCart from "../../../hooks/useCart";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const CheckOutForm = () => {
  const axiosSecure = useAxiosSecure();
  const stripe = useStripe();
  const elements = useElements();

  const [paymentError, setPaymentError] = useState(null);
  const [clientSecret, setClientSecret] = useState("");
  const [paymentSuccess, setPaymentSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const [transactionId, setTransactionId] = useState("");
  const navigate = useNavigate();
  const [cart, refetch] = useCart();
  const totalPrice = cart.reduce((total, item) => total + item.price, 0);
  const { user } = useAuth();

  useEffect(() => {
    if (totalPrice > 0) {
      axiosSecure
        .post("/create-payment-intent", { price: totalPrice })
        .then((result) => {
          console.log(result.data.clientSecret);
          setClientSecret(result.data.clientSecret);
        });
    }
  }, [axiosSecure, totalPrice]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);
    if (!card) {
      return;
    }
    setLoading(true);

    // Create Payment Method
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setPaymentError(error.message);
      setPaymentSuccess(null);
      console.error("[ERROR]", error);
    } else {
      setPaymentSuccess("Payment method created successfully!");
      setPaymentError(null);
      console.log("[PaymentMethod]", paymentMethod);
    }
    setLoading(false);

    //confirm payment
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: user?.displayName || "anonymous",
            email: user?.email || "anonymous",
          },
        },
      });
    if (confirmError) {
      console.log("[confirmError]", confirmError);
    } else {
      console.log("PaymentIntent", paymentIntent);
      if (paymentIntent.status === "succeeded") {
        console.log("TransactionId", paymentIntent.id);
        setTransactionId(paymentIntent.id);
        //Now save the payment mongodb database
        const payment = {
          email: user.email,
          transactionId: paymentIntent.id,
          price: totalPrice,
          date: new Date(),
          cartIds: cart.map((item) => item._id),
          menuItemIds: cart.map((item) => item.menuId),
          status: "pending",
        };
        const res = await axiosSecure.post("/payments", payment);
        console.log("payment Data:", res.data);
        refetch();
        if (res.data?.result?.insertedId) {
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: "Thank you!Your payment has been successfully.",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate('/dashboard/paymentHistory')
        }
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Card Element */}
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />

      {/* Submit Button */}
      <button
        className={`btn px-6 my-4 text-white ${
          loading ? "btn-disabled" : "btn-success"
        }`}
        type="submit"
        disabled={!stripe || loading || !clientSecret}
      >
        {loading ? "Processing..." : "Pay"}
      </button>

      {/* Payment Feedback */}
      {paymentError && <p className="text-red-500">{paymentError}</p>}
      {paymentSuccess && <p className="text-green-500">{paymentSuccess}</p>}
      {transactionId && (
        <p className="text-green-500">Your Transaction Id:{transactionId}</p>
      )}
    </form>
  );
};

export default CheckOutForm;
