import { createContext } from "react";
import { useReducer } from "react";
import FireStore from "./handlers/firestore";

const {readDocs}=FireStore;

export const Context = createContext();

const initialState = {
    products: [],
    placeholders:[],
    addProductFormInputs: { title: null,price:null,category:null,description:null, file: null, path: null },
    updateProductFormInputs:{ title: null,price:null,category:null,description:null, path: null },
    isAddProductFormVisible: false,
    favoritesPaths:[],
    favorites:[],
    cartItems:[],
};

const handleOnChange_Add = (state, e) => {
    if (e.target.name === "file") {
        return {
            ...state.addProductFormInputs,
            file: e.target.files[0],
            path: URL.createObjectURL(e.target.files[0]),
        };
    } else if (e.target.name === "title") {
        return { ...state.addProductFormInputs, 
            title: e.target.value
        }
    } else if (e.target.name === "price") {
        return { ...state.addProductFormInputs,
            price: e.target.value
        }
    } else if (e.target.name === "category") { 
        return { ...state.addProductFormInputs,
            category: e.target.value
        }
    } else{
        return { ...state.addProductFormInputs,
            description: e.target.value 
        }
    }
};

const handleOnChange_Update = (state, e) => {
    if (e.target.name === "path") {
        return { ...state.updateProductFormInputs, 
            path: e.target.value
        }
    } 
    if (e.target.name === "title") {
        return { ...state.updateProductFormInputs, 
            title: e.target.value
        }
    } 
    if (e.target.name === "price") {
        return { ...state.updateProductFormInputs,
            price: e.target.value
        }
    }
    if (e.target.name === "category") { 
        return { ...state.updateProductFormInputs,
            category: e.target.value
        }
    }
    if (e.target.name === "description") {
        return { ...state.updateProductFormInputs,
            description: e.target.value 
        }
    }
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case "SET_PRODUCT":
        return {
            ...state,
            products: [...state.products, state.addProductFormInputs],
            placeholders: [...state.products, state.addProductFormInputs],
            addProductFormInputs: { title: null,price:null,category:null,description:null, file: null, path: null },
        };
        case "UPDATE_PRODUCT":
            const ProductsAfterUpdatingOne = state.placeholders.map(product => {
                if (product.path === state.updateProductFormInputs.path) {
                    // Update the properties of the matching product
                    return {
                        ...product,
                        title: state.updateProductFormInputs.title,
                        price: state.updateProductFormInputs.price,
                        category: state.updateProductFormInputs.category,
                        description: state.updateProductFormInputs.description,
                    };
                }
                // If it's not the matching product, return it unchanged
                return product;
            });  
        return {
            ...state,
            products: ProductsAfterUpdatingOne,
            placeholders: ProductsAfterUpdatingOne,
        };
        case "SET_PRODUCTS":
        return {
            ...state,
            products: action.payload.products,
            placeholders: action.payload.products,
        };
        case "FILTER_PRODUCTS_BY_SEARCH":
        return {
            ...state,
            products: action.payload.results,
        };
        case "SET_ADD_PRODUCT_FORM_INPUTS":
        return {
            ...state,
            addProductFormInputs: handleOnChange_Add(state, action.payload.value),
        };
        case "SET_UPDATE_PRODUCT_FORM_INPUTS":
        return {
            ...state,
            updateProductFormInputs: handleOnChange_Update(state, action.payload.value),
        };
        case "SET_ADD_PRODUCT_FORM_VISIBLE":
        return {
            ...state,
            isAddProductFormVisible: action.payload.bool,
        };
        case "DELETE_PRODUCT":
            const ProductsAfterDeletingOne = state.placeholders.filter(product => product.path !== action.payload.path);
        return {
            ...state,
            placeholders: ProductsAfterDeletingOne,
            products: ProductsAfterDeletingOne,
        };
        case "SET_FAVORITES":
        return{
            ...state,
            favorites:action.payload,
        };
        case "SET_CART_ITEMS":
        return{
            ...state,
            cartItems:action.payload,
        };
        default:
        return state;
    }
}

const Provider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    // to read products in the database
    const readProducts= async () =>{
        const products =await readDocs('products')
        dispatch({
            type:"SET_PRODUCTS",
            payload: {products},
        })
    };

    // to filter products based on the search text
    const filterProducts= (searchInput)=>{
        if(searchInput==="" || !!searchInput) {
            dispatch({
                type:"SET_PRODUCTS",
                payload: {products: state.placeholders},
            })
        }
        let list=state.placeholders.flat();
        let results= list.filter((product) =>{
            const name=product.title.toLowerCase();
            const search_Input=searchInput.toLowerCase();
            return name.indexOf(search_Input)>-1;
        });
        dispatch({type:"FILTER_PRODUCTS_BY_SEARCH", payload:{results}});
    };
    return (
        <Context.Provider value={{state, dispatch,readProducts,filterProducts}}>{children}</Context.Provider>
    );
};

export default Provider;
