// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js";

// ✅ Your Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyDmIMWzAx5qqlRlAu-IlJ9uIWxLCFe5J4c",
    authDomain: "vaid-pr.firebaseapp.com",
    projectId: "vaid-pr",
    storageBucket: "vaid-pr.firebasestorage.app",
    messagingSenderId: "389656243111",
    appId: "1:389656243111:web:6657f69876d1d0b792a482",
    measurementId: "G-XGN7QX33CB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);
console.log("Firebase Initialized:", app ? "Connected ✅" : "Not Connected ❌");

// 🔐 Login Function with Error Handling
document.getElementById("login-btn").addEventListener("click", function () {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let messageBox = document.getElementById("message");

    if (email === "" || password === "") {
        messageBox.innerText = "⚠️ Please enter both email and password!";
        messageBox.style.color = "yellow";
        return;
    }

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            messageBox.innerText = "✅ Login Successful!";
            messageBox.style.color = "lightgreen";
            console.log("Logged in:", userCredential.user);
        })
        .catch((error) => {
            let errorMessage = getErrorMessage(error.code);
            messageBox.innerText = `❌ ${errorMessage}`;
            messageBox.style.color = "red";
            console.error("Login Error:", error);
        });
});

// 📝 Register Function with Error Handling
document.getElementById("register-btn").addEventListener("click", function () {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let messageBox = document.getElementById("message");

    if (email === "" || password === "") {
        messageBox.innerText = "⚠️ Please enter both email and password!";
        messageBox.style.color = "yellow";
        return;
    }

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            messageBox.innerText = "✅ Account Created Successfully!";
            messageBox.style.color = "lightgreen";
            console.log("User Registered:", userCredential.user);
        })
        .catch((error) => {
            let errorMessage = getErrorMessage(error.code);
            messageBox.innerText = `❌ ${errorMessage}`;
            messageBox.style.color = "red";
            console.error("Registration Error:", error);
        });
});

// Function to handle Firebase errors
function getErrorMessage(errorCode) {
    switch (errorCode) {
        case "auth/user-not-found":
            return "User not found. Please check your email.";
        case "auth/wrong-password":
            return "Incorrect password. Try again!";
        case "auth/email-already-in-use":
            return "Email already in use. Try logging in.";
        case "auth/invalid-email":
            return "Invalid email format.";
        case "auth/weak-password":
            return "Weak password! Use at least 6 characters.";
        default:
            return "An error occurred. Please try again.";
    }
}
