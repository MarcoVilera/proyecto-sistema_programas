
import { Link, useNavigate, useOutletContext, useParams } from "react-router-dom"

import '../styles/ShopInfo.css'
import { Rating } from "react-simple-star-rating";

import { MdOutlineVerified } from "react-icons/md";

const ShopInfo = () => {

    const [ shops, link ] = useOutletContext();

    const rif = useParams().rif
    const navigate = useNavigate()

    const shop = shops.find(shp => shp.rif == rif)

    console.log(shop)

    return (
        <div className="info-bg" 
            onClick={() => navigate(link)}>

            <div className="info-container" onClick={e => e.stopPropagation()}>
                <h1>{shop.name}</h1>
                <h2>{shop.rif}</h2>
                {(shop.verified) ? <MdOutlineVerified size={30}/> : <></>}
                <h3>Del Municipio {shop.municipality}</h3>
                <Rating initialValue={shop.rating} allowFraction readonly/>
                <Link to={`/shop/${rif}`} className="redirect">
                    Ver mas informacion ...
                </Link>
            </div>

        </div>
    )

}

export default ShopInfo