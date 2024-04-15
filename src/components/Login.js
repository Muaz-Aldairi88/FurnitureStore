import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../lib/firebase.config";
import { useAuthContext } from "../AuthContext";


const Login=()=>{

    const{google_login,facebook_login,currentUser, logout}=useAuthContext();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate=useNavigate();

    const handleOnSubmit= async (e)=>{
        e.preventDefault();
        try{
            await signInWithEmailAndPassword(auth,email,password);
            navigate('/');
        } catch (e){
            setError(e.message);
        }

    }

    // const facebookLogin=()=>{
    //     facebook_login();
    //     navigate('/')
    // }

    // const googleLogin=()=>{
    //     google_login();
    //     navigate('/')
    // }

    if (currentUser){
        return (
        <div className='d-grid gap-4 col-4 mx-auto mt-5 p-5 border border-2'>
        <h4 className="text-center">you are already loggedin as: <strong>{currentUser.email}</strong></h4>
        <button type="button" className="btn btn-danger" onClick={logout}>
            Logout
        </button>
        </div>)
    }
    return(
    <div className='d-grid gap-2 col-4 mx-auto mt-5 p-5 border border-2'>
    <h1 className="text-center mb-4">Login to your account</h1>
    {error && <p>{error}</p>}
    <form onSubmit={handleOnSubmit}>
        <div className="row mb-3">
            <label className="col-sm-2 col-form-label">Email</label>
            <div className="col-sm-10">
            <input type="email" className="form-control" id="inputEmail3" placeholder="Your email address"
            value={email} onChange={e => setEmail(e.target.value)}/>
            </div>
        </div>
        <div className="row mb-3">
            <label  className="col-sm-2 col-form-label">Password</label>
            <div className="col-sm-10">
            <input type="password" className="form-control" id="inputPassword3" placeholder="Your password"
            value={password} onChange={e => setPassword(e.target.value)}/>
            </div>
        </div>
        <button type="submit" className="btn btn-primary d-grid col-10 mx-auto mt-4">Sign in</button>
    </form>
    <Link className="mt-3" to="/create-account">Don't have an account? Create one here</Link>
    <div className="d-grid col-10 mx-auto mt-4">
        <button type="button" className=" btn btn-secondary mt-1" onClick={google_login}>
            Login with Google
        </button>                    
        <button type="button" className=" btn btn-secondary mt-2" onClick={facebook_login}>
            Login with facebook
        </button>
    </div>
    </div>)
}

export default Login;