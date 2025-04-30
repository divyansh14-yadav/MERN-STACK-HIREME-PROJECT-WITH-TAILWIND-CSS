// // public/firebase-messaging-sw.js

// importScripts('https://www.gstatic.com/firebasejs/9.6.1/firebase-app-compat.js');
// importScripts('https://www.gstatic.com/firebasejs/9.6.1/firebase-messaging-compat.js');

// firebase.initializeApp({
//     apiKey: "AIzaSyCLYIbI4NmZ1oU42LI103wBr1EEJ4bDHjY",
//     authDomain: "hireme-9b46b.firebaseapp.com",
//     projectId: "hireme-9b46b",
//     storageBucket: "hireme-9b46b.firebasestorage.app",
//     messagingSenderId: "755848707643",
//     appId: "1:755848707643:web:3c4e86c5c25d269d37a61e",
//     measurementId: "G-XY4HLZHSFE"
// });

// const messaging = firebase.messaging();


importScripts("https://www.gstatic.com/firebasejs/10.11.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.11.0/firebase-messaging-compat.js");
firebase.initializeApp({
  apiKey: "AIzaSyCLYIbI4NmZ1oU42LI103wBr1EEJ4bDHjY",
  authDomain: "hireme-9b46b.firebaseapp.com",
  projectId: "hireme-9b46b",
  storageBucket: "hireme-9b46b.firebasestorage.app",
  messagingSenderId: "755848707643",
  appId: "1:755848707643:web:3c4e86c5c25d269d37a61e",
});
const messaging = firebase.messaging();
messaging.onBackgroundMessage(function (payload) {
  console.log(":envelope_with_arrow: Background message received: ", payload);
  const { title, body } = payload.notification;
  self.registration.showNotification(title, {
    body,
    icon: "/logo192.png",
  });
});