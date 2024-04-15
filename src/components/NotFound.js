import { Link } from "react-router-dom";

const NotFound= ()=>{
    return(
    <div className="container text-center mt-5">
        <h1>Page Not Found</h1>
        <Link to='/'>Back to the Home page</Link>
    </div>)
}
export default NotFound;