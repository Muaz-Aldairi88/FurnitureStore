import { useContext, useMemo } from "react";
import Product from "./Product";
import { Context } from "../context";

const ProductsList = ({category}) => {
    const {state}=useContext(Context);

    // to filter products based on category
    const categorised_products=useMemo(()=>{
        let filtered;
        if(category!=="All"){
            filtered= state.products.filter(product => {
                return product.category===category
            })        
        }
        else{
            filtered=state.products;
            }
        return filtered 
    },[state.products,category]);

    return (
    <div className="container text-center mt-3">
        <h2>{`${category} Furniture`}</h2>
        <p>{`${categorised_products.length} product${categorised_products.length>1? "s":""} in ${category} category`}</p>
        <div className="row m-2 gap-3 content-adje">
            {categorised_products.map((product, i) => {
                return <Product key={i} product={product}/>;
            })}
        </div>
    </div>
    );
};
export default ProductsList;
