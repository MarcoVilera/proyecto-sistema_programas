
import { Rating } from "react-simple-star-rating";
import { MdOutlineVerified } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import { ImCross } from "react-icons/im";

import '../styles/ProductTable.css'
import { NavLink } from "react-router-dom";

const TableRow = ({ shop,  showAll }) => {

    if (!shop.verified && showAll) return <></>
    
    return (
        <tr>
            {/* <NavLink to={'shopagelink.com'}> */}

                <td> 
                    {(shop.verified) ? <MdOutlineVerified /> : <></>}
                </td>
                <td> {shop.name} </td>
                <td> {shop.municipality} </td>
                <td> <Rating size={20} initialValue={shop.rating} allowFraction readonly /> </td>
                <td> 
                    {(shop.hasDelivery) ? <FaCheck /> : <ImCross />}
                </td>
                <td> {`${shop.price} $`} </td>
            {/* </NavLink> */}
        </tr>
    )
}

const ProductTable = ({ shops, showAll }) => {
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

                {shops.sort((a,b) => a.price - b.price).map((shop, i) => 
                    <TableRow key={i} shop={shop} showAll={showAll}/>)}

            </tbody>
        </table>
    )
}

export default ProductTable