import FIREBASE_CONFIG from "./FIREBASE_CONFIG";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Initialize Firebase

const app = initializeApp(FIREBASE_CONFIG);
export const auth = getAuth(app);
