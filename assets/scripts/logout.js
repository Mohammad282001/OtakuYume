// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCgZqudeO2G3iUjEPxEN3-LAQLgEb8fj-Y",
  authDomain: "login-d7fa6.firebaseapp.com",
  projectId: "login-d7fa6",
  storageBucket: "login-d7fa6.appspot.com",
  messagingSenderId: "173328832338",
  appId: "1:173328832338:web:47fe64ddb03b771cd04c8b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // Initialize Firestore
const auth = getAuth();

const logoutButton = document.getElementById('logout');

logoutButton.addEventListener('click', () => {
  sessionStorage.removeItem('userID');
  signOut(auth)
    .then(() => {
      window.location.href = '../index.html';
    })
    .catch((error) => {
      console.error('Error signing out:', error);
    });
});
