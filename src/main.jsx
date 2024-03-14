import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, RouterProvider, createBrowserRouter } from 'react-router-dom'

import './styles/index.css'

import App from './components/App'
import HomePage from './pages/HomePage'
import ProductPage from './pages/ProductPage'
import ErrorPage from './pages/ErrorPage'

const router = createBrowserRouter([
    {
        path: '/',
        element: <HomePage />,
        errorElement: <ErrorPage />
    },
    {
        path: '/App',
        element: <App />
    },
    {
        path: '/Product/:productID',
        element: <ProductPage />
    }
])

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
)
