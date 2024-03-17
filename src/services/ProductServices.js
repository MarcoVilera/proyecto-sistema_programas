
import axios from "axios"

const url = `http://localhost:5000`

const getData = (id) => 
    axios.get(`${url}/products/${id}`)
    .then(response => response.data)

const getCons = (id) =>
    axios.get(`${url}/consolidated`)
    .then(response => {
        return response.data.filter(cons => (cons.id_product == id && cons.hasStock))
    })

const getShop = (con) =>
    axios.get(`${url}/shops`)
    .then(response => response.data.find(shop => shop.rif == con.shop_rif))

const getMuns = () => 
    axios.get(`${url}/municipalities`)
    .then(response => response.data)


export default { getData, getCons, getShop, getMuns }