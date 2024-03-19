import { Link, useNavigate } from 'react-router-dom'

import axios from 'axios'
import '../styles/Login.css'
import { useEffect } from 'react'

export const Login = () => {

    const navigate = useNavigate()
    useEffect(() => {
        if (localStorage.getItem('username')) {
            navigate('/')
        }
    })
    
    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await axios.post('http://localhost:5000/users/', {
                username: e.target.username.value,
                password: e.target.password.value,
            })

            if (response.status === 200) {
                alert('login exitoso')
                localStorage.setItem('username', e.target.username.value)
                const rif = response.data.rif
                if (response.data) {
                    localStorage.setItem('rif', rif)
                }
                navigate(`/Dashboard/${rif}`)
            }
            if (response.status != 200) {
                alert('login fallido')
            }
        } catch (error) {
            alert('login fallido')
        }
    }
    return (
        <div className="login-container">
            <div className="login-box">
                <div className="login-title">
                    <h1>INICIA SESIÓN</h1>
                    <h2>en InsertName</h2>
                </div>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="username">Nombre de usuario</label>
                    <input
                        type="text"
                        placeholder="Introduce tu usuario"
                        id="username"
                        autoComplete="username"
                    />
                    <label htmlFor="password">Contraseña</label>
                    <input
                        type="password"
                        placeholder="********"
                        id="password"
                    />
                    <div className="login-bottom">
                        <button>Iniciar Sesión</button>
                        <p>
                            ¿No tienes cuenta?
                            <br />
                            <Link to="/Register">Registrate</Link> y Unete a la
                            Comunidad
                        </p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login
