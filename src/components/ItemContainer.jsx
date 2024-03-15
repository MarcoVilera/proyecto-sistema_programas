import { Item } from './Item'
import '../styles/ItemContainer.css'
// const testItems = [
//     {
//         id: 1,
//         name: 'item1',
//         price: 100,
//         rating: 4,
//         category: 'category1',
//         thumbnail:
//             'https://via.assets.so/img.jpg?w=300&h=300&tc=blue&bg=#cecece',
//     },
//     {
//         id: 2,
//         name: 'item2',
//         price: 200,
//         rating: 3,
//         category: 'category2',
//         thumbnail:
//             'https://via.assets.so/img.jpg?w=300&h=300&tc=blue&bg=#cecece',
//     },
//     {
//         id: 3,
//         name: 'item3',
//         price: 300,
//         rating: 2,
//         category: 'category3',
//         thumbnail:
//             'https://via.assets.so/img.jpg?w=300&h=300&tc=blue&bg=#cecece',
//     },
//     {
//         id: 4,
//         name: 'item4',
//         price: 400,
//         rating: 1,
//         category: 'category4',
//         thumbnail:
//             'https://via.assets.so/img.jpg?w=300&h=300&tc=blue&bg=#cecece',
//     },
//     {
//         id: 5,
//         name: 'item5',
//         price: 500,
//         rating: 5,
//         category: 'category5',
//         thumbnail:
//             'https://via.assets.so/img.jpg?w=300&h=300&tc=blue&bg=#cecece',
//     },
//     {
//         id: 6,
//         name: 'item6',
//         price: 600,
//         rating: 4,
//         category: 'category6',
//         thumbnail:
//             'https://via.assets.so/img.jpg?w=300&h=300&tc=blue&bg=#cecece',
//     },
// ]

export const ItemContainer = ({ items, }) => {
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
                    name={item.product_name}
                    price={item.price}
                    rating={item.rating}
                    category={item.category_name}
                    url={item.url}
                />
            ))}
        </div>
    )
}
