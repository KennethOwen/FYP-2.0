// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-database.js";
import { getAuth, fetchSignInMethodsForEmail, createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";
import { getFunctions, httpsCallable } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-functions.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyASZ7o84FUyhwd62Q_vc4oq_Nza67M8wBo",
  authDomain: "kjrent-e9f8f.firebaseapp.com",
  databaseURL: "https://kjrent-e9f8f-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "kjrent-e9f8f",
  storageBucket: "kjrent-e9f8f.appspot.com",
  messagingSenderId: "211941851109",
  appId: "1:211941851109:web:8031a2622a624372c5b90c"
};

// Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getDatabase(app);
  const auth = getAuth(app);
  const functions = getFunctions(app);

  let usrNameInp = document.getElementById('userName');
  let usrConfirmPasswordInp = document.getElementById('conPassword');
  let SignUpForm = document.getElementById('signUpForm');
  let signupBtn = document.getElementById('signUpBtn');
  let loginBtn = document.getElementById('loginBtn');
  let logOutBtn = document.querySelector('.logout_btn');

  let hideLoginBtn = document.querySelector(".action_btn");
  let logout = document.querySelector("#logoutBtn");

  // Check if user logged in
  auth.onAuthStateChanged(user => {

    if (user) {
      hideLoginBtn.style.display = "none";
      logout.style.display = "block";
      console.log("Logged in.");
    } else {
      logout.style.display = "none";
      console.log("User not logged in");
    }
  })

  // Make registered user admin
  const adminForm = document.querySelector('.admin-actions');
  adminForm.addEventListener('submit', (e) =>{
    e.preventDefault();
    const adminEmail = document.querySelector('#admin-email').value;
    const addAdminRole = httpsCallable(functions,'addAdminRole');
    addAdminRole({email: adminEmail}).then(result => {
      console.log(result);
    }).catch((error) =>{
      console.log(error)
    })
  });

  
  // Logout Function
  logOutBtn.addEventListener("click",function(){
    signOut(auth).then(() => {
      console.log('Sign-out successful.');
      hideLoginBtn.style.display = "block";
      logout.style.display = "none";
    }).catch((error) =>{
      console.log('An error happened.');
    })
  })

  // // Showing Popup in Development
  // signupBtn.addEventListener("click", function () {
  //   alert("Web is still in development. Registration is restricted.");
  // });

  // loginBtn.addEventListener("click", function () {
  //   alert("Web is still in development. Login/Registration is restricted.");
  // });
  