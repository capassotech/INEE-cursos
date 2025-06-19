// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBNB8GmROSyE3iA11GLCTFd-oOLwCNuTUg",
    authDomain: "inee-plataforma.firebaseapp.com",
    projectId: "inee-plataforma",
    storageBucket: "inee-plataforma.firebasestorage.app",
    messagingSenderId: "491937360604",
    appId: "1:491937360604:web:d72b0061e44abda2342219",
    measurementId: "G-137LJ0S49X"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Exporta la instancia de autenticación
export const auth = getAuth(app);

// Exporta la instancia de Realtime Database
export const database = getDatabase(app);
export const storage = getStorage(app);