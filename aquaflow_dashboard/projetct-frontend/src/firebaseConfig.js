// filepath: c:\Users\HP\OneDrive\Bureau\hackathon\projetct-frontend\src\firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
const firebaseConfig = {
    apiKey: "AIzaSyBxlF02eS6ZUDwTq4l_e6eI5ME8J1CisFA",
    authDomain: "aqwaflow.firebaseapp.com",
    projectId: "aqwaflow",
    storageBucket: "aqwaflow.firebasestorage.app",
    messagingSenderId: "942231946447",
    appId: "1:942231946447:web:88dc66de526862c87a63ba",
    measurementId: "G-SNGNSVGNQ5"
  };  

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };