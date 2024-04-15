import { useContext, useMemo} from "react";
import { Context } from "../context";
import { useLocation, useNavigate } from "react-router-dom";
import FireStore from "../handlers/firestore";

const {updateDoc}=FireStore;

// to preview the product's image
const Preview = ({ path }) => {
    return (path && 
        (<div
            className="rounded p-1 m-5"
            style={{
                width: "30%",
                height: "300px",
                backgroundImage: `url(${path}`,
                backgroundSize: "cover",}}>
        </div>)
    );
};

const UpdateProductForm = () => {

    const {state,dispatch}=useContext(Context);
    const navigate=useNavigate(); 
    const {currentProduct}= useLocation().state; // {state: {currentProduct:product}}  getting the product's info

    // destructuring the current state 
    const{updateProductFormInputs}=state
    updateProductFormInputs.path=currentProduct.path

    // to handle the update form inputs
    const handleOnChange= (e) => dispatch({type:"SET_UPDATE_PRODUCT_FORM_INPUTS", payload: {value: e} })

    // to handle the form submission
    const handleOnSubmit=(e) =>{
        e.preventDefault();
        // to update the product's info in the database
        updateDoc(state.updateProductFormInputs)
        .then(()=>{
            dispatch({
                type:"UPDATE_PRODUCT",
            })
        })
        navigate("/")
    };

    // to prevent submitting before providing all info (Submit btn)
    const isDisabled = useMemo(() => {
        return Object.values(state.updateProductFormInputs).some(
            (updateProductFormInputs) => !updateProductFormInputs);
    }, [state.updateProductFormInputs]);


    return (
    <div className="mt-3">
        <p className="display-6 text-center mb-3">Update Product's Information</p>
        <div className="mb-5 d-flex align-items-center justify-content-center">
        <Preview path={currentProduct.path}/>
        <form
            className="mb-2"
            style={{ textAlign: "left" }}
            onSubmit={handleOnSubmit}
            >
            <div className="mb-3">
                <input
                    type="text"
                    className="form-control"
                    name="title"
                    placeholder={currentProduct.title}
                    aria-describedby="text"
                    onChange={handleOnChange}
                />
            </div>
            <div className="mb-3">
                <input
                    type="number"
                    className="form-control"
                    name="price"
                    placeholder={currentProduct.price}
                    aria-describedby="text"
                    onChange={handleOnChange}
                />
            </div>
            <div className="mb-3">
                <select
                    type="text"
                    className="form-control"
                    name="category"
                    placeholder={currentProduct.category}
                    aria-describedby="text"
                    onChange={handleOnChange}
                    >
                        <option value="">--Please choose a category--</option>
                        <option value="Living Room">Living Room</option>
                        <option value="Bedroom">Bedroom</option>
                        <option value="Dining Room">Dining Room</option>
                        <option value="Home Office">Home Ofiice</option>
                        <option value="Outdoor">Outdoor</option>
                        <option value="Decor">Decor</option>
                </select>
            </div>
            <div className="mb-3">
                <textarea
                    type="text"
                    className="form-control"
                    name="description"
                    placeholder={currentProduct.description}
                    aria-describedby="text"
                    rows={4}
                    cols={30}
                    onChange={handleOnChange}
                />
            </div>
            <button
                type="submit"
                className="btn btn-success float-end"
                disabled={isDisabled}
                >Save changes
            </button>
        </form>
        </div>
    </div>
    );
};
export default UpdateProductForm;
