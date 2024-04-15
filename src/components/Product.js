// Check if the current product is in the favorites/ cartItems lists
import { useContext, useState, useEffect } from "react";
import { MdDeleteOutline,MdOutlineEdit, MdOutlineFavorite, MdShoppingCart, MdOutlineClose} from "react-icons/md";
import { useNavigate} from "react-router-dom";
import FireStore from "../handlers/firestore";
import Storage from "../handlers/storage";
import { Context } from "../context";
import { useAuthContext } from "../AuthContext";

//----------------------- styling the modal to display the product's details --------------------------
import styled from 'styled-components';
//import ProductImgPreview from "./ProductImgPreview";

const ModalBackground = styled.div`
	position: fixed;
	z-index: 1;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	overflow: auto;
	background-color: rgba(0, 0, 0, 0.5);
`;

const ModalContent = styled.div`
	background-color: white;
	margin: 10% auto;
	padding: 20px;
	width: 50%;
`;
//------------------------------------------------

// to display the product image 
const ProductImgDisplay = ({ path }) => {
    return (path && 
        (<div
            className="rounded p-1 m-5"
            style={{
                width: "80%",
                height: "500px",
                backgroundImage: `url(${path}`,
                backgroundSize: "cover",}}>
        </div>)
    );
};

const {deleteDoc, writeDoc_favoritesPaths,deleteDoc_favoritesPaths, writeDoc_cartItemsPaths, deleteDoc_cartItemsPaths}=FireStore;
const {deleteProductImg}=Storage;

const Product=({product})=>{
    const {state, dispatch}=useContext(Context);
    const {currentUser,adminEmail}=useAuthContext();

    const [isAddedToFavorite, setIsAddedToFavorite]=useState(false);
    const [isAddedToCart, setIsAddedToCart]=useState(false);

    const navigate=useNavigate();

    const [showProductDetails, setShowProductDetails] = useState(false);


    // Check if the current product is in the favorites/ cartItems lists
    useEffect(() => {
        setIsAddedToFavorite(state.favorites.some((favProduct) => favProduct.path === product.path));
        setIsAddedToCart(state.cartItems.some((cartProduct) => cartProduct.path === product.path));
    }, [state.favorites,state.cartItems, product.path]);

    // to delete a product (only the admin)
    const deleteProduct=()=>{
        // delete the product from the database
        deleteDoc(product)
        // delete the product's img from the storage
        .then(deleteProductImg(product)).then(()=>{
            dispatch({
                type: "DELETE_PRODUCT",
                payload:{path:product.path}
            });
        });
    };

    // to update a product info (except the img)(only the admin)
    const updateProduct=()=>{
        // navigate to the update form and pass the product's current info to be displayed in the form's placeholders
        navigate("/updateproductform",{state: {currentProduct:product}})
    }

    // to add the product to the favorites list
    const addToFavoriteList=()=>{
        // to be marked as added
        setIsAddedToFavorite(true)
        // to add the product to the user's favorites collection in the database
        writeDoc_favoritesPaths(product.path,currentUser.email)
    }

    // to delete the product from the favorites list
    const deleteFromFavoriteList=()=>{
        // to be marked as not added
        setIsAddedToFavorite(false);
        // to delete the product from the user's favorites collection in the database
        deleteDoc_favoritesPaths(product.path,currentUser.email)
    }

    // toggle add /delete from favorites
    const toggleFavorite=()=>{
        if(currentUser) {
            if (isAddedToFavorite) {
                deleteFromFavoriteList();
            } else {
                addToFavoriteList();
            }
        } 
        // user has to login to add the product to favorites list
        else{
            navigate('/login')
        }
    }

    // to add the product to the cart
    const addToCartList=()=>{
        setIsAddedToCart(true)
        writeDoc_cartItemsPaths(product.path,currentUser.email)
    }

    // to delete the product from the cart
    const deleteFromCartList=()=>{
        setIsAddedToCart(false);
        deleteDoc_cartItemsPaths(product.path,currentUser.email)
    }

    // toggle add /delete from cart
    const toggleCart=()=>{
        if(currentUser) {
            if (isAddedToCart) {
                deleteFromCartList();
            } else {
                addToCartList();
            }
        } else{
            navigate('/login')
        }
    }

    return(
    <div className="card" style={{width: "18rem"}}>
        <img src={product.path} className="card-img-top" height={200} alt={product.title}/>
        <div className="card-body">
            <h5 className="card-title">{product.title}</h5>
            <div className="d-flex justify-content-between">
                <h6 className="card-text">{product.category}</h6>
                <h6 className="card-text">${product.price}</h6>
            </div>
            <div className="d-flex justify-content-between ">
                <button className="btn btn-primary" onClick={() => setShowProductDetails(true)}>Details</button>
                    {/*================== product's details modal=============== */}
                    {showProductDetails && (
                        <ModalBackground onClick={() => setShowProductDetails(false)}>
                            <ModalContent onClick={e => e.stopPropagation()}>
                                <button className="float-end" onClick={() => setShowProductDetails(false)}><MdOutlineClose /></button>
                                <div className="content-align-center"><ProductImgDisplay path={product.path}/></div>
                                <h1>{product.title}</h1>
                                <h5 className="float-end p-2">Price: ${product.price}</h5>
                                <h5 className="float-start p-2">{product.category}</h5>
                                <textarea style={{height:300, width:700}}>{product.description}</textarea>
                                <div>
                                    <MdOutlineFavorite 
                                        style={{ color:`${currentUser && isAddedToFavorite? "red":"gray"}`}} 
                                        onClick={toggleFavorite}
                                    />
                                    <MdShoppingCart 
                                        style={{ color:`${currentUser && isAddedToCart? "red":"gray"}`}} 
                                        onClick={toggleCart}
                                    />
                                </div>
                            </ModalContent>
                        </ModalBackground>
                    )}
                <div className="p-2">
                    {/* only admin can see the update & delete buttons */}
                    {
                        (currentUser && currentUser.email.toLowerCase()===adminEmail) &&
                        <>
                        <MdOutlineEdit   onClick={updateProduct} />
                        <MdDeleteOutline onClick={deleteProduct}/>
                        </>
                    }
                    <MdOutlineFavorite 
                    style={{ color:`${currentUser && isAddedToFavorite? "red":"gray"}`}} 
                    onClick={toggleFavorite}
                    />
                    <MdShoppingCart 
                    style={{ color:`${currentUser && isAddedToCart? "red":"gray"}`}} 
                    onClick={toggleCart}
                    />
                </div>    
            </div>
            
        </div>
    </div>
    );
}
export default Product;