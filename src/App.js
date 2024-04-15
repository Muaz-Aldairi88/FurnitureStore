import { useContext, useEffect} from 'react';
import './App.css';
import AddProductForm from './components/AddProductForm';
import NavBar from './components/NavBar';
import ProductsBar from './components/ProductsBar';
import ProductsList from './components/ProductsList';
import { Context } from './context';
import { Route, Routes} from 'react-router-dom';
import NotFound from './components/NotFound';
import UpdateProductForm from './components/UpdateProductForm';
import { useAuthContext } from './AuthContext';
import FavoriteList from './components/FavoriteList';
import CartList from './components/CartList';
import Login from './components/Login';
import CreateAccount from './components/CreateAccount';

// import FireStore from './handlers/firestore';

// const {readDocs_favoritesPaths, readDocs_cartItemsPaths}=FireStore;

function App() {

  const {state,dispatch,readProducts}=useContext(Context);
  const {authenticate, currentUser, adminEmail}=useAuthContext();

  useEffect(()=>{
      console.log(currentUser);
    readProducts();
    authenticate();
    //readFavorites();  when here the items do not appear in cart or favorites ====&&&&&==== may need to be moved to the context and used in both App and FavoriteList
    //readCartItems();
  },[currentUser, 
    state.products       //may  cause exceding the quota on firebase // consider somthing similar to the utality function or state.favorites/ state.cartItems
  ]);

//   // Utility function to compare arrays
//   const arraysAreEqual = (array1, array2) => {
//     if (array1.length !== array2.length) {
//         return false;
//     }
//     for (let i = 0; i < array1.length; i++) {
//         if (array1[i] !== array2[i]) {
//             return false;
//         }
//     }
//     return true;
// };

// // to read the items in the current user's favorites list
// const readFavorites= async () =>{
//     if(currentUser){
//         let favorites=[];
//         const favorites_Paths =await readDocs_favoritesPaths(`${currentUser.email}`)
//         favorites_Paths.forEach((path) => {
//             const favorite = state.products.find((product) => product && product.path === path)
//             if (favorite) {
//                 favorites.push(favorite);
//             }
//         });
//         // Check if the new favorites are different from the current state.favorites (to prevent infinite loop)
//         if (!arraysAreEqual(favorites, state.favorites)) {
//             dispatch({
//                 type: "SET_FAVORITES",
//                 payload: favorites,
//             });
//         }
//     }
//     else{
//         dispatch({
//             type: "SET_FAVORITES",
//             payload: [],
//         });
//     }
// };

// // to read the items in the current user's cart
// const readCartItems= async () =>{
//   if(currentUser){
//       let cartItems=[];
//       const cart_items_Paths =await readDocs_cartItemsPaths(`${currentUser.email}`)
//       cart_items_Paths.forEach((path) => {
//           const cartItem = state.products.find((product) => product && product.path === path)
//           if (cartItem) {
//               cartItems.push(cartItem);
//           }
//       });
//       // Check if the new cart items are different from the current state.cartItems (to prevent infinite loop)
//       if (!arraysAreEqual(cartItems, state.cartItems)) {
//           dispatch({
//               type: "SET_CART_ITEMS",
//               payload: cartItems,
//           });
//       }
//   }else{
//       dispatch({
//           type: "SET_CART_ITEMS",
//           payload: [],
//       });
//   }
// };


  // to show/ hide add product form (only for admin)
  const toggleAddProductForm=()=>{
    dispatch({
      type:"SET_ADD_PRODUCT_FORM_VISIBLE",
      payload: {bool: !state.isAddProductFormVisible},
    })
  };

  return (
    <div>
      <NavBar/> 
      <ProductsBar/> 
      { (currentUser && currentUser.email.toLowerCase()===adminEmail) && (<button className='btn btn-success float-end' onClick={toggleAddProductForm}>{state.isAddProductFormVisible?'Close Form': 'Add Product'}</button>) }
      {state.isAddProductFormVisible && <AddProductForm/>}
      <Routes>
        <Route path='/' element={<ProductsList category='All'/>}></Route>
        <Route path='/all' element={<ProductsList category='All'/>}></Route>
        <Route path='/livingroom' element={<ProductsList category="Living Room"/>}></Route>
        <Route path='/bedroom' element={<ProductsList category="Bedroom"/>}></Route>
        <Route path='/diningroom' element={<ProductsList category="Dining Room"/>}></Route>
        <Route path='/homeoffice' element={<ProductsList category="Home Office"/>}></Route>
        <Route path='/outdoor' element={<ProductsList category="Outdoor"/>}></Route>
        <Route path='/decor' element={<ProductsList category="Decor"/>}></Route>
        <Route path='/updateproductform' element={<UpdateProductForm/>}></Route>
        <Route path='/cart' element={<CartList/>}></Route>
        <Route path='/favorite' element={<FavoriteList/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/create-account' element={<CreateAccount/>}></Route>
        <Route path='*' element={<NotFound/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
