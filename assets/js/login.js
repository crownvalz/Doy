import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyBe1HYgEzdcZj0ZOgimd1ODz8B-2aztUYs",
    authDomain: "bank-operations-school.firebaseapp.com",
    projectId: "bank-operations-school",
    storageBucket: "bank-operations-school.appspot.com",
    messagingSenderId: "292213603678",
    appId: "1:292213603678:web:464bf951de870b94baa3cf"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);

// Login event
document.getElementById("loginBtn").addEventListener("click", async () => {
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    try {
        await signInWithEmailAndPassword(auth, email, password);
        window.location = "home.html"; // Redirect to home page
    } catch (error) {
        alert(error.message); // Show alert only for errors
    }
});

// Registration event
document.getElementById("registerBtn").addEventListener("click", async () => {
    const fullName = document.getElementById("registerFullName").value;
    const email = document.getElementById("registerEmail").value;
    const phone = document.getElementById("registerPhone").value;
    const password = document.getElementById("registerPassword").value;

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Save additional user info in Firestore
        await setDoc(doc(db, "users", user.uid), {
            fullName: fullName,
            email: email,
            phone: phone,
            uid: user.uid
        });

        // Reset the form
        document.getElementById("registerFormContent").reset();

        // Redirect to login form instead of home page
        document.getElementById("registerForm").classList.add("d-none");
        document.getElementById("loginForm").classList.remove("d-none");
        alert("Registration successful! Please log in.");

    } catch (error) {
        alert(error.message); // Show alert only for errors
    }
});

// Switch between login and register forms
document.getElementById("showRegister").addEventListener("click", function() {
    document.getElementById("loginForm").classList.add("d-none");
    document.getElementById("registerForm").classList.remove("d-none");
});

document.getElementById("showLogin").addEventListener("click", function() {
    document.getElementById("registerForm").classList.add("d-none");
    document.getElementById("loginForm").classList.remove("d-none");
});