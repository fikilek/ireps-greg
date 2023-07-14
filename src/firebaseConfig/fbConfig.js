// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { Timestamp } from "firebase/firestore";
import { getFunctions } from "firebase/functions";

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyBrhOJvgya120Iv8-0fkn22kTjaDlTq2B0",
	authDomain: "fkproj1-8415a.firebaseapp.com",
	databaseURL: "https://fkproj1-8415a.firebaseio.com",
	projectId: "fkproj1-8415a",
	storageBucket: "fkproj1-8415a.appspot.com",
	messagingSenderId: "108173435093",
	appId: "1:108173435093:web:f3d561077c79fa6ddc425c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialise firestore
export const db = getFirestore(app);



// Iniitialise firebase auth
export const auth = getAuth(app);

// initialize firebase storage
export const storage = getStorage(app);

//export firestore Timestamp
export const timestamp = Timestamp;

// iitialise functions
export const functions = getFunctions(app)
