import { ItemContainer } from '../components/ItemContainer'
import { NavBar } from '../components/NavBar'
import { SearchBar } from '../components/SearchBar'
import { Sidebar } from '../components/SideBar'
import '../styles/index.css'
import { Outlet, useLocation } from 'react-router-dom'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Footer } from '../components/Footer'

const Index = () => {
    const [items, setItems] = useState([])
    const [filter, setFilter] = useState({
        input: '',
        category: '',
        price: 0,
        rating: 0,
    })

    useEffect(() => {
        axios
            .get('http://127.0.0.1:5000/consolidated/get')
            .then((response) => {
                setItems(response.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])

    console.log('filtros', filter)
    const location = useLocation()

    const filteredItems = items.filter((item) => {
        return (
            (filter.input === '' || item.product_name.includes(filter.input)) &&
            (filter.category === '' ||
                item.category_name === filter.category) &&
            (filter.price === 0 || item.price <= filter.price) &&
            (filter.rating === 0 || item.rating >= filter.rating)
        )
    })
    const maxPrice = Math.max(...items.map((item) => item.price))
    console.log('maxPrice', maxPrice)
    return (
        <>
            <NavBar />
            {location.pathname === '/' ? (
                <>
                    <SearchBar
                        onSearch={(newFilter) =>
                            setFilter((currentFilter) => ({
                                ...currentFilter,
                                ...newFilter,
                                price: currentFilter.price,
                                category: currentFilter.category,
                                rating: currentFilter.rating,
                            }))
                        }
                    />
                    <div className="index-container">
                        <Sidebar
                            max={maxPrice}
                            onFilter={(newFilter) =>
                                setFilter((currentFilter) => ({
                                    ...currentFilter,
                                    ...newFilter,
                                    input: currentFilter.input,
                                    // category: currentFilter.category,
                                    // rating: currentFilter.rating,
                                }))
                            }
                        />
                        <ItemContainer items={filteredItems} filters={filter} />
                        {/* <img
                                src="https://via.assets.so/img.jpg?w=600&h=180&tc=#323232&bg=#cecece&t=AD"
                                alt=""
                            /> */}
                    </div>
                </>
            ) : (
                <Outlet />
            )}
            <Footer/>
        </>
    )
}
export default Index