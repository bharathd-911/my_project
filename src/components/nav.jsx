import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const Nav = () => {
  const location = useLocation();
  const data = location.state || JSON.parse(localStorage.getItem('user')) || {};
  const auth = (localStorage.getItem('user'))
  return (
    <div>
      <div className='grid grid-cols-4 bg-slate-700 '>
        <div className='col-span-3 flex gap-16 pl-10 py-4'>
          <div className='text-l text-white  text-center '><Link to='/'>HOME</Link></div>
          <div className={`text-l text-white  text-center ${auth ? 'visible' : 'hidden'}`}><Link to='/project allocation'>ALLOCATION</Link></div>
          <div className={`text-l text-white  text-center ${auth ? 'visible' : 'hidden'}`}><Link to='/employee'>EMPLOYEE</Link></div>
          <div className=' text-l text-white  text-center '>{auth ? (<Link to='/Logout'>LOGOUT</Link>) : (<Link to='/SignUp'>SIGNUP</Link>)}</div>

        </div>
        <div className={`absolute inset-y-0 right-2  text-l text-white  text-left ${auth ? 'visible' : 'hidden'} ml-4 pt-1 `}>
          <div>USER : {data.name}</div>
          <div>EMAIL: {data.email}</div>
        </div>
      </div>

    </div>
  )
}

export default Nav