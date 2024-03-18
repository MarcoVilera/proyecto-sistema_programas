import '../styles/NavBar.css'
import { Route, Routes, NavLink, Link } from 'react-router-dom'
import { FaCartPlus } from 'react-icons/fa'
// import { useEffect, useState } from 'react'
import { About } from '../pages/About'

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

    const loged = localStorage.getItem('username')
    console.log(loged)
    return (
        <>
            <header>
                <div className="header-title">
                    <div className="title">
                        <FaCartPlus size={'5em'} />
                        <h1>Insert Name</h1>
                    </div>
                    {loged ? (
                        <div className="header-user">
                            <p>Bienvenido de vuelta, {loged}!</p>
                            <button
                                className="register-btn"
                                onClick={() => {
                                    localStorage.removeItem('username')
                                    window.location.reload()
                                }}>
                                Log out
                            </button>
                        </div>
                    ) : (
                        <div className="header-buttons">
                            <Link to="/Login">
                                <button className="login-btn">Log in</button>
                            </Link>
                            <Link to="/Register">
                                <button className="register-btn">
                                    Register
                                </button>
                            </Link>
                        </div>
                    )}
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
