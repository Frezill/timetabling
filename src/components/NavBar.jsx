import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

const NavBar = () => {

    return (
        <nav className='nav navbar-expand-lg px-lg-2 px-3 bg-nav-color py-2 shadow sticky-top'>
            <div className="container d-flex justify-content-between align-items-center">
                <Link to='/' className='d-flex align-items-center gap-2'>
                    <div className="logo-font-style app-color">
                        FlexiTime
                    </div>
                </Link>
            </div>
        </nav>
    )
}

export default NavBar