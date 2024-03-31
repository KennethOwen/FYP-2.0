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

const functions = require("firebase-functions");
const admin =  require("firebase-admin");
admin.initializeApp(firebaseConfig);

exports.addAdminRole = functions.https.onCall((data,context) => {
    //get user email and add custom claim (admin) 
    return admin.auth().getUserByEmail(data.email).then(user => {
        return admin.auth().setCustomUserClaims(user.uid, {
            admin: true 
        });
    }).then(() => {
        return {
            message: `Success! ${data.email} has been made an admin`
        }
    }).catch(error => {
        return error;
    });
});