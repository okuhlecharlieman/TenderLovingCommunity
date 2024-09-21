import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <div className="navbar">
	<div className="navbar-start">
		<a className="navbar-item">Ripple UI</a>
	</div>
	<div className="navbar-end">
		<Link className="navbar-item" >Home</Link>
		<a className="navbar-item">About</a>
		<a className="navbar-item">Contact</a>
	</div>
</div>
  )
}

export default Navbar