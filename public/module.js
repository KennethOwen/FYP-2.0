// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-database.js";
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

    user.getIdTokenResult().then(idTokenResult => {
      // Confirm the user is an Admin.
     if (!!idTokenResult.claims.admin) {
      // Show admin UI.
      console.log("This will go to admin UI");
      window.location.href = "../admin/index.html";
    } else {
      // Show regular user UI.
      console.log("This will go to normal user UI");
      window.location.href = "../menu/index.html";
    }
      //user.admin = idTokenResult.claims.admin;
    })
  })

  // // Make registered user admin
  // const adminForm = document.querySelector('.admin-actions');
  // adminForm.addEventListener('submit', (e) =>{
  //   e.preventDefault();
  //   const adminEmail = document.querySelector('#admin-email').value;
  //   const addAdminRole = httpsCallable(functions,'addAdminRole');
  //   addAdminRole({email: adminEmail}).then(result => {
  //     console.log(result);
  //   }).catch((error) =>{
  //     console.log(error)
  //   })
  // });

  // Sign up Function
  signupBtn.addEventListener("click", function () {
    let usrEmailInp = document.getElementById('userEmail').value;
    let usrPasswordInp = document.getElementById('userPassword').value;
    formContainer.classList.remove("active")
    createUserWithEmailAndPassword(auth,usrEmailInp,usrPasswordInp).then((userCredential) =>{
      const user = userCredential.user;
      console.log(user);
      alert("Registration Successfully!");
    })
    .catch((error) =>{
      const errorCode = error.code;
      const errorMessage = error.message;

      console.log(errorMessage);
      alert(error);
    });
  });

  // Login function
  loginBtn.addEventListener("click", function (e) {
    e.preventDefault();
    let usrEmailInp = document.getElementById('userLogEmail').value;
    let usrPasswordInp = document.getElementById('userLogPassword').value;
    let btnLogout = document.querySelector(".action_btn");
    let logout = document.querySelector(".logout");

    signInWithEmailAndPassword(auth,usrEmailInp,usrPasswordInp)
    .then((userCredential) =>{
      const user = userCredential.user;
      console.log(user);
      alert(user.email + "Login Successfully!");
      //window.location.href = "../menu/index.html";
    })
    .catch((error) =>{
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
      alert(errorMessage);
    });
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
  let locationV, descriptionV, amenitiesV, pricingV, contactInfoV;

function readFom() {
  let locationV = document.getElementById("location").value;
  let descriptionV = document.getElementById("desc").value;
  let amenitiesV = document.getElementById("amenities").value;
  let pricingV = document.getElementById("pricing").value;
  let contactInfoV = document.getElementById("contact").value;
  console.log(locationV, descriptionV, amenitiesV, pricingV, contactInfoV);
}

document.getElementById("insert").onclick = function () {
  readFom();

    set(ref(db,"menuList/" + contactInfoV),{
      Location: locationV,
      Descripton: descriptionV,
      Amenities: amenitiesV,
      Pricing: pricingV,
      ContactInfo: contactInfoV,
    }) 
  alert("Data Inserted");
  document.getElementById("location").value = "";
  document.getElementById("desc").value = "";
  document.getElementById("amenities").value = "";
  document.getElementById("pricing").value = "";
  document.getElementById("contact").value = "";
};

document.getElementById("read").onclick = function () {
  readFom();

  db
    .database()
    .ref("menuList/" + contactInfoV)
    .on("value", function (snap) {
      document.getElementById("location").value = snap.val().rollNo;
      document.getElementById("desc").value = snap.val().name;
      document.getElementById("amenities").value = snap.val().gender;
      document.getElementById("pricing").value = snap.val().address;
      document.getElementById("contact").value = snap.val().address;
    });
};

document.getElementById("update").onclick = function () {
  readFom();

  db
    .database()
    .ref("menuList/" + contactInfoV)
    .update({
        Location: locationV,
        Descripton: descriptionV,
        Amenities: amenitiesV,
        Pricing: pricingV,
        // ContactInfo: contactInfoV,
    });
  alert("Data Update");
  document.getElementById("location").value = "";
  document.getElementById("desc").value = "";
  document.getElementById("amenities").value = "";
  document.getElementById("pricing").value = "";
  document.getElementById("contact").value = "";
};
document.getElementById("delete").onclick = function () {
  readFom();

  db
    .database()
    .ref("menuList/" + contactInfoV)
    .remove();
  alert("Data Deleted");
  document.getElementById("location").value = "";
  document.getElementById("desc").value = "";
  document.getElementById("amenities").value = "";
  document.getElementById("pricing").value = "";
  document.getElementById("contact").value = "";
};