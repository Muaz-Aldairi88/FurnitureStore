import { signInWithPopup, FacebookAuthProvider } from "firebase/auth";
import {auth} from '../lib/firebase.config';

const provider = new FacebookAuthProvider();

const FirebaseAuthWithFacebook={
    facebook_signIn: () => {
        return new Promise( resolve =>{
            signInWithPopup(auth,provider)
            .then((response) =>{
                resolve(response.user)
            })
            .catch(console.error)
        });
    },
}
export default FirebaseAuthWithFacebook;