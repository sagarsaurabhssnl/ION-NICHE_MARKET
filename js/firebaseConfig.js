var firebaseConfig = {
    apiKey: "AIzaSyCqW03_ljnBrRzVwGjjo9YQ1t8ClSnK_28",
    authDomain: "ion-b2ca8.firebaseapp.com",
    // authDomain: "http://127.0.0.1:5500/",
    projectId: "ion-b2ca8",
    storageBucket: "ion-b2ca8.appspot.com",
    messagingSenderId: "591982235822",
    appId: "1:591982235822:web:6056c37597b1307d9a9d3f",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();
var storage = firebase.storage().ref();