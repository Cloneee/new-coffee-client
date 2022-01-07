import React from 'react'
import { Redirect, Route, RouteProps } from 'react-router-dom'



export const PrivateRoute = (props: RouteProps) => {

    // Check if user Logged in
    const isLoggedIn = Boolean(sessionStorage.getItem('access_token'))
    if(!isLoggedIn) return <Redirect to="/login" />
    
    return (
        <Route {...props}/>
    )
}
