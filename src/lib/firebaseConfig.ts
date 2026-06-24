import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyArV9lo7CLMLf3H2PxQeMS1i-QtUzXQzFI",
  authDomain: "armazenamento-assistme.firebaseapp.com",
  projectId: "armazenamento-assistme",
  storageBucket: "armazenamento-assistme.firebasestorage.app",
  messagingSenderId: "542424573908",
  appId: "1:542424573908:web:0ccdbde4eab5c66774d841",
  measurementId: "G-D72EGMM7NB"
};

const app = initializeApp(firebaseConfig);

// Inicializa o Analytics (Para métricas de acesso)
const analytics = getAnalytics(app);

// Inicializa o Banco de Dados Firestore (Onde as provas vão ficar salvas)
const db = getFirestore(app);

export { app, analytics, db };
