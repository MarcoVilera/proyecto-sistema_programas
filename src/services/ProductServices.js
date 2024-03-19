
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

const getShop = (rif) =>
    axios.get(`${url}/shops/${rif}`)
    .then(response => response.data)

export default { getData, getCons, getShop }