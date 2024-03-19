
import { Link, useNavigate, useOutletContext, useParams } from "react-router-dom"

import '../styles/ShopInfo.css'

const ShopInfo = () => {

    const [ shops, link ] = useOutletContext();

    const rif = useParams().rif
    const navigate = useNavigate()

    const shop = shops.find(shp => shp.rif == rif)
    console.log(shop)

    // const handleBackground = (e) => {
    //     e.stopPropagation
    //     navigate(link)
    // }

    return (
        <Link to={link} onClick={e => e.stopPropagation}>
            <div className="info-bg">
                <div className="info-container">
                    <Link to={`/shop/${rif}`}>
                        Ver mas informacion ...
                    </Link>
                </div>
            </div>
        </Link>
    )

}

export default ShopInfo