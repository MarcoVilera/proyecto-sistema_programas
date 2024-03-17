
import { useEffect, useState } from "react"
import ProductServices from "../services/ProductServices"

import { MdOutlineVerified } from "react-icons/md";
import { GoUnverified } from "react-icons/go";
import { FaCheck } from "react-icons/fa";
import { ImCross } from "react-icons/im";

const TableRow = ({ con }) => {

    const [shop, setShop] = useState([])
    
    useEffect(() => {
        ProductServices.getShop(con)
        .then(response => setShop(response))
    }, [])
    
    return (
        <tr>
            <td> 
                {(shop.verified) ? <MdOutlineVerified /> : <GoUnverified />}
            </td>
            <td> {shop.name} </td>
            {/* <td> {shop.municipality_id} </td> */}
            <td> {shop.municipality_id} </td>
            <td> {shop.rating} </td>
            <td> 
                {(shop.hasDelivery) ? <FaCheck /> : <ImCross />}
            </td>
            <td> {con.price} </td>
        </tr>
    )
}

const ProductTable = ({ id }) => {

    const [cons, setCons] = useState([])

    useEffect(() => {
        ProductServices.getCons(id)
        .then(respone => setCons(respone))
    }, [])

    return(
        <table>
            <thead>
                <tr>
                    <th>VERFICADO</th> 
                    <th>TIENDA</th> 
                    <th>MUNICIPIO</th> 
                    <th>RATING</th> 
                    <th>DELIVERY</th> 
                    <th>PRECIO</th> 
                </tr>
            </thead>
            <tbody>
                {cons.sort((a, b) => a.price - b.price).map(con => 
                    <TableRow key={con.id} con={con}/>)}
            </tbody>
        </table>
    )
}



export default ProductTable