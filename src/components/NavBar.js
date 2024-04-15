import { useContext, useState } from "react";
import { GrFavorite,GrCart } from "react-icons/gr";
import { VscAccount } from "react-icons/vsc";
import { Context } from "../context";
import { useAuthContext } from "../AuthContext";
import { Link, useNavigate} from "react-router-dom";
import blankProfileImg from "../blankProfile.jpeg";

const NavBar = () => {
    const {filterProducts}=useContext(Context);
    const [searchText, setSearchText]=useState("");
    const navigate=useNavigate();

    const{google_login,facebook_login, logout,currentUser}=useAuthContext();

    // handle the search text
    const handleOnChange= (e)=>{
        setSearchText(e.target.value);
        filterProducts(e.target.value);
    }

    // handle the search form submission
    const handleOnSubmit= (e)=>{
        e.preventDefault();
        filterProducts(searchText);
    }

    const signOut=()=>{
        logout();
        navigate("/");
    }

    return (
    <>
        <nav className="navbar bg-body-tertiary">
            <div className="container-fluid">
                <a className="navbar-brand">Comfy Store</a>
                <form className="d-flex" role="search" onSubmit={handleOnSubmit}>
                    <input className="form-control me-2" type="search" placeholder="Search"
                        aria-label="Search" value={searchText} onChange={handleOnChange}/>
                    <button className="btn btn-outline-success" type="submit">Search</button>
                </form>
                <div className="d-flex">
                    <div className="p-2 nav-item dropdown">
                        <div className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        { currentUser? 
                            <img src={currentUser.photoURL?currentUser.photoURL:blankProfileImg} alt={currentUser.displayName} width={30} height={30} style={{borderRadius:20}}/>
                            :<VscAccount/>}
                        </div>
                        <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                            <li><a className="dropdown-item" href="#">{!currentUser? "Guest": currentUser.displayName? currentUser.displayName: currentUser.email }</a></li>
                            <li><hr className="dropdown-divider"/></li>
                            {!currentUser && 
                            <>
                                <li className="dropdown-item"><Link to="/login" className=" btn btn-warning">
                                    Login with Email
                                </Link>
                                </li>
                                <li className="dropdown-item"><button type="button" className=" btn btn-warning" onClick={google_login}>
                                    Login with Google
                                </button>
                                </li>
                                <div className="dropdown-item"><button type="button" className=" btn btn-warning" onClick={facebook_login}>
                                    Login with facebook
                                </button>
                                </div>
                            </>
                            }
                            <li>
                                {currentUser &&
                                <button type="button" className="btn btn-danger" onClick={signOut}>
                                    Logout
                                </button>}
                            </li>
                        </ul>
                    </div>
                    <div className="p-2" ><Link to="/favorite"><GrFavorite/></Link></div>
                    <div className="p-2"><Link to="/cart"><GrCart/></Link></div>
                </div>
            </div>
        </nav>
    </>);
};

export default NavBar;