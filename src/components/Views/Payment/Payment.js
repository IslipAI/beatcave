import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from './PaymentForm';
import './Payment.css';

const PUBLIC_KEY = 'pk_test_51Jn5xJGxALe7ya1sqw8PyN1PiQQZUPJgIFARCsRVkfQ2elH29l8d974ovdXER1K5xARTLPK8SkXnHIxdLpoN3qSi00d4sitYHn';

const stripePromise = loadStripe(PUBLIC_KEY);

export default function Payment(amount){
    return(
        <Elements classname='stripewrapper' stripe={stripePromise}>
            <PaymentForm amount={amount}/>
        </Elements>
    )
}