import React from 'react';
import SectionTitle from '../../../Components/SectionTitle/SectionTitle';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckOutFrom from './CheckOutFrom';
 

// Load Stripe with Public Key
const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK || 'YOUR_FALLBACK_PUBLIC_KEY');

const Payment = () => {
  return (
    <div>
      {/* Section Title */}
      <SectionTitle subheading="Payment" heading="Please Pay First Then Eat" />
      
      {/* Stripe Elements Wrapper */}
      <Elements stripe={stripePromise}>
        <CheckOutFrom />
      </Elements>
    </div>
  );
};

export default Payment;