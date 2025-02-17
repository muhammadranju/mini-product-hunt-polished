import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_apiKey,
  authDomain: import.meta.env.VITE_authDomain,
  projectId: import.meta.env.VITE_projectId,
  storageBucket: import.meta.env.VITE_storageBucket,
  messagingSenderId: import.meta.env.VITE_messagingSenderId,
  appId: import.meta.env.VITE_appId,

  //   apiKey: "AIzaSyCW2Erh8WH0AAdlh2meXS2wDu8FHcn94lM",
  //   authDomain: "product-huntapp.firebaseapp.com",
  //   projectId: "product-huntapp",
  //   storageBucket: "product-huntapp.firebasestorage.app",
  //   messagingSenderId: "861044672293",
  //   appId: "1:861044672293:web:d96986f594dada17aa3ccc",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export { auth };
