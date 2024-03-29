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
import ShopPage from './pages/ShopPage'
import ShopInfo from './components/ShopInfo'

import Dashboard from './pages/Dashboard'

const router = createBrowserRouter([
    {
        path: '/',
        element: <Index />,
        errorElement: <ErrorPage />,
    },
    {
        path: '/about',
        element: <About />,
    },
    {
        path: '/shop/:rif',
        element: <ShopPage />,
    },
    {
        path: '/Product/:productID',
        element: <ProductPage />,
        children: [
            {
                path: '/Product/:productID/:rif',
                element: <ShopInfo />
            }
        ]
    },
    {
        path: '/Login',
        element: <Login />,
    },
    {
        path: '/Register',
        element: <Register />,
    },
    {
        path: '/Dashboard/:shopRif',
        element: <Dashboard />,
    },
])

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
)
