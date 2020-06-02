importScripts('https://www.gstatic.com/firebasejs/7.7/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.7/firebase-messaging.js');
firebase.initializeApp({
    apiKey: "AIzaSyAfZVMedTtuMA9_qmd2TKEnrw1yRjMKM-k",
    authDomain: "ulearn-messaging.firebaseapp.com",
    databaseURL: "https://ulearn-messaging.firebaseio.com",
    projectId: "ulearn-messaging",
    storageBucket: "ulearn-messaging.appspot.com",
    messagingSenderId: "337020238261",
    appId: "1:337020238261:web:76827289f845885c9001fc",
    measurementId: "G-F360NFPHCL"
});
const messaging = firebase.messaging();