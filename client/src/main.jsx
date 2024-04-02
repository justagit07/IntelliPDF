import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import authReducer from './states/index.js'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'

import './index.css'

const store = configureStore({
    reducer:authReducer
  })
  

import 'simplebar-react/dist/simplebar.min.css'
ReactDOM.createRoot(document.getElementById('root')).render(
<Provider store={store}>

    <App />
</Provider>

)
