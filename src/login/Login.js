import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
const Login = (props) => {

    const queryParams = new URLSearchParams(window.location.search);
    const token = queryParams.get('token');
    console.log(token)
    window.localStorage.setItem('token', token)
    const navigate = useNavigate();


    useEffect(() => {
        navigate('/home')
    }, [])

    return (
        <div>Login</div>
    )
}

export default Login