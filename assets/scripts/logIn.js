// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
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

function showMessage(message, divId) {
    let messageDiv = document.getElementById(divId);
    messageDiv.style.display = "block";
    if(message === "Login is successful"){
        messageDiv.style.color="green";
    }
    messageDiv.innerHTML = message;
    messageDiv.style.opacity = 1;
    setTimeout(function () {
        messageDiv.style.opacity = 0;
        messageDiv.style.display = "none";
    }, 5000);
}

// Sign In Functionality
const signIn = document.getElementById("submitLogin");
signIn.addEventListener("click", async (event) => {
    const email = document.getElementById("signInEmail").value;
    const password = document.getElementById("signInPassword").value;

    if (!email || !password) {
        showMessage("Please fill out both fields", "loginMessage");
        return;
    }

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        showMessage("Login is successful", "loginMessage");

        const user = userCredential.user;
        sessionStorage.setItem("userID", user.uid);
        await getUserName(user.uid);
        window.location.href = "../index.html"; // Change this to the correct redirection page
    } catch (error) {
        console.error("Error signing in: ", error);
        const errorCode = error.code;

        if (errorCode === "auth/wrong-password") {
            showMessage("Incorrect Password", "loginMessage");
        } else if (errorCode === "auth/user-not-found") {
            showMessage("Account does not exist", "loginMessage");
        } else if (errorCode === "auth/invalid-email") {
            showMessage("Invalid Email Address", "loginMessage");
        } else if (errorCode === "auth/user-disabled") {
            showMessage("User Disabled", "loginMessage");
        } else {
            showMessage("Incorrect email or password " ,  "loginMessage");
        }
    }
});



async function getUserName(userId) {
    try {
        const userDocRef = doc(db, "users", userId);
        const docSnap = await getDoc(userDocRef);
        if (docSnap.exists()) {
            const userData = docSnap.data();
            const userName = userData.name;
            console.log("User data:", userData);
            sessionStorage.setItem("userName", userName);
        } else {
            console.log("No such document!");
        }
    } catch (error) {
        console.log("Error getting document:", error);
    }
}