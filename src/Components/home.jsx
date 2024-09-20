import React from 'react'
import { Link } from 'react-router-dom'

function home() {
  return (
    <> <div className="grid place-content-center"> 
    <div className="p-6  text-3xl flex"> <div className="avatar avatar-ring-secondary size-40">< img src='https://lh3.googleusercontent.com/kLJ-sJyAeopZG6wT3usuXrGx7lFykg_L683arsMJppDuFJ-4fhzsbZ1h38PNyG7PBPU' width={250}/></div><p className='px-6 py-14'>South African Government</p></div>
    <div className="card">
	<div className="card-body">
		<h2 className="card-header text-4xl py-4">Hello add a tender with us</h2>
		<p className="text-content2">Best way to manage tenders</p>
		<div className="py-5 card-footer grid place-content-center">
			<Link className="btn-secondary btn" to="/addtender">Add tender</Link>
		</div>
	</div>
</div></div>

  </>
  )
}

export default home