
import axios from 'axios'
import { useState, useEffect } from 'react'
import { Rating } from 'react-simple-star-rating'
import '../styles/SideBar.css'
import { Tooltip } from '@mui/material'

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

    const [selectedCategory, setSelectedCategory] = useState(null)

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value)
        onFilter({ category: event.target.value })
    }

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
                                // onClick={(event) =>{

                                //     console.log(event.target.value, 'categoryyyyyyyyyyyyyyyyyyyyyyyyyyyyyy');
                                //     onFilter({ category: event.target.value })
                                // }
                                // }
                                checked={selectedCategory === category.name}
                                onChange={handleCategoryChange}
                            />
                            {category.name}
                        </label>
                    ))}
                </form>
            </div>
            <h3>Rango de precio</h3>
            {/* <p> Precio maximo: {setMaxPrice} $</p> */}
            <div className="slider-div">
                <span>0</span>
                <Tooltip
                title={price}
                    slotProps={{
                        popper: {
                            modifiers: [
                                {
                                    name: 'offset',
                                    options: {
                                        offset: [0, -18],
                                    },
                                },
                            ],
                        },
                    }} placement='top'>
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
                </Tooltip>
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
