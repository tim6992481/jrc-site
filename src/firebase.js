import { initializeApp } from "firebase/app";
import { getDatabase, ref, runTransaction, get } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyAMzZ544Ep4siqAyI8hxSXTIpWb71BlYiA",
    authDomain: "club-site-e4a69.firebaseapp.com",
    projectId: "club-site-e4a69",
    databaseURL: "https://club-site-e4a69-default-rtdb.firebaseio.com",
    storageBucket: "club-site-e4a69.firebasestorage.app",
    messagingSenderId: "221451650401",
    appId: "1:221451650401:web:a38b7cdb7283b072463120",
    measurementId: "G-T1KBD2XX5C",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db, runTransaction };
