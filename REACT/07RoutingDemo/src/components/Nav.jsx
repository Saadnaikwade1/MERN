import React from 'react'
import { Link } from 'react-router-dom'
function Nav() {
    return (
        <div className='flex  items-center justify-center gap-10 bg-gray-900 text-white p-4 shadow-md ' >
            <Link to="/"className='hover:text-yellow-400 transition'>Home</Link>
            <Link to="/about" className='hover:text-yellow-400 transition'>About</Link>
            <Link to="/login" className='hover:text-yellow-400 transition' >Login</Link>
            <Link to="/reg" className='hover:text-yellow-400 transition'>Register</Link>
        </div>
    )
}

export default Nav
