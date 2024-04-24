// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getDatabase, ref, set , onValue } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-database.js";
import { getAuth, fetchSignInMethodsForEmail, createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";
import { getFunctions, httpsCallable } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-functions.js";
import { ref, set , onValue} from "firebase/database";
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
  const database = getDatabase(app);

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

  set(ref(database, 'users/' + contactInfoV), {
    Location: locationV,
    Description: descriptionV,
    Amenities: amenitiesV,
    Pricing: pricingV,
    ContactInfo: contactInfoV,
  }).then(() => {
    alert("Data Inserted");
    document.getElementById("location").value = "";
    document.getElementById("desc").value = "";
    document.getElementById("amenities").value = "";
    document.getElementById("pricing").value = "";
    document.getElementById("contact").value = "";
  }).catch((error) => {
    console.error("Error inserting data: ", error);
    alert("Error inserting data");
  });
};

document.getElementById("read").onclick = function () {
  readFom();

  const capVal = ref(database,'users/' + contactInfoV);
  onValue(capVal, (snap) => {
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