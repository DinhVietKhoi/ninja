import { initializeApp } from "firebase/app";
import {getDatabase} from 'firebase/database'

const firebaseConfig = {
    apiKey: "AIzaSyBoe61QgWFJwuPYdFfQK9RO_6SMds4ea2w",
    authDomain: "ninjaadventure-f8e73.firebaseapp.com",
    databaseURL: "https://ninjaadventure-f8e73-default-rtdb.firebaseio.com",
    projectId: "ninjaadventure-f8e73",
    storageBucket: "ninjaadventure-f8e73.appspot.com",
    messagingSenderId: "73294103036",
    appId: "1:73294103036:web:76887e3ecd28654aceb279",
    measurementId: "G-RH2XV468VE"
};

// const app = initializeApp(firebaseConfig);
// const db = getAnalytics(app);
// export default db;

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
export default db;
