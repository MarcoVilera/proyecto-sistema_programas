import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

const url = 'http://localhost:5000/products/'

const HomePage = () => {

    const [products, setProducts] = useState([])

    useEffect(() => {
        axios.get(url)
        .then(response => {
            setProducts(response.data);
        })
    }, [])

    console.log(products)

    return (
        <>
            <h1>
                Home Page
            </h1>

            {products.map(product => (
                <Link key={product.id} to={`/Product/${product.id}`}> {product.name} </Link> 
            ))}
        </>
    )
}

export default HomePage