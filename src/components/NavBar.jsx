import '../styles/NavBar.css'
import { Route, Routes, NavLink, useLocation } from 'react-router-dom'
import { FaCartPlus } from 'react-icons/fa'
// import { useEffect, useState } from 'react'
import { About } from './About'
// const testcategorys = [
//     {
//         id: 1,
//         name: 'Componentes',
//     },
//     {
//         id: 2,
//         name: 'Telefonos',
//     },
//     {
//         id: 3,
//         name: 'Pc',
//     },
//     {
//         id: 4,
//         name: 'Laptops',
//     },
//     {
//         id: 5,
//         name: 'Tiendas',
//     },
//     {
//         id: 6,
//         name: 'Trending',
//     },
// ]
export const NavBar = () => {
    const location = useLocation()
    console.log(location.pathname.replace('/', ''))
    // const [testcategorys, setTestcategorys] = useState([])
    // useEffect(() => {
    //     fetch('http://127.0.0.1:5000/categoriess')
    //         .then((response) => response.json())
    //         .then((data) => {
    //             console.log(data)
    //             setTestcategorys(data)
    //         })
    // }, [])

    return (
        <>
            <header>
                <div className="header-title">
                    <div className="title">
                        <FaCartPlus size={'5em'} />
                        <h1>Insert Name</h1>
                    </div>
                    <div className="header-buttons">
                        <button className="login-btn">Login</button>
                        <button className="register-btn">Register</button>
                    </div>
                </div>
                <nav>
                    <ul>
                        {/* {testcategorys.map((category) => (
                            <li key={category.id}>
                                <NavLink to={`/${category.name.toLowerCase()}`}>
                                    {category.name}
                                </NavLink>
                            </li>
                        ))} */}
                        <li>
                            <NavLink to="/">Inicio</NavLink>
                        </li>
                        <li>
                            <NavLink to="/about">Sobre nosotros</NavLink>
                        </li>

                    </ul>
                </nav>
            </header>
            <Routes>
                <Route path="/about" element={<About />} />
            </Routes>
        </>
    )
}
