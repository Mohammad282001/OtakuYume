// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

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

function showMessage(message, divId) {
    let messageDiv = document.getElementById(divId);
    messageDiv.style.display = "block";
    if(message === "Account created successfully"){
        messageDiv.style.color="green";

    }
    messageDiv.innerHTML = message;
    messageDiv.style.opacity = 1;
    setTimeout(function () {
        messageDiv.style.opacity = 0;
        messageDiv.style.display = "none";
    }, 5000);
}

// Sign Up Functionality
const signUp = document.getElementById("submitSignUp");
signUp.addEventListener('click', (event) => {
    event.preventDefault();

    const email = document.getElementById("signUpEmail").value;
    const password = document.getElementById("signUpPassword").value;
    const name = document.getElementById("signUpName").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (!name) {
        showMessage("Name is required", "signUpMessage");
        return;
    }

    if (password !== confirmPassword) {
        showMessage("Passwords do not match", "signUpMessage");
        return;
    }

    const auth = getAuth();
    const db = getFirestore();

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            const userData = {
                email: email,
                name: name
            };

            showMessage("Account created successfully", "signUpMessage");
            const docRef = doc(db, "users", user.uid);
            setDoc(docRef, userData)
                .then(() => {
                    window.location.href = "login.html";
                })
                .catch((error) => {
                    console.error("Error writing document: ", error);
                    showMessage("Error writing document: " + error.message, "signUpMessage");
                });
        })
        .catch((error) => {
            console.error("Error creating user: ", error);
            const errorCode = error.code;
            if (errorCode == 'auth/email-already-in-use') {
                showMessage("Email Address Already Exists !!", "signUpMessage");
            } else {
                showMessage("Unable to create user: " + error.message, "signUpMessage");
            }
        });
});
