import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "movies-8cbc6.firebaseapp.com",
  projectId: "movies-8cbc6",
  storageBucket: "movies-8cbc6.appspot.com",
  messagingSenderId: "384273819377",
  appId: "1:384273819377:web:7287b5d0c4cd833bc5ab50"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export default app