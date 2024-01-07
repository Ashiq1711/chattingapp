// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDH7QMbmE7lvvRNdsVS94BTxJsqOWs0h-g",
  authDomain: "chattingapp-d547f.firebaseapp.com",
  projectId: "chattingapp-d547f",
  storageBucket: "chattingapp-d547f.appspot.com",
  messagingSenderId: "1005947479709",
  appId: "1:1005947479709:web:0b40a18360bbb736d69674",
  measurementId: "G-GKGF4C57YV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export default firebaseConfig