import React, { Component } from 'react';

class Footer extends Component {
	render() {
		return (
			<div className="footer">
				<p>sweetness &copy; 2017</p>
				<div className="social-media" >
					<a href="https://www.facebook.com/Flowery.ny" aria-hidden="true"><i className="fa fa-facebook my-icon" aria-hidden="true"></i></a>
					<a href="https://www.instagram.com/flowery.ny" aria-hidden="true"><i className="fa fa-instagram my-icon" aria-hidden="true"></i></a>

				</div>
			</div>
		);
	}

};



export default Footer;