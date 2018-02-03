import React, { Component } from 'react';

import Checkout from "../Checkout";
import { status } from './Confirmation';

import RecipientForm from './RecipientForm';

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
			message: "",
			showPayButton: false,
			delivery: true,
			clicked: false,
			sentOrderInformation: false
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
	}// end of removeItem


	componentWillMount() {
		console.log("componentWillMount running!");

		this.showTotal();

	}//end of ComponentWillMount

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

		total > 0 ? this.setState({ showPayButton: true }) : this.setState({ showPayButton: false });

		console.log(`total is ${total}`);

	}// end of showTotal


	//Getting From Data
/*	handleNameChange(event) { this.setState({ name: event.target.value }); }
	handlePhoneChange(event) { this.setState({ phoneNumber: event.target.value }); }
	handleAddressChange(event) { this.setState({ address: event.target.value }); }
	handleMessageChange(event) { this.setState({ message: event.target.value }); }

	showForm() {
		return (
		 	<form id="form" className="topBefore" >
				<h3 className="receiving-person">Person who's receiving:</h3>
				<input id="name" type="text" placeholder="Name" name="name" value={this.state.name} onChange={ this.handleNameChange.bind(this) }/>
			 	<input id="cell-number" type="number" placeholder="Cell Number" name="cellNumber" value={this.state.phoneNumber} onChange={ this.handlePhoneChange.bind(this) } />
			 	<input id="Address" type="text" placeholder="Address i.e 4510 6th Avenue Brooklyn Ny 11220" name="address" value={this.state.address} onChange={ this.handleAddressChange.bind(this) } />
			 	<textarea id="message" type="text" placeholder="Message" name="textarea" value={this.state.message} onChange={ this.handleMessageChange.bind(this) } ></textarea> 
  
			</form>
		)
	}*/

	getFormData(data) {

		console.log("Data from RecipientForm: " + data.name);

/*		this.setState({
			name: data.name,
			phoneNumber: data.phoneNumber,
			address: data.address,
			message: data.message
		});*/

		this.state.paymentStatus ? this.sendOrderInformation(data) : console.log("I cant make an api call yet!")

	}


	showStatus() {
		console.log("PaymentStatus: " + this.state.paymentStatus);

		return ( this.state.paymentStatus === true ? <h1>Works! </h1> : <h1>False</h1>  );
	}

	//Gets payment status true or false from stripe checkout
	getPaymentStatus(status) {
		console.log("Payment Successfull: " + status);

		this.setState({ paymentStatus: status, clicked: status })

		// console.log("this.state.clicked: " + this.state.clicked);


		// this.sendOrderInformation();
	}

	//Will make an api call to save order information
	sendOrderInformation(data) {
		/*const name = this.state.name;
		const phoneNumber = this.state.phoneNumber;
		const address = this.state.address;
		const message = this.state.message;*/
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
				name: data.name,
				phoneNumber: data.phoneNumber,
				address: data.address,
				message: data.message,
				status: status,
				total: total
			})
		})
		.then(( repoonse ) => {
			return repoonse.json()
		})
		.catch( error => console.log("Error: " + error));

		this.setState({ sentOrderInformation: true })

	}//end if sendOrderInformation

	selectDelivery(event) {
		console.log("Delivery: " + event.target.innerText);

		this.setState({ delivery: true })
	}

	selectPickUp(event) {
		console.log("Delivery: " + event.target.innerText);

		this.setState({ delivery: false })

	}

	showMode() {
		if(this.state.sentOrderInformation) {
			return (
				<div className="order-confirmation-section">

					<h1>Than you, your order has been submitted!</h1>

					<h3>If you have any question please call us at 347-609-8884 (hablamos español).</h3>

				</div>

			)
		} else {
			return (
				<div>
					<div className="current-items">
						{ this.showItems() }
					</div>

					<div className="message-area">

						<button className="delivery" onClick={ this.selectDelivery.bind(this) }>Delivery</button>
						<button className="pick-up" onClick={ this.selectPickUp.bind(this) }>Pick Up</button>

						<RecipientForm 
							delivery={this.state.delivery} 
							clicked={this.state.clicked}
							paymentStatus={this.state.paymentStatus}
							getFormData={ this.getFormData.bind(this) }
						/>
						

					</div>

					<div className="total">

						<h3>Your total is: { this.state.total } </h3>

						{ /*this.showStatus()*/ }

					</div>

					<div className="payment-section">
						
						{/*<h2>Payment Information</h2>*/}

						<Checkout 
							name={'Sweetness'}
							description={'Thanks <3'}
							amount={this.state.total}
							currency="USD"
							// className="StripeCheckout2"
							// paymentConfirmation={'false'}

							showPayButton={ this.state.showPayButton }
							paymentStatus={ this.getPaymentStatus.bind(this) }
						/>
					</div>
				</div>
			)
		} 
	}




	render() {
		return (
			<div className="checkout-section">

				<button className="back-to-shopping" onClick={ () => { this.props.getMode("buying") }} >Back to shopping</button>

				{ this.showMode() }




				{/*</Checkout>*/}

				{/*<button onClick={ () => { this.placeOrder() } } className="place-order-button">Place Order</button>*/}

			</div>
		);
	}
}

export default CheckOut;