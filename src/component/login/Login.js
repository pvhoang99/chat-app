import React, {useState} from "react";
import './Login.css'
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import LOGIN_SUCCESS from "../../actions/auth";

const Login = () => {

    const [state, _setState] = useState({});

    const setState = (data = {}) => {
        _setState((preState) => ({...preState, ...data}))
    }

    const {isLoggedIn} = useSelector(state => state.auth)

    const dispatch = useDispatch();

    const onInputUsername = (e) => {
        const username = e.target.value;
        setState({username: username})
    }

    const onInputPassword = (e) => {
        const password = e.target.value;
        setState({password: password})
    }

    const API_URL = 'http://localhost:8000/chat-server/api/v1/login';

    const login = (username, password) => {
        return axios
            .post(API_URL, {
                username, password,
            })
            .then((response) => {
                if (response.data.access_token) {
                    localStorage.setItem("user", JSON.stringify(response.data));
                }
                return response.data;
            });
    };

    const onLogin = (e) => {
        e.preventDefault()
        const data = login(state.username, state.password);
        dispatch(LOGIN_SUCCESS(data));
    }

    return (<div className={'container-login'}>
        <form>
            <div className={'container-login-content'}>
                <h1 className={'header'}>Login</h1>
                <div className={'input-username'}>
                    <label>Username</label>
                    <input type={'text'} id={'username'} onChange={onInputUsername}/>
                </div>
                <br></br>
                <div className={'input-password'}>
                    <label>Password</label>
                    <input type={'password'} id={'password'} onChange={onInputPassword}/>
                </div>
                <br></br>
                <div className={'button-login-container'}>
                    <button className={'button-login'} onClick={onLogin}>Login</button>
                </div>
            </div>
        </form>
    </div>);

}

export default Login;