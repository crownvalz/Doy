import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";
import { getFirestore, doc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

const auth = getAuth();
const db = getFirestore();

onAuthStateChanged(auth, async (user) => {
    if (user) {
        console.log("User is signed in:", user.uid); // Log the user ID
        const userDocRef = doc(db, "users", user.uid);
        
        try {
            const docSnapshot = await getDoc(userDocRef);
            if (docSnapshot.exists()) {
                console.log("User data:", docSnapshot.data()); // Log the fetched user data
                const data = docSnapshot.data();
                document.getElementById("fullName").value = data.fullName;
                document.getElementById("email").value = data.email;
                document.getElementById("phone").value = data.phone;
                document.getElementById("address").value = data.address;
            } else {
                console.error("No such document!"); // Log if document doesn't exist
            }
        } catch (error) {
            console.error("Error fetching user data:", error); // Log any errors
        }

        document.getElementById("editProfileForm").addEventListener("submit", async (e) => {
            e.preventDefault();
            const fullName = document.getElementById("fullName").value;
            const email = document.getElementById("email").value;
            const phone = document.getElementById("phone").value;
            const address = document.getElementById("address").value;

            try {
                await updateDoc(userDocRef, {
                    fullName: fullName,
                    email: email,
                    phone: phone,
                    address: address
                });
                alert("Profile updated successfully!");
            } catch (error) {
                alert("Error updating profile: " + error.message); // Display update error
            }
        });
    } else {
        // User is signed out
        window.location = "login.html"; // Redirect to login page
    }
});