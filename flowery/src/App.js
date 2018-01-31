
import React, { Component } from 'react';
import './App.css';

import MainContainer from './components/MainContainer';
import Sidebar from './components/Sidebar';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import CheckOut from './components/CheckOut';
import LogIn from './components/LogIn';

import StripeCheckout from './Checkout';


require('dotenv').config();

class App extends Component {

	constructor() {
		super()

		this.state = {
			mode: "buying",
			// url: "http://localhost:8080/flowery",
			url: "https://quiet-thicket-12667.herokuapp.com/flowery",
			products: [],
			currentProduct: [],
			shoppingCartItems: [],
			paymentConfirmation: false
		}
	}

	/* Product Information is loaded as soon
	as the website loads */
	componentDidMount() {
		
		fetch(this.state.url)
		.then((response) => {
			return response.json()
		})
		.then((responseJson) => {
			console.log(responseJson)

			this.setState({
				// products: responseJson,
				products: responseJson
				// currentProduct: responseJson[0],
				// shoppingCartItems: responseJson
			});
		})
	}//end of componentDidMount

	getCurrentProduct( product ) {

		console.log("currentProduct is: ", product)

		this.setState({
			currentProduct: product
		})
	}

	// Adds a new item to shoppign cart
	addItemToCart( item ) {
		console.log("Item ID: " + item );

		this.setState({
			 shoppingCartItems: [...this.state.shoppingCartItems, item]
		});

		console.log("shoppingCartItems: " + this.state.shoppingCartItems)

	}

	// Remoe item from cart
	removeItem(id) {
		let currentItemsInCart = this.state.shoppingCartItems;

		let newItemsInCart = currentItemsInCart.filter( item => {
			return item.id !== id ? item: "";
		});

		// console.log("New Items: " + newItemsInCart);

		this.setState({
			shoppingCartItems: newItemsInCart
		})
	}

	getMode(mode) {
		this.setState({
			mode: mode
		})
	}

	storeMode() {
		let mode = this.state.mode;

		console.log("---mode---: " + mode)
  		console.log('env.NODE_ENV: ' + process.env.NODE_ENV);


		if(mode === "buying") {
			return (
				<div>
			        <NavBar 
			        	shoppingCartItems = { this.state.shoppingCartItems }
			        	getMode={ this.getMode.bind(this) }
			        />

			        <MainContainer
			        	addItemToCart = { this.addItemToCart.bind(this) } 
			        	currentProduct = { this.state.currentProduct } 
			        />
			        <Sidebar 
			        	products = { this.state.products } 
			         	
			        	addItemToCart = { this.addItemToCart.bind(this) } 

			         />
			     
			     	<Footer />

			     </div>
			)

		} else if(mode === "checkingOut") {
			return (
					<div>
						<CheckOut
							getMode = { this.getMode.bind(this) }
							shoppingCartItems = { this.state.shoppingCartItems }
							removeItem = { this.removeItem.bind(this) }
			 			/>


					</div>
			 )
		} else if(mode === "login") {
			return (
				<div>
					<LogIn 
						getMode = { this.getMode.bind(this) }

					/>
				</div>
			);
		}
	}


  render() {
    return (
      <div>
      	{ this.storeMode() }
      </div>

    );
  }
}

export default App;
