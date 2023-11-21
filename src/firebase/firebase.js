import {initializeApp} from "firebase/app";
import {getFirestore} from "firebase/firestore";
<<<<<<< HEAD
import { getAuth } from "firebase/auth";
=======
import {getDownloadURL, getStorage, ref} from "firebase/storage";

async function getUrl(path, fileName) {
    const storage = getStorage();
    const storageRef = ref(storage, path+fileName);

    try {
        return await getDownloadURL(storageRef);
        // You can use it to display the image on your website.
    } catch (error) {
        // Handle errors here
        console.error(error);
    }
}

>>>>>>> 12b35d20a7492937a544c6813c0e72271f0a8441

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
<<<<<<< HEAD

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

export { auth };

export const db = getFirestore(app);
=======
export const db = getFirestore(app);
export {getUrl};
>>>>>>> 12b35d20a7492937a544c6813c0e72271f0a8441
