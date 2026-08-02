import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCccPqfyiDar3WmJUvHG1kG5c2U-JMVxSA",
  authDomain: "museum-bcd4d.firebaseapp.com",
  projectId: "museum-bcd4d",
  storageBucket: "museum-bcd4d.firebasestorage.app",
  messagingSenderId: "364308346863",
  appId: "1:364308346863:web:a5abf1aa2af790b3b2281a"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
