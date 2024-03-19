import '../styles/NavBar.css'
import { Route, Routes, NavLink, Link, useNavigate} from 'react-router-dom'
import { FaCartPlus } from 'react-icons/fa'

import { About } from '../pages/About'

export const NavBar = () => {

    const loged = localStorage.getItem('username')
    const navigate = useNavigate()
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
                            <button className='login-btn'
                                onClick={() => {
                                    navigate ( `/Dashboard/${localStorage.getItem('rif')}`)
                                }}
                            >
                                DashBoard
                            </button>
                            <button
                                className="register-btn"
                                onClick={() => {
                                    localStorage.removeItem('username')
                                    localStorage.removeItem('rif')
                                    navigate('/')
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
