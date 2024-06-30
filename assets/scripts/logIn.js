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
    messageDiv.innerHTML = message;
    messageDiv.style.opacity = 1;
    setTimeout(function () {
        messageDiv.style.opacity = 0;
        messageDiv.style.display = "none";
    }, 5000);
}

// Sign In Functionality
const signIn = document.getElementById("submitLogin");
signIn.addEventListener("click", (event) => {
    event.preventDefault();
    const email = document.getElementById("signInEmail").value;
    const password = document.getElementById("signInPassword").value;
    const auth = getAuth();

    // Debugging step: Ensure email and password are captured correctly
    console.log("Attempting to sign in with Email:", email);
    console.log("Password:", password);

    if (!email || !password) {
        showMessage("Please fill out both fields", "loginMessage");
        return;
    }
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log("Sign in successful:", userCredential.user);  // Debugging step

            showMessage("Login is successful", "loginMessage");
            const user = userCredential.user;
            
            sessionStorage.setItem("userID", user.uid);
            // getUserName(user.uid);
            window.location.href = "../index.html"; // Change this to the correct redirection page
        })
        .catch((error) => {
            console.error("Error signing in: ", error);
            const errorCode = error.code;
            if (errorCode === "auth/wrong-password") {
                showMessage("Incorrect Password", "loginMessage");
            } else if (errorCode === "auth/user-not-found") {
                showMessage("Account does not exist", "loginMessage");
            } else {
                showMessage("Unable to sign in: " + error.message, "loginMessage");
            }
        });
});
// async function getUserName(userId) {
//     const userDocRef = doc(db, "users", userId);

//     getDoc(userDocRef).then(async (docSnap) => {
//         if (docSnap.exists()) {
//             const userData =await docSnap.data();
//             const userName=await userData.name;
//             console.log(docSnap.data())
//             sessionStorage.setItem("fuckingName" ,userName);
//         } else {
//             console.log("No such document!");
//         }
//     }).catch((error) => {
//         console.log("Error getting document:", error);
//     });
// }


// userDashboard.html


// Function to check if the referrer is from the same origin
