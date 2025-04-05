import React from 'react'
import { NavLink } from 'react-router-dom'

const Footer = () => {
    return (
        <div className='bg-nav-color app-color d-flex flex-column align-items-center'>
            <div className=" py-1 ">
                © 2025 FlexiTime. All rights reserved.
            </div>
            <i style={{ fontSize: "clamp(10px, 2vw, 15px)" }} >Designed by Le Thanh Phat B2304075 (phatb2304075@student.ctu.edu.vn)</i>
        </div>
    )
}

export default Footer