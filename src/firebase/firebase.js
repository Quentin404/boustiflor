import {initializeApp} from "firebase/app";
import {getFirestore} from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {

    apiKey: "AIzaSyASRopLCU4lJ1Vk4Qx6RIjMNo8KJLScBnw",
    authDomain: "toxiplantes-96153.firebaseapp.com",
    projectId: "toxiplantes-96153",
    storageBucket: "toxiplantes-96153.appspot.com",
    messagingSenderId: "728948089209",
    appId: "1:728948089209:web:92efb1251b7cc41623cfa8",
    measurementId: "G-Q1RPN84872"

};

const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

export { auth };

export const db = getFirestore(app);