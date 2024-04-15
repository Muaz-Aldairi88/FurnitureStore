import { signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from "firebase/auth";
import {auth} from '../lib/firebase.config';

const provider = new GoogleAuthProvider();

const FirebaseAuthWithGoogle={
    google_signIn: () => {
        return new Promise( resolve =>{
            signInWithPopup(auth,provider)
            .then((response) =>{
                resolve(response.user)
            })
            .catch(console.error)
        });
    },
    signOut: () =>{
        return new Promise( resolve =>{
            signOut(auth)
            .then((response) =>{
                resolve(response)
                console.log("signed out successfully")
            })
            .catch(console.error)
        });
    },
    getCurrentUser: () => {
        return new Promise(resolve => {
            onAuthStateChanged(auth,(user) =>{
                if(user){
                    resolve(user)
                }else{
                    console.log("user is not loggedin")
                }
            })
        })
    }
}
export default FirebaseAuthWithGoogle;