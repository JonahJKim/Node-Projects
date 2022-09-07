import React from 'react'
import './NavBar.css'
import { Link } from 'react-router-dom'

const NavBar = () => {
    return (
        <React.Fragment>
            <div>
                <Link className='no-underline' to="/home">Home</Link>
                <Link className='no-underline' to="/Projects">Projects</Link>
                <Link className='no-underline' to="/education">Education</Link>
            </div>
        </React.Fragment>

    )
}

export default NavBar