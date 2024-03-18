import { Link, useNavigate } from 'react-router-dom'

import axios from 'axios'
import '../styles/Login.css'
import { useEffect } from 'react'

export const Register = () => {
    const navigate = useNavigate()
    useEffect(() => {
        if (localStorage.getItem('username')) {
            navigate('/')
        }
    })

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await axios.post('http://localhost:5000/users/new', {
                username: e.target.username.value,
                password: e.target.password.value,
                email: e.target.email.value,
                rif: e.target.rif.value,
            })

            if (response.status === 201) {
                alert('registro exitoso')
                navigate('/login')
            }
            if (response.status != 201) {
                alert('registro fallido')
            }
        } catch (error) {
            alert('login fallido')
        }
    }
    return (
        <div className="login-container">
            <div className="login-box">
                <div className="login-title">
                    <h1>REGISTRATE</h1>
                    <h2>en InsertName</h2>
                </div>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="username">Nombre de usuario</label>
                    <input
                        type="text"
                        placeholder="Introduce tu usuario"
                        id="username"
                        autoComplete="username"
                        required
                    />

                    <label htmlFor="email">Correo Electronico</label>
                    <input
                        type="text"
                        placeholder="correo@gmail.com"
                        id="email"
                        autoComplete="email"
                        required
                    />

                    <label htmlFor="rif">RIF</label>
                    <input
                        type="text"
                        placeholder="Introduce tu RIF"
                        id="rif"
                        autoComplete="rif"
                        required
                    />

                    <label htmlFor="password">Contraseña</label>
                    <input
                        type="password"
                        placeholder="********"
                        id="password"
                        required
                    />
                    <div className="login-bottom">
                        <button>Registrarte</button>
                        <p>
                            ¿Ya tienes cuenta?
                            <br />
                            <Link to="/Login">Inicia sesión</Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Register
