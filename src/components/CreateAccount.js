import { useState } from "react";
import { Link, useNavigate} from "react-router-dom";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from "../lib/firebase.config";
import { useAuthContext } from "../AuthContext";


const CreateAccount=()=>{
    const{currentUser, logout}=useAuthContext();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleOnSubmit= async(e)=>{
        e.preventDefault();
        try {
            if (password !== confirmPassword) {
                setError('Password and confirm password do not match');
                return;
            }

            await createUserWithEmailAndPassword(auth, email, password);
            navigate('/');
        } catch (e) {
            setError(e.message);
        }
    }

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
    <div className='d-grid gap-2 col-5 mx-auto mt-5 p-5 border border-2'>
    <h1 className="col-12 m-2 text-center mb-3">Create an account</h1>
    {error && <p className="error">{error}</p>}
    <form onSubmit={handleOnSubmit}>
        <div className="row mb-3">
            <label  className="col-sm-2 col-form-label">Email</label>
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
        <div className="row mb-3">
            <label  className="col-sm-2 col-form-label">Confirm Password</label>
            <div className="col-sm-10">
            <input type="password" className="form-control" id="inputConfirmPassword3"placeholder="Re-enter your password"
            value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}/>
            </div>
        </div>
        <button type="submit" className="btn btn-primary d-grid col-10 mx-auto mt-2">Create Account</button>
    </form>
    <Link className="mt-3" to="/login">Already have an account? Login here</Link>
    </div>)
}

export default CreateAccount;