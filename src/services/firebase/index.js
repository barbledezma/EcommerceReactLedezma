import { initializeApp } from "firebase/app";
import { getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBH4S4CI9oX0o_R2Z2eYIIrQLxP5GCeF9A",
  authDomain: "ejemploledezma.firebaseapp.com",
  projectId: "ejemploledezma",
  storageBucket: "ejemploledezma.appspot.com",
  messagingSenderId: "88387330439",
  appId: "1:88387330439:web:f25481589853b5da807322"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)