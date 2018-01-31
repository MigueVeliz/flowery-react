import React, { Component } from 'react';

import Checkout from "../Checkout";
import { status } from './Confirmation';

class CheckOut extends Component {

	constructor() {
		super()

		this.state = {
			url: "https://quiet-thicket-12667.herokuapp.com/floweryOrders",
			updatedItems: [],
			parsedItems: [],
			total: 0,
			paymentStatus: false,
			name: "",
			phoneNumber: "",
			address: "",
			Message: "N/A"
		}
	}



	// Remoe item from parsedItems array
	removeItem(id) {
		let currentItemsInCart = this.state.parsedItems;

		let newItemsInCart = currentItemsInCart.filter( item => {
			return item.id !== id ? item: "";
		});


		this.setState({
			parsedItems: newItemsInCart
		})

		// removes the product from the shopping cart
		// array in the app.js state
		this.props.removeItem(id);
	}



	componentWillMount() {
		//this.parseItemsQuantity();
		console.log("componentWillMount running!");

		this.showTotal();

		//console.log("this.state.parsedItems:" + this.state.parsedItems.length)
	}



	showItems() {
		const items = this.props.shoppingCartItems;

		return items.map( (item, index) => {
			return (
				<div className="items-to-be-bought" key={index}>
					<div className = "left-info" >
						<img className = "image-checking-out" src = { item.image } alt="hahaha" />
						<h2> { item.name } </h2>
						<h1> ${ item.price }</h1>
					</div>


				</div>
			)
		})
	}

	showTotal() {
		const items = this.props.shoppingCartItems;

		let total = 0;

		items.forEach(item => {
			total += item.price;
		});

		this.setState({ total: total })

		console.log(`total is ${total}`);

	}// end of showTotal


	//Getting From Data
	handleNameChange(event) { this.setState({ name: event.target.value }); }
	handlePhoneChange(event) { this.setState({ phoneNumber: event.target.value }); }
	handleAddressChange(event) { this.setState({ address: event.target.value }); }
	handleMessageChange(event) { this.setState({ message: event.target.value }); }

	showForm() {
		return (
		 	<form id="form" className="topBefore" >
				<h3 className="receiving-person">Person who's receiving:</h3>
				<input id="name" type="text" placeholder="Name" name="name" value={this.state.name} onChange={ this.handleNameChange.bind(this) }/>
			 	{/*<input id="email" type="text" placeholder="E-mail" />*/}
			 	<input id="cell-number" type="number" placeholder="Cell Number" name="cellNumber" value={this.state.phoneNumber} onChange={ this.handlePhoneChange.bind(this) } />
			 	<input id="Address" type="text" placeholder="Address" name="address" value={this.state.address} onChange={ this.handleAddressChange.bind(this) } />
			 	<textarea id="message" type="text" placeholder="MESSAGE" name="textarea" value={this.state.message} onChange={ this.handleMessageChange.bind(this) } ></textarea> 
	  			{/*<input className="place-order-button" id="submit" type="submit" value="GO!" />*/}
  
			</form>
		)
	}


	showStatus() {
		console.log("PaymentStatus: " + this.state.paymentStatus);

		return ( this.state.paymentStatus === true ? <h1>Works! </h1> : <h1>False</h1>  )


	}

	//Gets payment status true or false from stripe checkout
	getPaymentStatus(status) {
		console.log("Payment Successfull: " + status);

		this.setState({ paymentStatus: status })

		this.sendOrderInformation();
	}

	//Will make an api call to save order information
	sendOrderInformation() {
		const name = this.state.name;
		const phoneNumber = this.state.phoneNumber;
		const address = this.state.address;
		const message = this.state.message;
		const total = this.state.total;
		const status = "New Order";

		console.log("Sendind Order Infirmation to Database!");

		fetch(this.state.url, {
			method: 'POST',
			headers: {
				'Accepts': 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				name: name,
				phoneNumber: phoneNumber,
				address: address,
				message: message,
				status: status,
				total: total
			})
		})
		.then(( repoonse ) => {
			return repoonse.json()
		})
		.catch( error => console.log("Error: " + error));



	}//end if sendOrderInformation




	render() {
		return (
			<div className="checkout-section">

				<button className="back-to-shopping" onClick={ () => { this.props.getMode("buying") }} >Back to shopping</button>

				<div className="current-items">
					{ this.showItems() }
				</div>

				<div className="message-area">
					{ this.showForm() }

				</div>

				<div className="total">

					<h3>Your total is: { this.state.total } </h3>

					{ this.showStatus() }

				</div>

				<div className="payment-section">
					
					{/*<h2>Payment Information</h2>*/}

					<Checkout 
						name={'Sweetness'}
						description={'Thanks <3'}
						amount={this.state.total}
						currency="USD"
						className="StripeCheckout2"
						// paymentConfirmation={'false'}

						paymentStatus={ this.getPaymentStatus.bind(this) }
					/>
				</div>




				{/*</Checkout>*/}

				{/*<button onClick={ () => { this.placeOrder() } } className="place-order-button">Place Order</button>*/}

			</div>
		);
	}
}

export default CheckOut;