import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import ProductServices from "../services/ProductServices"
import { MdOutlineVerified } from "react-icons/md"
import { FaInstagram } from "react-icons/fa"

import { Footer } from "../components/Footer"
import { NavBar } from "../components/NavBar"
import { Rating } from "react-simple-star-rating"
import Loading from "../components/Loading"
import axios from "axios"
import { ItemContainer } from "../components/ItemContainer"

import '../styles/ShopPage.css'

const ShopPage = () => {

    const rif = useParams().rif

    const [shop, setShop] = useState(null)
    const [shopProducts, setShopProducts] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:5000/shops/${rif}`).then((response) => {
            setShop(response.data)
        })

        axios
            .get(`http://localhost:5000/consolidated/${rif}`)
            .then((response) => {
                setShopProducts(response.data)
            })
    }, [rif])

    console.log(shopProducts, 'shopProducts')

    return (shop == null) ? (<><NavBar /> <Loading /></>) :
    (
        <>
        <NavBar />
        <div className="shop-info-container">

            <h1>{shop.name}</h1> 
            <Rating initialValue={shop.rating} readonly allowFraction/>
            <h2> TIENDA {(shop.verified) ? '' :'NO'} VERIFICADA {(shop.verified) ? <MdOutlineVerified size={30}/> : <></>} </h2> 
            <h2>Ubicanos:</h2>
            <h3>{shop.address}</h3>
            <h3> {(shop.hasDelivery) ? 'SI' :'NO'} tenemos delivery</h3>
            <h3> Contactanos: </h3>
            <p>{shop.phone}</p>
            <Link>{shop.website}</Link>

            <FaInstagram size={30} className="insta"/> {shop.socialMedia}

            <h2>Productos que vende la tienda: </h2>
            <ItemContainer items={shopProducts}/> 

        </div>
        <Footer />
        </>
    )
}

export default ShopPage