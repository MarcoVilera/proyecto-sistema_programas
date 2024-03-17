import { Link } from "react-router-dom";

const ErrorPage = () => (
    <>
        <p> 404 not Found </p>
        <Link to={'/'}> Home </Link>
    </>
)

export default ErrorPage