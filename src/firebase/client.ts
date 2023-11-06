import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBu6KkVzDWVgYPf4UPM08rFowqy5ayNMTc",
  authDomain: "fir-astro-starter.firebaseapp.com",
  projectId: "fir-astro-starter",
  storageBucket: "fir-astro-starter.appspot.com",
  messagingSenderId: "996337362101",
  appId: "1:996337362101:web:47d0d82c326e84fe29cafc",
  measurementId: "G-ZLM4QPD3KQ",
};

export const app = initializeApp(firebaseConfig);
