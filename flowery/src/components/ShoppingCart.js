import React, { Component } from 'react';

class ShoppingCart extends Component {

	showCheckOutButton() {
		//let items = this.props.shoppingCartItems;

		return (
			<span 
				className="check-out"
				onClick={ () => { this.props.getMode("checkingOut") } }
			></span> 
		)
	}

	render() {
		return (
			<div className="shopping-cart" onClick={ () => { this.props.getMode("checkingOut") } }>
				{/*<p>Cart</p>*/}
				<i className="fa fa-shopping-cart" aria-hidden="true"></i>
				<p>{ this.props.shoppingCartItems.length } </p>

				{ /*this.showCheckOutButton() */}
			</div>
		);
	}
}

export default ShoppingCart;