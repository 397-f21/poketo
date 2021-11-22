import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";
import "firebase/compat/firestore";
import { attachCustomCommands } from "cypress-firebase";

const fbConfig = {
    apiKey: "AIzaSyB_2BJla8QmrO6WIpANUwTfaVyDPgJeRAA",
    authDomain: "poketo-e545a.firebaseapp.com",
    projectId: "poketo-e545a",
    storageBucket: "poketo-e545a.appspot.com",
    messagingSenderId: "558062207711",
    appId: "1:558062207711:web:135e29ac172cfa81d79f6a",
    measurementId: "G-NVCY0D8YC9"
};

firebase.initializeApp(fbConfig);

attachCustomCommands({ Cypress, cy, firebase });
