import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import './styles/styles.css'

import App from './components/App'
import Index from './pages/Index'
import ProductPage from './pages/ProductPage'
import ErrorPage from './pages/ErrorPage'
import About from './pages/About'
import Login from './pages/Login'
import Register from './pages/Register'
const router = createBrowserRouter([
    {
        path: '/',
        element: <Index />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/about',
                element: <About />,
            },
        ],
    },
    {
        path: '/App',
        element: <App />,
    },
    {
        path: '/Product/:productID',
        element: <ProductPage />,
    },
    {
        path: '/Login',
        element: <Login />,
    },
    {
        path: '/Register',
        element: <Register />,
    }
])

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
)
