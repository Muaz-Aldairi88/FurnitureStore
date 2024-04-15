import { createContext, useContext, useMemo, useState } from "react"
import FirebaseAuthWithGoogle from "./handlers/authWithGoogle"
import FirebaseAuthWithFacebook from "./handlers/authWithFacebook";


const { google_signIn, signOut, getCurrentUser }= FirebaseAuthWithGoogle;
const {facebook_signIn}=FirebaseAuthWithFacebook;
const Context = createContext()


const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null)
    const adminEmail="muaz.fd@admin.comfy.com"

    const google_login = () => google_signIn().then(setCurrentUser)
    const logout = () => signOut().then(() => setCurrentUser(null))
    const facebook_login = () => facebook_signIn().then(setCurrentUser)
    const authenticate = () => getCurrentUser().then(setCurrentUser)

    //---------------------------worning: makes the dependencies of useMemo Hook (at line 30) change on every render.
    // const value = useMemo(() => {
    //     return {
    //         google_login, 
    //         facebook_login,
    //         logout, 
    //         authenticate, 
    //         currentUser,
    //         adminEmail,
    //     }
    // }, [google_login,facebook_login,logout, currentUser,adminEmail], authenticate)

    const value={
        google_login, 
        facebook_login,
        logout, 
        authenticate, 
        currentUser,
        adminEmail,
    }
    return <Context.Provider value={value}>{children}</Context.Provider>
}

export const useAuthContext = () => {
    return useContext(Context)
}
export default AuthProvider