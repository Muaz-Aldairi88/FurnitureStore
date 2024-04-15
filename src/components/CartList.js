// total bill calculation method 
import { useContext, useEffect} from "react";
import Product from "./Product";
import { Context } from "../context";
import { useAuthContext } from "../AuthContext";
import FireStore from '../handlers/firestore';

const {readDocs_cartItemsPaths}=FireStore;

const CartList = () => {

    const {state,dispatch}=useContext(Context);
    const {authenticate, currentUser}=useAuthContext();
    
    useEffect(()=>{
        authenticate();
        readCartItems();
    },[currentUser, state.products]);

    // Utility function to compare arrays
    const arraysAreEqual = (array1, array2) => {
        if (array1.length !== array2.length) {
            return false;
        }
        for (let i = 0; i < array1.length; i++) {
            if (array1[i] !== array2[i]) {
                return false;
            }
        }
        return true;
    };
    
    // to read the items in the current user's cart
    const readCartItems= async () =>{
        if(currentUser){
            let cartItems=[];
            const cart_items_Paths =await readDocs_cartItemsPaths(`${currentUser.email}`)
            cart_items_Paths.forEach((path) => {
                const cartItem = state.products.find((product) => product && product.path === path)
                if (cartItem) {
                    cartItems.push(cartItem);
                }
            });
            // Check if the new cart items are different from the current state.cartItems (to prevent infinite loop)
            if (!arraysAreEqual(cartItems, state.cartItems)) {
                dispatch({
                    type: "SET_CART_ITEMS",
                    payload: cartItems,
                });
            }
        }else{
            dispatch({
                type: "SET_CART_ITEMS",
                payload: [],
            });
        }
    };

    return (
        <div className="container text-center mt-3">
            <p>{`${state.cartItems.length} product${state.cartItems.length>1? "s":""} in your cart`}</p>
            <div className="row m-2 gap-3 content-adje">
                {/* display all items in the cartItems array in the state */}
                {state.cartItems.map((product, i) => {
                    return(
                        <div key={i} className="border border-gray p-3 row gx-2">
                            <div className="col"><Product  product={product}/></div>
                            <h5 className="col d-flex align-items-center">price: NZ ${product.price}</h5>
                        </div>
                    )   
                })}
            </div>
            <h5 className="float-end mt-4"> total Bill: NZ ${state.cartItems.reduce((acc,i)=> acc + (parseFloat(i.price)),0)}</h5>
            <button className="btn btn-primary mt-4">Process to checkout</button>
        </div>
    );
};
export default CartList;
