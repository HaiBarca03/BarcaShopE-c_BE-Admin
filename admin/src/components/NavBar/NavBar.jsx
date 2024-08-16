import React from 'react'
import './NavBar.css'
import navLogo from '../../assets/nav-logo.svg'
import navProfile from '../../assets/nav-profile.svg'

const NavBar = () => {
    return (
        <div className='navbar'>
            <p className="nav-logo">Barca Shop</p>
            {/* <img src={navLogo} className='' alt="" /> */}
            <p className="nav-profile">Admin</p>
            {/* <img src={navProfile} className='nav-profile' alt="" /> */}
        </div>
    )
}
export default NavBar
