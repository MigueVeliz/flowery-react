import React, { Component } from 'react';


class MainContainer extends Component {
	constructor() {
		super()

		this.state = {
		}
	}

	showCurrentProduct() {

		//let product = this.props.currentProduct

		return(
			<div className = "current-product-container">
				{/*<img className="main-image" src="https://image.ibb.co/ckzAbw/postada_de_la_pagina.jpg" alt="postada_de_la_pagina" border="0" />*/}
				{/*<img src = { product.image } alt=""/>*/}
				
{/*				<button onClick={ () => { this.props.addItemToCart(product) } }>Add to cart</button>

				<div className="current-product-info">
					<p> { product.name }</p>
					<p> ${ product.price }</p>
					<p> { product.description }</p>
					<p> <i>Product ID: { product.id } </i></p>
				</div>*/}

				{/*<button onClick={ () => { this.sendData() } }> Send Data</button>*/}

			</div>
		)
	}

	show3OnSaleItems() {
		return (
			<div className="onSaleItems">
				<div className="onSaleItem1">
					<img src="https://image.ibb.co/gU9RGw/Item_On_Sale1.jpg" alt="Item_On_Sale1" />
				</div>
				<div className="onSaleItem2">
					<img src="https://image.ibb.co/nsgHOb/Item_On_Sale2.jpg" alt="Item_On_Sale2" />
				</div>
				<div className="onSaleItem3">
					<img src="https://image.ibb.co/fboWib/Item_On_Sale3.jpg" alt="Item_On_Sale3" />
				</div>
			</div>
		)
	}

	sendData() {

		const data = {
		// id: "3",
		name: "Brochetas 3 pzas",
		price: 6.00,
		image: "https://image.ibb.co/fdj4UG/brochetas.jpg",
		description: "brochetas de bonbones y fresas cubiertas de chocolate blanco y negro"
		}

  		fetch('https://quiet-thicket-12667.herokuapp.com/', {
    		method: 'post',
    		body: JSON.stringify(data),
    		/*headers: {
      		'Accept': 'application/json',
      		'Content-Type': 'application/json'
    		}*/
  		})
    	.then(()=>console.log('updated!!!') )
    	.catch( error => console.log("Error: " + error))
	}



	render(){
		return (
			<div className = "main-container">
				{ this.showCurrentProduct() }
				{/* this.show3OnSaleItems() */}
			</div>
		)
	}

}

export default MainContainer;