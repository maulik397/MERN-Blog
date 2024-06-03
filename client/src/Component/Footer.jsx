import React from 'react'
import './Footer.css'; 
function Footer() {
  return (
    <footer className='footer d-flex justify-content-center align-items-center  ' style={{position:"fixed",bottom:"0",height:"10vh"}}>
    <div className="container d-flex justify-content-center align-items-center">
      <p className='m-0'>&copy; 2024 My Blog. All rights reserved.</p>
    </div>
  </footer>
  )
}

export default Footer
