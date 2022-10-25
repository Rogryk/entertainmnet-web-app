import FIREBASE_CONFIG from "./FIREBASE_CONFIG";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Initialize Firebase
const init = () => {
  const firebaseApp = initializeApp(FIREBASE_CONFIG);
};

export default init;
export const auth = getAuth();
