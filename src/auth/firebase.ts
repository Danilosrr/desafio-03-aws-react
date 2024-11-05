import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA01QO0Tj2__KH7zA-AR0e0OEwQjLCKUCY",
  authDomain: "desafio-03-aws-react-9ae4f.firebaseapp.com",
  projectId: "desafio-03-aws-react-9ae4f",
  storageBucket: "desafio-03-aws-react-9ae4f.firebasestorage.app",
  messagingSenderId: "404008856128",
  appId: "1:404008856128:web:d2abdae924113fa6aacda5",
  measurementId: "G-G1YT4PDSKJ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
