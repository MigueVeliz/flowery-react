import React, { Component } from 'react'


class Sidebar extends Component {

	displayProducts() {
		let products = this.props.products

		return products.map((product, index) => {
			return (
				<div className = "single-product" key = { index } >
					<ul>
						<li> <img className = "image" src = { product.image } alt="hahaha" /> </li>
						<li className = "product-name" > { product.name } </li>
						<li className = "product-description"> { product.description} </li>
						<li className = "product-price"> ${ product.price } </li>
					</ul>
					<button className="add-to-cart-button" onClick = { () => { this.props.addItemToCart(product) } }>Add to Cart</button>
				</div>
			)
		})
	}


	render(){
		return (
			<div className = "sidebar">
				{ this.displayProducts() }
			</div>


		)
	}

}

export default Sidebar;