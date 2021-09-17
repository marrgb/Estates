sap.ui.define([
	"sap/ui/model/json/JSONModel",
], function (JSONModel) {
	"use strict";

	// Firebase-config retrieved from the Firebase-console
	const firebaseConfig = {
  	apiKey: "AIzaSyByjlDwckBlKpMJR4zFoIafg5iD6w_o_r8",
	  authDomain: "egora-c3717.firebaseapp.com",
	  databaseURL: "https://egora-c3717.firebaseio.com",
	  projectId: "egora-c3717",
	  storageBucket: "egora-c3717.appspot.com",
	  messagingSenderId: "120240781472",
	  appId: "1:120240781472:web:24c2ebc962478e839f31c5",
	  measurementId: "G-BTL05VCJDJ"
	};

	return {
		initializeFirebase: function () {
			// Initialize Firebase with the Firebase-config
			firebase.initializeApp(firebaseConfig);

			// Create a Firestore reference
			const firestore = firebase.firestore();

			// Create a Authentication reference
			const fireAuth = firebase.auth();

			// Create the Provider
			var provider = new firebase.auth.GoogleAuthProvider();
			provider.addScope("profile");
			provider.addScope("email");

			// Create a FCM reference
			const messaging = firebase.messaging();

			// Firebase services object
			const oFirebase = {
				firestore: firestore,
				fireAuth: fireAuth,
				provider: provider,
				fcm: messaging
			};

			// Create a Firebase model out of the oFirebase service object which contains all required Firebase services
			var fbModel = new JSONModel(oFirebase);

			// Return the Firebase Model
			return fbModel;

		}
	};
});
