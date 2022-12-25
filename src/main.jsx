import React from 'react'
import ReactDOM from 'react-dom/client'

import NavBar from './components/NavBar'
import AddressFinder from './components/AddressFinder'
import CEPFinder from './components/CEPFinder'

import 'bootstrap/dist/css/bootstrap.min.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <NavBar />
    <AddressFinder />
    <CEPFinder />
  </>
)
