import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';
import { getAuth} from "firebase/auth";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY, 
    authDomain:process.env.REACT_APP_AUTH_DOMAIN,
    projectId:process.env.REACT_APP_PROJECT_ID,
    storageBucket:process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId:process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId:process.env.REACT_APP_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// firebase database
export const db=getFirestore(app);

// firebase storage
export const storage=getStorage(app);

// firebase auth
export const auth=getAuth(app);

export default app;


export const test=()=>{
    if(!firebaseConfig || !firebaseConfig.apiKey ){

        throw new Error("no firebase configered");
    }else{
        console.log("firebase is initialised");
    }
    return app;
};