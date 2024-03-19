import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import ProductServices from "../services/ProductServices"
import { MdOutlineVerified } from "react-icons/md"
import { FaInstagram } from "react-icons/fa"

import { Footer } from "../components/Footer"
import { NavBar } from "../components/NavBar"
import { Rating } from "react-simple-star-rating"



const ShopPage = () => {

    const rif = useParams().rif

    const [shop, setShop] = useState({})

    useEffect(() => {
        ProductServices.getShop(rif)
        .then(resposne => setShop(resposne))
    }, [])

    console.log(shop)

    return (
        <>
            <NavBar />

            <h1>{shop.name} <Rating initialValue={shop.rating} readonly allowFraction/></h1> 
            <h2> TIENDA {(shop.verified) ? '' :'NO'} VERIFICADA {(shop.verified) ? <MdOutlineVerified size={30}/> : <></>} </h2> 
            <h2>Ubicanos:</h2>
            <h3>{shop.address}</h3>
            <h3> {(shop.hasDelivery) ? 'SI' :'NO'} tenemos delivery</h3>
            <h3> Contactanos: </h3>
            <p>{shop.phone}</p>
            <Link>{shop.website}</Link>

            <FaInstagram /> {shop.socialMedia}

            <h3>Productos que vende la tienda: </h3>

            <Footer />
        </>
    )
}

export default ShopPage