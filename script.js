
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getDatabase, ref, push, set } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyB8KiOylCaNE6iOKu5p_LJiGbQJAFyWMPo",
  authDomain: "anandam-foods-site.firebaseapp.com",
  projectId: "anandam-foods-site",
  storageBucket: "anandam-foods-site.firebasestorage.app",
  messagingSenderId: "194819480621",
  appId: "1:194819480621:web:8ea3336bf735df5ae16ca4",
  measurementId: "G-GSBYQ1FWY2",
  databaseURL: "https://anandam-foods-site-default-rtdb.firebaseio.com"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

document.getElementById("signupForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const phone = document.getElementById("phoneNumber").value;

  const signupRef = ref(database, "signups/");
  const newSignupRef = push(signupRef);

  const timestamp = new Date().toLocaleString(); 

  set(newSignupRef, {
    name: name,
    phone: phone,
    timestamp: timestamp 
  })
    .then(() => {
      alert("Thanks for signing up! You get 10% off your order.");
      document.getElementById("signupForm").reset();
    })
    .catch((error) => {
      console.error("Error saving data:", error);
      alert("Something went wrong. Try again.");
    });
});

function validatePhoneNumber(event) {
    const nameInput = document.getElementById('name');
    const phoneInput = document.getElementById('phoneNumber');
    const errorMessage = document.getElementById('phoneError');
    const phoneRegex = /^\d{3}-\d{3}-\d{4}$/; 

    if (!phoneRegex.test(phoneInput.value)) {
      errorMessage.classList.remove('hidden');
      event.preventDefault(); 
    } else {
      errorMessage.classList.add('hidden');

      sendDataToDatabase(nameInput.value, phoneInput.value);
    }
  }


  function sendDataToDatabase(name, phoneNumber) {

    const db = firebase.firestore();


    const usersRef = db.collection('users');

    usersRef.add({
      name: name,
      phoneNumber: phoneNumber
    })
    .then(() => {
      console.log("User data sent to Firestore");

      alert("Thank you for signing up!");
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
  }



  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
  
      const targetId = this.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
  
      window.scrollTo({
        top: targetElement.offsetTop - 100, 
        behavior: 'smooth',
      });
    });
  });
  