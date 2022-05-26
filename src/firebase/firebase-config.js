import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyC68YyCFBVYPYQaPiKLYjM7FYSbcJcwFCQ",
    authDomain: "bejamas-task-e2303.firebaseapp.com",
    projectId: "bejamas-task-e2303",
    storageBucket: "bejamas-task-e2303.appspot.com",
    messagingSenderId: "364334524260",
    appId: "1:364334524260:web:d8ae73132dc0e68b943c71"
};

const project = initializeApp(firebaseConfig);

export const database= getFirestore(project);