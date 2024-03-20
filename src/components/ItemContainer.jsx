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

    const remap = items.map(item => (item.lowest_price == undefined) ? 
        {
            ...item,
            id: item.id_product,
            name: item.product_name,
            category: item.category_name,
            lowest_price: item.price

        } : item
    )

    console.log(remap, 'remap')

    return (
        <div className="item-container">
            {remap.map((item) => (
                <Item
                    key={item.id}
                    name={item.name}
                    price={item.lowest_price}
                    rating={item.rating}
                    category={item.category}
                    url={item.url}
                    id={item.id}
                    product_id = {item.id}
                />
            ))}
        </div>
    )
}
