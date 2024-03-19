import { useParams } from 'react-router-dom'
import axios from 'axios'
import Loading from '../components/Loading'
import { NavBar } from '../components/NavBar'
import { useEffect, useState } from 'react'
import { ProductsContainer } from '../components/ProductsContainer'
import '../styles/Dashboard.css'
import { Footer } from '../components/Footer'
export const Dashboard = () => {
    const [shopProducts, setShopProducts] = useState()
    const [formData, setFormData] = useState()
    const [modified, setModified] = useState(false)
    const rif = useParams().shopRif
    console.log(rif)
    useEffect(() => {
        axios.get(`http://localhost:5000/shops/${rif}`).then((response) => {
            const shopData = response.data
            setFormData({
                name: shopData.name,
                rif: shopData.rif,
                address: shopData.address,
                phone: shopData.phone,
                website: shopData.website,
                socialMedia: shopData.socialMedia,
                hasDelivery: shopData.hasDelivery,
            })
        })

        axios
            .get(`http://localhost:5000/consolidated/${rif}`)
            .then((response) => {
                setShopProducts(response.data)
            })
    }, [rif])

    console.log(shopProducts)
    console.log('form', formData)

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('submit')
        if (modified) {
            axios
                .put(`http://localhost:5000/shops/${rif}`, formData)
                .then((response) => {
                    console.log(response)
                })
        }
    }
    return (
        <>
            <NavBar />
            <div className="dashboard-container">
                {formData ? (
                    <div className="dashboard-form">
                        <h1>Dashboard {formData.name}</h1>
                        <form onSubmit={handleSubmit}>
                            <label htmlFor="name">Nombre</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                readOnly
                            />
                            <label htmlFor="rif">RIF</label>
                            <input
                                type="text"
                                id="rif"
                                name="rif"
                                value={formData.rif}
                                readOnly
                            />
                            <label htmlFor="address">Dirección</label>
                            <input
                                type="text"
                                id="address"
                                name="address"
                                value={formData.address}
                                onChange={(e) => {
                                    if (formData.address !== e.target.value) {
                                        setModified(true)
                                    }
                                    setFormData({
                                        ...formData,
                                        address: e.target.value,
                                    })
                                }}
                            />
                            <label htmlFor="phone">Télefono</label>
                            <input
                                type="text"
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={(e) => {
                                    if (formData.phone !== e.target.value) {
                                        setModified(true)
                                    }
                                    setFormData({
                                        ...formData,
                                        phone: e.target.value,
                                    })
                                }}
                            />
                            <label htmlFor="website">Sitio Web</label>
                            <input
                                type="text"
                                id="website"
                                name="website"
                                value={formData.website}
                                onChange={(e) => {
                                    if (formData.website !== e.target.value) {
                                        setModified(true)
                                    }
                                    setFormData({
                                        ...formData,
                                        website: e.target.value,
                                    })
                                }}
                            />
                            <label htmlFor="social_media">Redes Sociales</label>
                            <input
                                type="text"
                                id="social_media"
                                name="social_media"
                                value={formData.socialMedia}
                                onChange={(e) => {
                                    if (
                                        formData.socialMedia !== e.target.value
                                    ) {
                                        setModified(true)
                                    }
                                    setFormData({
                                        ...formData,
                                        socialMedia: e.target.value,
                                    })
                                }}
                            />
                            <label htmlFor="delivery">Delivery</label>
                            <select
                                name="delivery"
                                id="delivery"
                                value={formData.hasDelivery ? 'true' : 'false'}
                                onChange={(e) => {
                                    if (formData.delivery !== e.target.value) {
                                        setModified(true)
                                    }
                                    let bool = true
                                    if (e.target.value === 'true') {
                                        bool = true
                                    } else {
                                        bool = false
                                    }
                                    setFormData({
                                        ...formData,
                                        delivery: bool,
                                    })
                                }}>
                                <option value="true">Si</option>
                                <option value="false">No</option>
                            </select>
                            {!modified ? null : <button> Modificar</button>}
                        </form>
                    </div>
                ) : (
                    <Loading />
                )}
                <h2>Products</h2>
                {shopProducts ? (
                    <ProductsContainer products={shopProducts} />
                ) : (
                    <Loading />
                )}
            </div>
            <Footer />
        </>
    )
}

export default Dashboard
