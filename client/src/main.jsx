import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter} from 'react-router-dom'
import { AuthProvider } from './context/auth.jsx'
import { Toaster } from 'react-hot-toast'
import 'antd/dist/reset.css';
import { SearchProvider } from './context/Search.jsx'
import { CartProvider } from './context/cart.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <SearchProvider>
      <CartProvider>
      <BrowserRouter>
        <App />
        <Toaster />
        </BrowserRouter>
      </CartProvider>
    </SearchProvider>   
  </AuthProvider>
  
)
