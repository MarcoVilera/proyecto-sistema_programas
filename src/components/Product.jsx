import { Link } from 'react-router-dom'
import { FaCheck, FaTimes } from 'react-icons/fa'
import { HiOutlinePencil } from "react-icons/hi";

import '../styles/Product.css'
export const Product = ({ id, product_name, product_price, stock }) => {
    return (
        <div className="dashboard-product">
                <Link to={`/product/${id}`}>
                    <p>{product_name}</p>
                </Link>
                <p>{product_price}$</p>
            {stock ? <FaCheck color="white" /> : <FaTimes color="white" />}
                <button>
                    <HiOutlinePencil color='white' size={20}/>
                </button>
            </div>
    )
}
