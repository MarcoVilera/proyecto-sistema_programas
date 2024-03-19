import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import ProductServices from "../services/ProductServices"

import { Footer } from "../components/Footer"
import { NavBar } from "../components/NavBar"



const ShopPage = () => {

    const rif = useParams().rif
    console.log(rif)

    const [shop, setShop] = useState({})

    useEffect(() => {
        ProductServices.getShop(rif)
        .then(resposne => setShop(resposne))
    }, [])

    console.log(shop)

    return (
        <>
            <NavBar />

            <h1>{shop.name}</h1>

            <Footer />
        </>
    )
}

export default ShopPage