import { Rating } from 'react-simple-star-rating'
import { Route, Routes } from 'react-router-dom'
import '../styles/Item.css'
import capitalize from '../utils/capitalize.js'
export const Item = ({ name, price, rating, category, url}) => {
    /*
    {
        input: '',
        category: '',
        price: 0,
        rating: 0,
    }
    */
    return (
        <>
            <a className="item-link" href="#">
                <div className="item">
                    <img src={url} alt={name} />
                    <h3>{capitalize(name)}</h3>
                    <p>{price}$</p>
                    <hr />
                    <Rating initialValue={rating} allowFraction readonly />
                    <div className="category-div">
                        <span className="item-category">{category}</span>
                    </div>
                </div>
            </a>
            <Routes>
                <Route path="/item/:id" element={<Item />} />
            </Routes>
        </>
    )
}
