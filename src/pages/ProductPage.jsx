
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router"
import { Link } from "react-router-dom";

const url = `http://localhost:5000`

const ProductPage = () => {

    const id = useParams().productID;

    const [data, setData] = useState([])
    const [cons, setCons] = useState([])
    const [shops, setShops] = useState([])

    useEffect(() => {
        axios.get(`${url}/products/${id}`)
        .then(response => {

            const newData = response.data
            setData(newData)

            axios.get(`${url}/consolidated`)
            .then(response => {

                const validCons = response.data.filter(cons => cons.id_product == id)
                setCons(validCons)
            })
        })

        axios.get(`${url}/shops`)
        .then(response => {
            setShops(response.data)
        })
    }, [])

    return (
        <>
            <h1>
                Product Page {id}
            </h1>

            <h2>
                Producto: {data.name}
            </h2>

            <ul>
                {cons.map(con => {

                    const shop = shops.find(shop => shop.rif === con.shop_rif) 

                    // console.log(shop.verified)
                
                    return (<li key={con.id}> {shop.name}: {con.price}$ - rating {shop.rating} - tiene delivery: {(shop.hasDelivery) ? 'SI' : 'NO'} - verificado: {(shop.hasDelivery) ? 'SI' : 'NO'}</li> )
                })}
            </ul>

            <Link to={'/'}> Back </Link>
        </>
    )
}

export default ProductPage