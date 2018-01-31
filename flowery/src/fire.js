import firebase from 'firebase';

// Initialize Firebase
const config = {
	apiKey: "AIzaSyAqbAQ2bzUYTQ2EgpNRjguCn8BfCTBa_mM",
	authDomain: "sweetness-ba109.firebaseapp.com",
	databaseURL: "https://sweetness-ba109.firebaseio.com",
	projectId: "sweetness-ba109",
	storageBucket: "",
	messagingSenderId: "737655331716"
};
firebase.initializeApp(config);

export default firebase;