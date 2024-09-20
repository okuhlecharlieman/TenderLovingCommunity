import React from 'react'
import { Link } from 'react-router-dom'

function addtender() {
  return (
    <> <div className="grid place-content-center"> 
    <div className="p-6  text-3xl flex"> <div className="avatar avatar-ring-secondary size-40">< img src='https://lh3.googleusercontent.com/kLJ-sJyAeopZG6wT3usuXrGx7lFykg_L683arsMJppDuFJ-4fhzsbZ1h38PNyG7PBPU' width={250}/></div><p className='px-6 py-14'>South African Government</p></div>
  <div className="card p-3"><div className="mx-auto flex w-full max-w-sm flex-col gap-6">
	<div className="flex flex-col items-center">
		<h1 className="text-3xl font-semibold">Please select</h1>
		<p className="text-sm">Sign in to access your account</p>
	</div>
	<div className="form-group">
		<div className="form-field">
			<label className="form-label">Budget</label>
            <div className="form-control">
			<input placeholder="Type here" type="budget" className="input max-w-full" />
			</div>
		</div>
		<div className="form-field">
			<label className="form-label">Duration</label>
			<div className="form-control">
				<input placeholder="Type here" type="duration" className="input max-w-full" />
			</div>
		</div>
        <div className="form-field">
			<label className="form-label">Units and description</label>
			<div className="form-control">
				<input placeholder="Type here" type="unit" className="input max-w-full" />
			</div>
		</div>
		
		<div className="form-field pt-5">
			<div className="form-control grid place-content-center">
				<label type="button" className="btn btn-secondary" htmlFor="modal-2">Create</label>
                <input className="modal-state" id="modal-2" type="checkbox" />
<div className="modal w-screen">
	<label className="modal-overlay" htmlFor="modal-2"></label>
	<div className="modal-content flex flex-col gap-5 max-w-3xl">
		<label htmlFor="modal-2" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</label>
		<h2 className="text-xl">Modal title 2</h2>
		<span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur dolorum voluptate ratione dicta. Maxime cupiditate, est commodi consectetur earum iure, optio, obcaecati in nulla saepe maiores nobis iste quasi alias!</span>
		<div className="flex gap-3">
			<button className="btn btn-error btn-block">Delete</button>
			<button className="btn btn-block">Cancel</button>
		</div>
	</div>
</div>
			</div>
		</div>

	
	</div>
</div></div>
</div>

  </>
  )
}

export default addtender


