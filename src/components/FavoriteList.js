import { useContext, useEffect} from "react";
import Product from "./Product";
import { Context } from "../context";
import { useAuthContext } from "../AuthContext";
import FireStore from '../handlers/firestore';

const {readDocs_favoritesPaths}=FireStore;

const FavoriteList = () => {

const {state,dispatch}=useContext(Context);
const {authenticate, currentUser}=useAuthContext();

    useEffect(()=>{
        authenticate();
        readFavorites();
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
    
    // to read the items in the current user's favorites list
    const readFavorites= async () =>{
        if(currentUser){
            let favorites=[];
            const favorites_Paths =await readDocs_favoritesPaths(`${currentUser.email}`)
            favorites_Paths.forEach((path) => {
                const favorite = state.products.find((product) => product && product.path === path)
                if (favorite) {
                    favorites.push(favorite);
                }
            });
            // Check if the new favorites are different from the current state.favorites (to prevent infinite loop)
            if (!arraysAreEqual(favorites, state.favorites)) {
                dispatch({
                    type: "SET_FAVORITES",
                    payload: favorites,
                });
            }
        }
        else{
            dispatch({
                type: "SET_FAVORITES",
                payload: [],
            });
        }
    };

    return (
        <div className="container text-center mt-3">
            {/* display all items in the favorates array in the state */}
            <p>{`${state.favorites.length} product${state.favorites.length>1? "s":""} in your favorite list`}</p>
            <div className="row m-2 gap-3 content-adje">
                {state.favorites.map((product, i) => {
                    return <Product key={i} product={product}/>;
                })}
            </div>
        </div>
    );
};
export default FavoriteList;