import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import ShopContextProvider from "./context/QuizContext"

ReactDOM.createRoot(document.getElementById('root')).render(
    <ShopContextProvider>
      <App  />
    </ShopContextProvider>
)
