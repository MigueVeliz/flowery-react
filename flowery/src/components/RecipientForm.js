import React, { Component } from 'react';


class RecipientForm extends Component {

	constructor() {
		super()

		this.state = {
			name: "",
			phoneNumber: "",
			address: "",
			message: "",
		}
	}


	//Getting From Data
	handleNameChange(event) { this.setState({ name: event.target.value }); }
	handlePhoneChange(event) { this.setState({ phoneNumber: event.target.value }); }
	handleAddressChange(event) { this.setState({ address: event.target.value }); }
	handleMessageChange(event) { this.setState({ message: event.target.value }); }

	showDeliverySection() {

		return (
		 	<form id="form" className="topBefore" >
				<h3 className="receiving-person">Recipient Information:</h3>
				<input id="name" type="text" placeholder="Name" name="name" value={this.state.name} onChange={ this.handleNameChange.bind(this) }/>
			 	{/*<input id="email" type="text" placeholder="E-mail" />*/}
			 	<input id="cell-number" type="number" placeholder="Cell Phone Number" name="cellNumber" value={this.state.phoneNumber} onChange={ this.handlePhoneChange.bind(this) } />
			 	<input id="Address" type="text" placeholder="Address i.e 4510 6th Avenue Brooklyn Ny 11220" name="address" value={this.state.address} onChange={ this.handleAddressChange.bind(this) } />
			 	<textarea id="message" type="text" placeholder="Message" name="textarea" value={this.state.message} onChange={ this.handleMessageChange.bind(this) } ></textarea> 
	  			{/*<input className="place-order-button" id="submit" type="submit" value="GO!" />*/}
  
			</form>
		)
	}

	showPickUpSection() {
		return (
			<div className="delivery-section">
				<h3>Please pick up your item at 5008 4th Avenue Brooklyn New York 11230 </h3>
				<h5>Call us at 347-609-8884 if you have any questions(hablamos español!).</h5>
			</div>
		)
	}

	showMode() {
		console.log("clicked:" + this.props.clicked);

		return ( this.props.delivery ? this.showDeliverySection() : this.showPickUpSection() );

	}

	sendDataBacktoCheckout() {

		const formData = this.state;

		// this.props.clicked ? this.props.getFormData(formData) : "";

		this.props.getFormData(formData);

		console.log("clicked:" + this.props.clicked);
		console.log("Running: sendDataBacktoCheckout and sending this data:" + this.state );
	}


	render() {
		return (
			<div className="checkout-section">

				{ this.showMode() }

				{ /*this.props.clicked ? this.sendDataBacktoCheckout() : ""*/ }
				{ this.props.clicked ? this.props.getFormData(this.state) : console.log(this.state) }

			</div>
		);
	}
}

export default RecipientForm;