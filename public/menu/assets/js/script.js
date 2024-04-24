// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";
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

const toggleBtn = document.querySelector(".toggle_btn");
const toggleBtnIcon = document.querySelector(".toggle_btn i");
const dropDownMenu = document.querySelector(".dropdown_menu");

const formOpenExplore = document.querySelector("#open-form");

const formOpenbtn = document.querySelector("#form-open");
const formOpenbtn1 = document.querySelector("#form-open1"),
home = document.querySelector(".home"),
formContainer = document.querySelector(".form-container"),
formClosebtn = document.querySelector(".form_close"),
pwShowHide = document.querySelectorAll(".pw_hide");

formOpenbtn.addEventListener("click", () => home.classList.add("show"))
formOpenbtn1.addEventListener("click", () => home.classList.add("show"))
formClosebtn.addEventListener("click", () => home.classList.remove("show"))

pwShowHide.forEach(icon => {
  icon.addEventListener("click", () => {
    let getPwInput = icon.parentElement.querySelector("input");
    if (getPwInput.type === "password") {
      getPwInput.type = "text";
      icon.classList.replace("uil-eye-slash", "uil-eye");
    }else{
      getPwInput.type = "password";
      icon.classList.replace("uil-eye", "uil-eye-slash");
    }
  })
});

  let usrNameInp = document.getElementById('userName');
  let usrConfirmPasswordInp = document.getElementById('conPassword');
  let SignUpForm = document.getElementById('signUpForm');
  let signupBtn = document.getElementById('signUpBtn');
  let loginBtn = document.getElementById('loginBtn');

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

  // Logout Function
  let logOutBtn = document.getElementById('logoutBtn');
  logOutBtn.addEventListener("click" , function(e) {
    e.preventDefault();

    signOut(auth).then(() => {
      console.log('Sign-out successful.');
      window.location.href = "../index.html";
      hideLoginBtn.style.display = "block";
      logout.style.display = "none";
    }).catch((error) =>{
      console.log('An error happened.');
    })
  })
  
  // signupBtn.addEventListener("click", function () {
  //   let usrEmailInp = document.getElementById('userEmail').value;
  //   let usrPasswordInp = document.getElementById('userPassword').value;
  //   formContainer.classList.remove("active")
  //   createUserWithEmailAndPassword(auth,usrEmailInp,usrPasswordInp).then((userCredential) =>{
  //     const user = userCredential.user;
  //     console.log(user);
  //     alert("Registration Successfully!");
  //   })
  //   .catch((error) =>{
  //     const errorCode = error.code;
  //     const errorMessage = error.message;

  //     console.log(errorMessage);
  //     alert(error);
  //   });
  // });

  // Login function
  loginBtn.addEventListener("click", function (e) {
    e.preventDefault();
    let usrEmailInp = document.getElementById('userLogEmail').value;
    let usrPasswordInp = document.getElementById('userLogPassword').value;
    let loginForm = document.getElementById('loginForm');

    signInWithEmailAndPassword(auth,usrEmailInp,usrPasswordInp)
    .then((userCredential) =>{
      const user = userCredential.user;
      loginForm.reset();
      home.classList.remove("show")
      console.log(user);
      alert(user.email + "Login Successfully!");
    })
    .catch((error) =>{
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
      alert(errorMessage);
    });
  });

  // Showing Popup in Development
  signupBtn.addEventListener("click", function () {
    alert("Web is still in development. Registration is restricted.");
  });

  // loginBtn.addEventListener("click", function () {
  //   alert("Web is still in development. Login/Registration is restricted.");
  // });
  
/**
 * navbar toggle
 */

// Sticky Navigation Menu JS Code
let nav = document.querySelector("header");
window.onscroll = function() {
  if(document.documentElement.scrollTop > 20){
    nav.classList.add("sticky");
  }else{
    nav.classList.remove("sticky");
  }
}