import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";
import { getFirestore, doc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

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

// Fetch user profile data
onAuthStateChanged(auth, async (user) => {
    if (user) {
        const userDocRef = doc(db, "users", user.uid);
        const docSnapshot = await getDoc(userDocRef);
        if (docSnapshot.exists()) {
            const data = docSnapshot.data();
            document.getElementById("fullName").value = data.fullName || '';
            document.getElementById("email").value = data.email || '';
            document.getElementById("phone").value = data.phone || '';
            document.getElementById("address").value = data.address || '';
            document.getElementById("city").value = data.city || '';
            document.getElementById("state").value = data.state || '';
            document.getElementById("postalCode").value = data.postalCode || '';
            document.getElementById("country").value = data.country || '';
            document.getElementById("jobTitle").value = data.jobTitle || '';
            document.getElementById("company").value = data.company || '';
            document.getElementById("department").value = data.department || '';
            document.getElementById("dateOfBirth").value = data.dateOfBirth || '';
            document.getElementById("gender").value = data.gender || '';
            document.getElementById("maritalStatus").value = data.maritalStatus || '';
            document.getElementById("bio").value = data.bio || '';
        } else {
            console.error("No such document!");
        }

        document.getElementById("editProfileForm").addEventListener("submit", async (e) => {
            e.preventDefault();
            const fullName = document.getElementById("fullName").value;
            const email = document.getElementById("email").value;
            const phone = document.getElementById("phone").value;
            const address = document.getElementById("address").value;
            const city = document.getElementById("city").value;
            const state = document.getElementById("state").value;
            const postalCode = document.getElementById("postalCode").value;
            const country = document.getElementById("country").value;
            const jobTitle = document.getElementById("jobTitle").value;
            const company = document.getElementById("company").value;
            const department = document.getElementById("department").value;
            const dateOfBirth = document.getElementById("dateOfBirth").value;
            const gender = document.getElementById("gender").value;
            const maritalStatus = document.getElementById("maritalStatus").value;
            const bio = document.getElementById("bio").value;

            await updateDoc(userDocRef, {
                fullName,
                email,
                phone,
                address,
                city,
                state,
                postalCode,
                country,
                jobTitle,
                company,
                department,
                dateOfBirth,
                gender,
                maritalStatus,
                bio
            });
            alert("Profile updated successfully!");
        });
    } else {
        // User is signed out
        window.location = "index.html"; // Redirect to login page
    }
});

// Logout button functionality
document.getElementById("logoutBtn").addEventListener("click", async () => {
    await auth.signOut();
    window.location = "index.html"; // Redirect to login page after logout
});