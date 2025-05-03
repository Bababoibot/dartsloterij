// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBkzKQV21QWS1gRTdaRlFQwjznkBuTl8_Y",
  authDomain: "dartsblok-61aff.firebaseapp.com",
  projectId: "dartsblok-61aff",
  storageBucket: "dartsblok-61aff.firebasestorage.app",
  messagingSenderId: "49756446283",
  appId: "1:49756446283:web:75783060094e08732a77ce"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const database = firebase.database(app);

// Firebase reference for the dartboard
const boardRef = database.ref('dartboard');

// Function to handle box purchase
function buyBox(boxId, name) {
    const box = document.getElementById(boxId);

    // If the box is already sold, prevent purchasing
    if (box.classList.contains("sold")) {
        alert("This box has already been purchased!");
        return;
    }

    // Save the name of the buyer in Firebase
    boardRef.child(boxId).set({ name: name });

    // Update the UI immediately (mark the box as sold)
    box.classList.add("sold");
    box.innerText = `${box.innerText} (Bought by: ${name})`;
}

// Listen for updates in Firebase
boardRef.on('value', (snapshot) => {
    const data = snapshot.val();
    if (data) {
        // Loop through all boxes and update the UI
        for (let boxId in data) {
            const box = document.getElementById(boxId);
            if (data[boxId]) {
                box.classList.add("sold"); // Mark the box as sold
                box.innerText = `${box.innerText} (Bought by: ${data[boxId].name})`;
            }
        }
    }
});
