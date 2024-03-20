import { Product } from './Product'
import '../styles/ProductsContainer.css'
export const ProductsContainer = ({ products }) => {
    return (
        <div className='products-container'>     
                {products.map((product) => (
                    <Product
                        key={product.id}
                        id={product.id_product}
                        product_name={product.product_name}
                        product_price={product.price}
                        stock={product.hasStock}
                    />
                ))}
        </div>
    )
}
export default ProductsContainer
