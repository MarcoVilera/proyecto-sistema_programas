import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import './styles/index.css'

import App from './components/App'
import Index from './pages/Index'
import ProductPage from './pages/ProductPage'
import ErrorPage from './pages/ErrorPage'
import About from './pages/About'
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
])

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
)
