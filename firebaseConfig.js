import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyBo8s8Wec16GUvo4oDni29uZyfNcr7nJ9o",
    authDomain: "indian-classical-dance.firebaseapp.com",
    databaseURL: "https://indian-classical-dance-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "indian-classical-dance",
    storageBucket: "indian-classical-dance.appspot.com",
    messagingSenderId: "446050968447",
    appId: "1:446050968447:web:bed2b2fe980e652b97704a"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };

// Firebase