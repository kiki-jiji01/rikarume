// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { deleteDoc, doc, getDoc, getFirestore, query, setDoc, where } from "firebase/firestore";
import { collection, getDocs,addDoc  } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAXhTKRNyLqCUyal3IHClO3ThoC_8LUieg",
  authDomain: "rikarume-6c415.firebaseapp.com",
  projectId: "rikarume-6c415",
  storageBucket: "rikarume-6c415.appspot.com",
  messagingSenderId: "133392376798",
  appId: "1:133392376798:web:5a101c9c9243558a0ef34f",
  measurementId: "G-09GZ96NHN6",
  storageBucket:"rikarume-6c415.appspot.com"
};


// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const user = auth.currentUser
export const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export {collection,getDocs,addDoc,getDoc,deleteDoc,doc,setDoc,query,where }
