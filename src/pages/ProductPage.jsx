
import { useEffect, useState } from "react";
import { useParams } from "react-router"
import { Link, Outlet } from "react-router-dom";

import { MdOutlineRadioButtonChecked, MdOutlineRadioButtonUnchecked  } from "react-icons/md";

import { Rating } from "react-simple-star-rating";
import { Footer } from "../components/Footer";
import { NavBar } from "../components/NavBar";
import ProductTable from '../components/ProductTable'
import ProductServices from '../services/ProductServices'
import { IoIosArrowBack } from "react-icons/io";

import '../styles/ProductPage.css'
import Loading from "../components/Loading";

const ProductPage = () => {

    const id = useParams().productID;

    const [data, setData] = useState([])
    const [showAll, setShowAll] = useState(false)
    
    useEffect(() => {
        ProductServices.getData(id)
        .then(response => setData(response))
    }, [])

    const link = `/Product/${id}`
    

    const handleToggle = () => {
        setShowAll(!showAll)
    }

    console.log(data)

    return (data.length == 0 ) ?
    (<> <NavBar /> <Loading /> </>)  : (
        <>
            <NavBar />
            <div className="wrapper">
                <div>
                    <div className="description">
                        <h2>{data.name}</h2>
                        <h3>{data.manufacturer}</h3>
                        <p>{data.category}</p>
                        <Rating size={20} initialValue={3} allowFraction readonly />
                    </div>
                    <img className="ads"
                    src="https://via.assets.so/img.jpg?w=180&h=600&tc=#323232&bg=#cecece&t=AD"
                    alt=""
                    />
                </div>
                <div className="product-container">

                    <img src={data.url} alt={data.name} />
                    <h2> {data.name} </h2>

                    <div className="filtros">
                        <button onClick={handleToggle} className={`toggle-button ${showAll ? 'on' : 'off'}`}>
                            {showAll ?  <MdOutlineRadioButtonChecked/> : <MdOutlineRadioButtonUnchecked/>} 
                        </button>
                        Solo Verificados
                    </div>

                    {/* Product Table */}
                    <ProductTable shops={data.shops} showAll={showAll} link={link}/>
                    <div className="centered">
                        <Link to={'/'} className="link"> <IoIosArrowBack /> Back </Link>
                    </div>

                </div>
                <img className="ads"
                src="https://via.assets.so/img.jpg?w=180&h=600&tc=#323232&bg=#cecece&t=AD"
                alt=""
                />
            </div>
            <Outlet context={[ data.shops, link ]}/>

            <Footer />
        </>
    )
}

export default ProductPage