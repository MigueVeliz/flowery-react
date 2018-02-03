// Checkout file for stripe integration

import React from 'react';
import axios from 'axios';
import StripeCheckout from 'react-stripe-checkout';

import STRIPE_PUBLISHABLE from './constants/stripe';
import PAYMENT_SERVER_URL from './constants/server';

import { Confirmation } from './components/Confirmation';

const CURRENCY = 'USD';
// const amount = 5;

const fromEuroToCent = amount => amount * 100;

const successPayment = data => {
	alert('Payment Successfull!' + data);

	Confirmation();

	 console.log("Payment Confirmation: " );


};

const errorPayment = data => {
	alert('Payment error!' + data);

	// console.log("Payment Confirmation: " + this.props.paymentConfirmation );

};

const onToken = (amount, description, paymentStatus) => token =>
	axios.post(PAYMENT_SERVER_URL,
	{
		description,
		source: token.id,
		currency: CURRENCY,
		amount: fromEuroToCent(amount)
	})
	.then(successPayment)
	.then( paymentStatus(true) )
	.catch(errorPayment);

const Checkout = ({ name, description, amount, paymentStatus, showPayButton }) =>
	<StripeCheckout
		name={name}
		description={description}
		amount={fromEuroToCent(amount)}
		token={onToken(amount, description, paymentStatus )}
		currency={CURRENCY}
		stripeKey={STRIPE_PUBLISHABLE}
		>
		<button className= { !showPayButton ? "hide-payment-button" : "StripeCheckoutButton" } >
			Pay With Card
		</button>
	</StripeCheckout>


export default Checkout;

