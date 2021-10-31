import React, {useState} from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import { Link } from 'react-router-dom';

const CARD_OPTIONS = {
	iconStyle: "solid",
	style: {
		base: {
			iconColor: "#c4f0ff",
			color: "#fff",
			fontWeight: 500,
			fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
			fontSize: "16px",
			fontSmoothing: "antialiased",
			":-webkit-autofill": { color: "#fce883" },
			"::placeholder": { color: "#87bbfd" }
		},
		invalid: {
			iconColor: "#ffc7ee",
			color: "#ffc7ee"
		}
	}
}

function getCartTotal(){
    var cartTotal = sessionStorage.getItem('cartTotal');
    return cartTotal;
}

function clearCart(){
    sessionStorage.removeItem('cartTotal');
    sessionStorage.removeItem('beatsCart');
    sessionStorage.removeItem('eventsCart');
}

async function postToHistory(total){
    var userId = await getUserId();
    var beatIds = await getBeatIds();
    var eventIds = await getEventIds();
    //console.log(userid);
    //console.log(total);

    const requestOptions = {
        method: 'POST',
        headers: 
        { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          userId: userId, 
          total: total, 
          beatIds: beatIds,
          eventIds: eventIds
        })
    }

    try {
        await fetch('https://www.beatcaveapi.com/payment/addorder', requestOptions)
        .then(response => response.json())
        .then(data => {
          //console.log(data);
          clearCart();
        })
        .catch(
          error => {
            console.log(error)
          }
        )
    } catch (error) {
        console.log('Error: ', error);
    }
}

function getUserId(){
    //Returns stored user id.
    const storedToken = sessionStorage.getItem('token');
    if(storedToken != null){
        var tokenBody = storedToken.split('.')[1];
        //console.log(tokenBody);
        var tokenBodyDecoded = Buffer.from(tokenBody, 'base64').toString();
        //console.log(tokenBodyDecoded);
        const tokenBodyJson = JSON.parse(tokenBodyDecoded);
        return tokenBodyJson.sub;
    }
}

function getBeatIds(){
    return sessionStorage.getItem('beatsCart');
}

function getEventIds(){
    return sessionStorage.getItem('eventsCart');
}

export default function PaymentForm(){
    const [success, setSuccess] = useState(false);
    const stripe = useStripe();
    const elements = useElements();
    var cartTotal = getCartTotal();
    var stripeTotal = (cartTotal * 100).toFixed(0);


    const handleSubmit = async (e) => {
        console.log(stripeTotal);
        e.preventDefault();
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement)
        });

        if(!error){
            try {
                const {id} = paymentMethod;
                const response = await axios.post('https://www.beatcaveapi.com/payment', {
                    amount: stripeTotal,
                    id: id
                });

                if(response.data.success){
                    console.log('successful payment!')
                    setSuccess(true)
                    postToHistory(cartTotal);
                }
            } catch (error) {
                console.log(error);
            }
        }else{
            console.log(error.message);
        }
    }


    return(
        <>
        {!success ?
        <div>
            <h1>Total: ${cartTotal}</h1>
            <form onSubmit={handleSubmit}>
                <fieldset className='FormGroup'>
                    <div className='FormRow'>
                        <CardElement options={CARD_OPTIONS}/>
                    </div>      
                </fieldset>
                <button className='paybutton'>Pay</button>
            </form>
        </div>
        :
        <div className='thanks'>
            <div className='thankswrapper'>
                <h2 className='thankstext'>Thanks for purchasing with beatcave!</h2>
                <button className='thanksbutton'><Link to='/home'>Return to the Cave</Link></button>
            </div>
        </div>
        }
        </>
    )
}