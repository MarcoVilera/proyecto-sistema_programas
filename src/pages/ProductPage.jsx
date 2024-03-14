
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router"
import { Link } from "react-router-dom";

const url = `http://localhost:5000/products/`

const ProductPage = () => {

    const id = useParams().productID;

    const [data, setData] = useState([])

    useEffect(() => {
        axios.get(`${url}/${id}`)
        .then(response => {
            setData(response.data)
            return response.data
        })
        .then(data => {
            
        })
    }, [])

    return (
        <>
            <h1>
                Product Page {id}
            </h1>

            <p>
                {data.name}
            </p>

            <Link to={'/'}> Back </Link>
        </>
    )
}

export default ProductPage