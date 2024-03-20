import { Rating } from 'react-simple-star-rating'
import {Link } from 'react-router-dom'
import '../styles/Item.css'
import capitalize from '../utils/capitalize.js'
export const Item = ({ name, price, rating, category, url, product_id}) => {
    /*
    {
        input: '',
        category: '',
        price: 0,
        rating: 0,
    }
    */
    return (
        <Link className="item-link" to={`/Product/${product_id}`}>
            <div className="item">
                <img src={url} alt={name} />
                <h3>{capitalize(name)}</h3>
                {/* <span className='item-shop_name'>{capitalize(shopName)}</span> */}
                <p>{price}$</p>
                {/* <Rating initialValue={rating} size={30} allowFraction readonly /> */}
                <hr />
                <div className="category-div">
                    <span className="item-category">{category}</span>
                </div>
            </div>
        </Link>    
    )
}
