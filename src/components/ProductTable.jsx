
import { useEffect, useState } from "react"
import ProductServices from "../services/ProductServices"

import { Rating } from "react-simple-star-rating";
import { MdOutlineVerified } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import { ImCross } from "react-icons/im";

import '../styles/ProductTable.css'

const test = [
    {
      "hasStock": true,
      "id": 4,
      "id_product": 1,
      "price": 10.0,
      "shop_rif": "J-123456789",
      "url": "Testurl.Com"
    },
    {
      "hasStock": true,
      "id": 5,
      "id_product": 2,
      "price": 200.0,
      "shop_rif": "J-123456789",
      "url": "Testurl.Com"
    },
    {
      "hasStock": true,
      "id": 6,
      "id_product": 1,
      "price": 70.0,
      "shop_rif": "J-123456289",
      "url": "Testurl.Com"
    }
  ]

const TableRow = ({ con, showAll }) => {

    const [shop, setShop] = useState([])
    
    useEffect(() => {
        ProductServices.getShop(con)
        .then(response => setShop(response))
    }, [])

    if (!shop.verified && showAll) return <></>
    
    return (
        <tr>
            <td> 
                {(shop.verified) ? <MdOutlineVerified /> : <></>}
            </td>
            <td> {shop.name} </td>
            <td> municipality_id </td>
            <td> <Rating size={20} initialValue={shop.rating} allowFraction readonly /> </td>
            <td> 
                {(shop.hasDelivery) ? <FaCheck /> : <ImCross />}
            </td>
            <td> {`${con.price} $`} </td>
        </tr>
    )
}

const ProductTable = ({ id, showAll }) => {

    const [cons, setCons] = useState([])

    useEffect(() => {
        ProductServices.getCons(id)
        .then(response => setCons(response.concat(test)))
    }, [])

    return(
        <table>
            <thead>
                <tr>
                    <th></th> 
                    <th>TIENDA</th> 
                    <th>MUNICIPIO</th> 
                    <th>RATING</th> 
                    <th>DELIVERY</th> 
                    <th>PRECIO</th> 
                </tr>
            </thead>
            <tbody>
                {cons.toSorted((a, b) => a.price - b.price).map(con => 
                    <TableRow key={con.id} con={con} showAll={showAll}/>)}
            </tbody>
        </table>
    )
}



export default ProductTable