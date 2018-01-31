const STRIPE_PUBLISHABLE = process.env.NODE_ENV === 'production'
	? 'pk_live_H1lmogRgoaRBXyTenfwt28BI'
	: 'pk_test_JoXjJ7TyPo7CHwpA2rB5och0';

export default STRIPE_PUBLISHABLE;