import { Rating } from 'react-simple-star-rating'
import '../styles/SideBar.css'
import { useState, useEffect } from 'react'
import axios from 'axios'
export const Sidebar = ({ max = 100, onFilter }) => {
    const [price, setPrice] = useState(0)
    const [rating, setRating] = useState(0)
    const [categories, setCategories] = useState([])
    const handleReset = () => {
        onFilter({ category: '', price: 0, rating: 0 })
        setPrice(0)
        setRating(0)
    }
    const handleRating = (rate) => {
        setRating(rate)
        onFilter({ rating: rate })
    }
    useEffect(() => {
        axios.get('http://127.0.0.1:5000/categories').then((response) => {
            setCategories(response.data)
        })
    }, [])

    return (
        <div className="sidebar-container">
            <h2>Filtros</h2>
            <div className="filter-div">
                <h3>Categorias</h3>
                <form className="select-form">
                    {categories.map((category) => (
                        <label key={category.id} className="custom-radio">
                            <input
                                type="radio"
                                name="categories"
                                value={category.name}
                                onClick={(event) =>
                                    onFilter({ category: event.target.value })
                                }
                            />
                            {category.name}
                        </label>
                    ))}
                </form>
            </div>
            <h3>Rango de precio</h3>
            <div className="slider-div">
                <span>0</span>
                <input
                    type="range"
                    id="price"
                    name="price"
                    min="0"
                    max={max}
                    value={price}
                    onChange={(e) => {
                        setPrice(e.target.value)
                        onFilter({ price: parseInt(e.target.value) })
                    }}
                />

                <span>{max}</span>
            </div>
            <h3>Rating</h3>
            <div className="rating-div">
                <Rating
                    allowFraction
                    size={'2rem'}
                    initialValue={rating}
                    onClick={handleRating}
                />
            </div>
            <button className="reset-button" onClick={handleReset}>
                Reset
            </button>
            <img
                src="https://via.assets.so/img.jpg?w=180&h=600&tc=#323232&bg=#cecece&t=AD"
                alt=""
            />
        </div>
    )
}
