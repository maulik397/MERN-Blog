import React from 'react'
import {Outlet} from 'react-router-dom'
import Header from './Header'
import 'bootstrap/dist/css/bootstrap.css'

import "../pages/styles/all.css";
import Footer from './Footer'
function Layout() {
  return (
    <div>
      <Header/>
      <Outlet/>  
    
    </div>
  )
}

export default Layout
//<Footer/>