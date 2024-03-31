import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getFunctions, httpsCallable } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-functions.js";
import { getDatabase, get, set, ref } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-database.js";
import { getAuth, fetchSignInMethodsForEmail, createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";

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

  const app = initializeApp(firebaseConfig);
  const db = getDatabase(app);
  const auth = getAuth(app);
  const functions = getFunctions(app);

  let usrNameInp = document.getElementById('userName');
  
  
  let usrConfirmPasswordInp = document.getElementById('conPassword');
  let SignUpForm = document.getElementById('signUpForm');
  let signupBtn = document.getElementById('signUpBtn');
  let loginBtn = document.getElementById('loginBtn');
  let logOutBtn = document.getElementById('logoutBtn');

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

  loginBtn.addEventListener("click", function (e) {
    e.preventDefault();
    let usrEmailInp = document.getElementById('userLogEmail').value;
    let usrPasswordInp = document.getElementById('userLogPassword').value;
    
    signInWithEmailAndPassword(auth,usrEmailInp,usrPasswordInp)
    .then((userCredential) =>{
      const user = userCredential.user;
      console.log(user);
      alert(user.email + "Login Successfully!");
      window.location.href = "../menu/index.html";
    })
    .catch((error) =>{
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
      alert(errorMessage);
    });
  });

  logOutBtn.addEventListener("click",function(){
    signOut(auth).then(() => {
      console.log('Sign-out successful.');
      alert('Sign-out successful.');
    }).catch((error) =>{
      console.log('An error happened.');
      alert('An error happened.');
    })
  })

  // Showing Popup in Development
  signupBtn.addEventListener("click", function () {
    alert("Web is still in development. Registration is restricted.");
  });

  // loginBtn.addEventListener("click", function () {
  //   alert("Web is still in development. Login/Registration is restricted.");
  // });

  const adminForm = document.querySelector('.admin-actions');
  adminForm.addEventListener('submit', (e) =>{
    e.preventDefault();
    const adminEmail = document.querySelector('#admin-email').value;
    const addAdminRole = functions.httpsCallable('addAdminRole');
    addAdminRole({email: adminEmail}).then(result => {
      console.log(result);
    }).catch((error) =>{
      console.log(error)
    })
  });