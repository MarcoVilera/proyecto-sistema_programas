import { Item } from './Item'
import '../styles/ItemContainer.css'

export const ItemContainer = ({ items }) => {
    console.log('items', items)
    /*
    {
        input: '',
        category: '',
        price: 0,
        rating: 0,
    }
    */

    return (
        <div className="item-container">
            {items.map((item) => (
                <Item
                    key={item.id}
                    name={item.name}
                    price={item.lowest_price}
                    rating={item.rating}
                    category={item.category}
                    url={item.url}
                    id={item.id}
                    shopName={item.shopName}
                    product_id={item.id_product}
                />
            ))}
        </div>
    )
}
