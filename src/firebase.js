import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD2HMsZq3p6GVfBXvU2qS311j-kcjl7guY",
  authDomain: "hostelmanagementapp-13579.firebaseapp.com",
  projectId: "hostelmanagementapp-13579",
  storageBucket: "hostelmanagementapp-13579.firebasestorage.app",
  messagingSenderId: "376528708778",
  appId: "1:376528708778:web:c69882917d33dc0a5e1cd3",
  measurementId: "G-950K3WKLEH"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);