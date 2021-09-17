// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/6.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/6.2.0/firebase-messaging.js');

// Firebase-config retrieved from the Firebase-console
// const firebaseConfig = {
//   apiKey: "AIzaSyByjlDwckBlKpMJR4zFoIafg5iD6w_o_r8",
//   authDomain: "egora-c3717.firebaseapp.com",
//   databaseURL: "https://egora-c3717.firebaseio.com",
//   projectId: "egora-c3717",
//   storageBucket: "egora-c3717.appspot.com",
//   messagingSenderId: "120240781472",
//   appId: "1:120240781472:web:8bfc9a565278f48e9f31c5"
// };
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

firebase.initializeApp(firebaseConfig);

//FCM Reference
const messaging = firebase.messaging();

// Enable background messaging handler
messaging.setBackgroundMessageHandler(function (payload) {
	console.log("Message received in background. ", payload);

	// Retrieve data from the notification
	var notification = JSON.parse(payload.data.notification);
	const notificationTitle = notification.title;
	const notificationOptions = {
		body: notification.body,
		icon: "/webapp/" + notification.icon
	};

	// Show the notification with the params
	return self.registration.showNotification(notificationTitle,
		notificationOptions);
});
