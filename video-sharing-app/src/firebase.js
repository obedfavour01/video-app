// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCDD9eObcA7Sm-FFDud6egkLNnjtDAw_Pk",
  authDomain: "video-sharin8.firebaseapp.com",
  projectId: "video-sharin8",
  storageBucket: "video-sharin8.appspot.com",
  messagingSenderId: "1040965164329",
  appId: "1:1040965164329:web:060c1366bcccdb07556b38"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();

export const provider = new GoogleAuthProvider()



export default app