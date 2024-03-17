
import { useEffect, useState } from "react";
import { useParams } from "react-router"
import { Link } from "react-router-dom";

import ProductServices from '../services/ProductServices'

import ProductTable from '../components/ProductTable'

const ProductPage = () => {

    const id = useParams().productID;

    const [data, setData] = useState([])

    useEffect(() => {
        ProductServices.getData(id)
        .then(response => setData(response))
    }, [])

    return (
        <>
            <h2> Producto: {data.name} id {data.id} </h2>

            <ProductTable id={id}/>

            <Link to={'/'}> Back </Link>
        </>
    )
}

export default ProductPage