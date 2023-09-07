// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {
	// initializeFirestore,
	getFirestore,
	// persistentLocalCache,
	// persistentSingleTabManager,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { Timestamp } from "firebase/firestore";
import { getFunctions } from "firebase/functions";

// ireps1
const firebaseConfig = {
  apiKey: "AIzaSyCOQVahRlwZ5Cdzg2RYncp670QAJYlTqfY",
  authDomain: "ireps-cl1-live.firebaseapp.com",
  projectId: "ireps-cl1-live",
  storageBucket: "ireps-cl1-live.appspot.com",
  messagingSenderId: "491234061072",
  appId: "1:491234061072:web:508639236ca7be86af9395",
  measurementId: "G-GBSSXQ5GS5"
};

// ireps-development
// const firebaseConfig = {
// 	apiKey: "AIzaSyCj8IfmDEGxDWEXesDKBanx6HDp_1jxluI",
// 	authDomain: "ireps-development.firebaseapp.com",
// 	projectId: "ireps-development",
// 	storageBucket: "ireps-development.appspot.com",
// 	messagingSenderId: "989928358059",
// 	appId: "1:989928358059:web:7c6c6b936c4efc4562f7ee",
// };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// initializeFirestore(app, {
// 	localCache: persistentLocalCache({ tabManager: persistentSingleTabManager() }),
// });


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
