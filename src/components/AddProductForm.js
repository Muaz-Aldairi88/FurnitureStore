// is Disabled method
import { useContext, useMemo } from "react";
import { Context } from "../context";
import FireStore from "../handlers/firestore";
import Storage from "../handlers/storage";

const {writeDoc}=FireStore;

const {uploadProductImg, downloadProductImg}=Storage;

// to preview the product image before submitting
const ProductImgPreview = ({ path }) => {
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

const AddProductForm = () => {

    const {state,dispatch}=useContext(Context);

    // to handle the new product's info 
    const handleOnChange= (e) => dispatch({type:"SET_ADD_PRODUCT_FORM_INPUTS", payload: {value: e} })

    // to handle the new product's submission
    const handleOnSubmit=(e) =>{
        e.preventDefault();
        // uploading the product image to the firebase storage using 
        uploadProductImg(state.addProductFormInputs)
        // downloading the product image from the firebase storage using
        .then(downloadProductImg)
        // storing the product info in the database and updating the state in the context by adding the product
        .then(url=>{
            writeDoc({...addProductFormInputs, path:url},'products').then(()=>{
                dispatch({
                    type:"SET_PRODUCT"
                })
                dispatch({
                    type:"SET_ADD_PRODUCT_FORM_VISIBLE",
                    payload:{bool: false} ,
                })
            })
        });
    };

    // to prevent submitting before providing all info (Submit btn)
    // destructuring the current state
    const{addProductFormInputs}=state
    const isDisabled = useMemo(() => {
        return Object.values(state.addProductFormInputs).some(
            (addProductFormInputs) => !addProductFormInputs);
    }, [state.addProductFormInputs]);

    return (
    <div className="mt-3">
        <p className="display-6 text-center mb-3">Add New Product</p>
        <div className="mb-5 d-flex align-items-center justify-content-center">
        <ProductImgPreview {...state.addProductFormInputs} />
        <form
            className="mb-2"
            style={{ textAlign: "left" }}
            onSubmit={handleOnSubmit}>
            <div className="mb-3">
                <input
                    type="text"
                    className="form-control"
                    name="title"
                    placeholder="title"
                    aria-describedby="text"
                    onChange={handleOnChange}
                />
            </div>
            <div className="mb-3">
                <input
                    type="number"
                    className="form-control"
                    name="price"
                    placeholder="price"
                    aria-describedby="text"
                    onChange={handleOnChange}
                />
            </div>
            <div className="mb-3">
                <select
                    type="text"
                    className="form-control"
                    name="category"
                    placeholder="category"
                    aria-describedby="text"
                    onChange={handleOnChange}>
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
                    placeholder="description"
                    aria-describedby="text"
                    rows={4}
                    cols={30}
                    onChange={handleOnChange}
                />
            </div>
            <div className="mb-3">
                <input
                    type="file"
                    className="form-control"
                    name="file"
                    onChange={handleOnChange}
                />
            </div>
            <button
                type="submit"
                className="btn btn-success float-end"
                disabled={isDisabled}>Save changes
            </button>
        </form>
        </div>
    </div>
    );
};
export default AddProductForm;
