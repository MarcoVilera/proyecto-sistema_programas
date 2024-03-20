import { ItemContainer } from '../components/ItemContainer'
import { NavBar } from '../components/NavBar'
import { SearchBar } from '../components/SearchBar'
import { Sidebar } from '../components/SideBar'
import '../styles/index.css'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Footer } from '../components/Footer'
import Loading from '../components/Loading'

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
            .get('http://127.0.0.1:5000/products/')
            .then((response) => {
                setItems(response.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])

    // console.log('filtros', filter)
    const removedItems = items.filter((item) => { return item.lowest_price > 0 })

    const filteredItems = removedItems.filter((item) => {
        return (
            (filter.input === '' || item.product_name.toLowerCase().includes(filter.input)) &&
            (filter.category === '' ||
                item.category_name === filter.category) &&
            (filter.price === 0 || item.price <= filter.price) &&
            (filter.rating === 0 || item.rating >= filter.rating)
        )
    })
    const maxPrice = Math.max(...items.map((item) => item.lowest_price))
    console.log(filter.price)
    console.log('items', removedItems)
    // console.log('maxPrice', maxPrice)
    // console.log('items filtrados', filteredItems)
    return (
        <>
            <NavBar />

            {items.length === 0 ? (
                <Loading />
            ) : (
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
                            // setMaxPrice={filter.price}
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
            )}

            <Footer />
        </>
    )
}

export default Index