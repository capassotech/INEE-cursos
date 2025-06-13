// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "",
    authDomain: "inee-cursos.firebaseapp.com",
    projectId: "inee-cursos",
    storageBucket: "inee-cursos.firebasestorage.app",
    messagingSenderId: "",
    appId: "",
    measurementId: "G-"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Exporta la instancia de autenticación
export const auth = getAuth(app);

// Exporta la instancia de Realtime Database
export const database = getDatabase(app);
export const storage = getStorage(app);