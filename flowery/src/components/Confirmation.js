// import React, { Component } from 'react';

/*class Confirmation extends Component {

	confirmation() {
		console.log("its working!");
		status = true;
	}

	render() {
		return (
			<div>

			</div>
		);
	}
};*/




const Confirmation = con => {
	console.log("its working!");
	status = true;
}

let status = false;


const Status = con => {
	return status;
}


// export default Confirmation;

module.exports = { Confirmation, status }