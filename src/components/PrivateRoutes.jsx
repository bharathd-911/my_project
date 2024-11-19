import React from 'react'
import {Outlet,Navigate} from 'react-router-dom'
const PrivateRoutes = () => { 
    const user = JSON.parse(localStorage.getItem('user'));   
    return (
        user ?
            <Outlet /> :
            <Navigate to="/SignUp" /> 
            
    )
}

export default PrivateRoutes