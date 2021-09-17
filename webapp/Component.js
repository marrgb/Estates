sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"./model/models",
	"./controller/ListSelector",
	"./controller/ErrorHandler",
	"./Firebase",
	"sap/m/MessageToast",
	"sap/ui/model/json/JSONModel"
], function (UIComponent, Device, models, ListSelector, ErrorHandler, Firebase,
			MessageToast, JSONModel) {
	"use strict";

	return UIComponent.extend("com.ordago.estates.Component", {

		metadata : {
			manifest : "json"
		},
		msgCount: 3,

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * In this method, the device models are set and the router is initialized.
		 * @public
		 * @override
		 */
		init : function () {
			this.oListSelector = new ListSelector();
			//this._oErrorHandler = new ErrorHandler(this);

			// set the device model
			this.setModel(models.createDeviceModel(), "device");

			// call the base component's init function and create the App view
			UIComponent.prototype.init.apply(this, arguments);

			// create the views based on the url/hash
			this.getRouter().initialize();

			// Import Firebase in the sap.ui.define
			// set the firebase model by calling the initializeFirebase function in the Firebase.js file
			this.setModel(Firebase.initializeFirebase(), "firebase");

			var msgCount = new JSONModel(3);
      this.setModel(msgCount, "msgCount");
			// AUTHENTICATION
			// Create a Fireauth reference
			const fireAuth = this.getModel("firebase").getProperty("/fireAuth");
			//var provider = new firebase.auth.GoogleAuthProvider();

			// If Sign in is successfull, then observer below with trigger
			// Get user data from the observer
			firebase.auth().onAuthStateChanged(function(user) {
				var User = new JSONModel(user);
				this.setModel(User, "User");
			  if (user) {
			    // User is signed in.
			    var uid = user.uid;

					// CLOUD MESSAGING FCM
					// Since we are logged in now we will ask the user permission to send notifications
					// Create a FCM reference
					const messaging = this.getModel("firebase").getProperty("/fcm");
					// Get registration token. Initially this makes a network call, once retrieved
					// subsequent calls to getToken will return from cache.
					messaging.getToken({ vapidKey: 'BJqKxtMq2MqpI0q81kc35jGCLPRtoGtwCoq_mKF2FnK85DcRPttqh869-frw6y6fMfmbjhxd-sjygh40yY03LgM' }).then((currentToken) => {
						if (currentToken) {
							// Send the token to your server and update the UI if necessary
							// ...
						} else {
							// Show permission request UI
							console.log('No registration token available. Request permission to generate one.');
							// ...
						}
					}).catch((err) => {
						console.log('An error occurred while retrieving token. ', err);
						// ...
					});

					//FCM ask permission
					// messaging.requestPermission().then(function () {
					// 	console.log("Have permission");
					// 	return messaging.getToken();
					// }).then(function (token) {
					// 	console.log(token);
					// }).catch(function (err) {
					// 	console.log("Error occured");
					// });

					// Show message in foreground (if desired)
					messaging.onMessage(function (payload) {
						console.log("Message received. ", payload);
						var notification = JSON.parse(payload.data.notification);
						const notificationTitle =notification.title;
						const notificationOptions = {
							body: notification.body,
							icon: notification.icon,
						};
						var notification = new Notification(notificationTitle, notificationOptions);
						return notification;
					});

					this.getRouter().navTo("home");

			  } else {
			    // User is signed out.
					var oRouter = this.getRouter();
          oRouter.navTo("notLogged");
			  }
			}.bind(this));

		},

		/**
		 * The component is destroyed by UI5 automatically.
		 * In this method, the ListSelector and ErrorHandler are destroyed.
		 * @public
		 * @override
		 */
		destroy : function () {
			this.oListSelector.destroy();
			this._oErrorHandler.destroy();
			// call the base component's destroy function
			UIComponent.prototype.destroy.apply(this, arguments);
		},

		/**
		 * This method can be called to determine whether the sapUiSizeCompact or sapUiSizeCozy
		 * design mode class should be set, which influences the size appearance of some controls.
		 * @public
		 * @return {string} css class, either 'sapUiSizeCompact' or 'sapUiSizeCozy' - or an empty string if no css class should be set
		 */
		getContentDensityClass : function() {
			if (this._sContentDensityClass === undefined) {
				// check whether FLP has already set the content density class; do nothing in this case
				// eslint-disable-next-line sap-no-proprietary-browser-api
				if (document.body.classList.contains("sapUiSizeCozy") || document.body.classList.contains("sapUiSizeCompact")) {
					this._sContentDensityClass = "";
				} else if (!Device.support.touch) { // apply "compact" mode if touch is not supported
					this._sContentDensityClass = "sapUiSizeCompact";
				} else {
					// "cozy" in case of touch support; default for most sap.m controls, but needed for desktop-first controls like sap.ui.table.Table
					this._sContentDensityClass = "sapUiSizeCozy";
				}
			}
			return this._sContentDensityClass;
		}

	});
});
