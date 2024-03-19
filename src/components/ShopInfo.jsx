import { useEffect } from "react"
import ProductServices from "../services/ProductServices"
import { Link, useParams } from "react-router-dom"

const ShopInfo = () => {

    const rif = useParams().rif

    const [shop, setShop] = useState(null)

    useEffect(() => {
        ProductServices.getShop(rif)
        .then(shp => setShop(shp))
    })

    return (
        <div>
            <Link to={`/shop/${rif}`}>
                Ver mas informacion ...
            </Link>
        </div>
    )

}