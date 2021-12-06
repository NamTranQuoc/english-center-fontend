import firebase from "firebase";
import "firebase/storage";

const config = {
    apiKey: "AIzaSyB2ad42eHVKxh0LZFAdft9QyNOb5c14PnI",
    authDomain: "englishcenter-2021.firebaseapp.com",
    projectId: "englishcenter-2021",
    storageBucket: "englishcenter-2021.appspot.com",
    messagingSenderId: "640196743442",
    appId: "1:640196743442:web:64e713a7b0d64571a0e3cb",
    measurementId: "G-8CSGSJ2X7C"
};
firebase.initializeApp(config);
const auth = firebase.auth();

const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
const facebookAuthProvider = new firebase.auth.FacebookAuthProvider();

const storage = firebase.storage();

export {storage, googleAuthProvider, facebookAuthProvider, auth, firebase as default};
