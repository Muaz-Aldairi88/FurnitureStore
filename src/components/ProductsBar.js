import { Link, useLocation } from "react-router-dom";


const ProductsBar = () => {

const {pathname}=useLocation();

return (
    <>
    <nav className="navbar bg-body-tertiary">
        <div className="container-fluid">
            <ul className="nav nav-tabs">
                <li className="nav-item">
                    <Link className={`nav-link ${pathname==='/all'?"active":""}`} aria-current="page" to='/all'>All Products</Link>
                </li>
                <li className="nav-item">
                    <Link className={`nav-link ${pathname==='/livingroom'?"active":""}`} to='/livingroom'>Living Room</Link>
                </li>
                <li className="nav-item">
                    <Link className={`nav-link ${pathname==='/bedroom'?"active":""}`} to='/bedroom'>Bedroom</Link>
                </li>
                <li className="nav-item">
                    <Link className={`nav-link ${pathname==='/diningroom'?"active":""}`} to='/diningroom'>Dining Room</Link>
                </li>
                <li className="nav-item">
                    <Link className={`nav-link ${pathname==='/homeoffice'?"active":""}`} to='/homeoffice'>Home Office</Link>
                </li>
                <li className="nav-item">
                    <Link className={`nav-link ${pathname==='/outdoor'?"active":""}`} to='/outdoor'>Outdoor</Link>
                </li>
                <li className="nav-item">
                    <Link className={`nav-link ${pathname==='/decor'?"active":""}`} to='/decor'>Decor</Link>
                </li>
            </ul>
        </div>
    </nav>
    </>
);
};

export default ProductsBar;
