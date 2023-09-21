import React,{useContext} from 'react'
import {Navigate} from 'react-router-dom'
import {StareStvariContext} from '../context'


export default function ProtectedRouteLogin({children}) {
    const value=useContext(StareStvariContext)

if(value.user!=null){ //value.errorAuthLogIn ==='ok'
    return <Navigate to="/"/>

}
return children
}
