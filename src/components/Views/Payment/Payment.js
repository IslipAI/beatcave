import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from './PaymentForm';
import './Payment.css';

//Stripe Public Access Key.
const PUBLIC_KEY = 'pk_test_51Jn5xJGxALe7ya1sqw8PyN1PiQQZUPJgIFARCsRVkfQ2elH29l8d974ovdXER1K5xARTLPK8SkXnHIxdLpoN3qSi00d4sitYHn';

//Load stripe upon viewed.
const stripePromise = loadStripe(PUBLIC_KEY);

/**
 * Function accepts stripe promise, amount of 
 * the transaction and returns payment form.
 * @param {*} amount - amount of transaction.
 * @returns Stripe payment form.
 */
export default function Payment(amount){
    return(
        <Elements classname='stripewrapper' stripe={stripePromise}>
            <PaymentForm amount={amount}/>
        </Elements>
    )
}