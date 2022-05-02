import React, { useState } from 'react'
// import './Register.css'
import logo from '../image/signup.jpg'
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import axios from 'axios';
import { BASE_URL } from '../config';

const Register = () => {

    const [state, _setState] = useState({});

    const setState = (data = {}) => {

        _setState((preState) => ({ ...preState, ...data }))

    }

    const token = window.localStorage.getItem("token")

    const onChangeUsername = (e) => {
        const username = e.target.value
        setState({ username: username })
    }

    const onChangeFullName = (e) => {
        const fullName = e.target.value
        setState({ fullName: fullName })
    }

    const onChangeEmail = (e) => {
        const email = e.target.value
        setState({ email: email })
    }

    const onChangePassword = (e) => {
        const password = e.target.value;
        console.log(password);
        setState({ password: password })
    }

    const onClickRegistration = () => {
        axios.post(BASE_URL + '/auth-server/api/v1/user', {

            username: state.username,
            password: state.password,
            fullName: state.fullName,
            email: state.email

        }, {
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + token
            }

        }).then((res) => {
            console.log(res)
        }).catch((err) => {
            console.log(err)
        })
    }

    return (
        <div>
            <section class="signup">
                <div class="container">
                    <div class="signup-content">
                        <div class="signup-form">
                            <h2 class="form-title">Sign up</h2>
                            <Form class="register-form" id="register-form">
                                <div class="form-group">
                                    <label for="name"><i class="zmdi zmdi-account material-icons-name"></i></label>
                                    <Input type="text" name="name" id="name" placeholder="Your Name" onChange={onChangeFullName} />
                                </div>
                                <div class="form-group">
                                    <label for="email"><i class="zmdi zmdi-email"></i></label>
                                    <Input type="email" name="email" id="email" placeholder="Your Email" onChange={onChangeEmail} />
                                </div>
                                <div className='form-group'>
                                    <label for='username'><i class="zmdi zmdi-account material-icons-name"></i></label>
                                    <Input type="text" name="username" id="username" placeholder="Username" onChange={onChangeUsername} />
                                </div>
                                <div class="form-group">
                                    <label for="pass"><i class="zmdi zmdi-lock"></i></label>
                                    <Input type="password" name="pass" id="pass" placeholder="Password" onChange={onChangePassword} />
                                </div>
                                <div class="form-group">
                                    <label for="re-pass"><i class="zmdi zmdi-lock-outline"></i></label>
                                    <Input type="password" name="re_pass" id="re_pass" placeholder="Repeat your password" />
                                </div>
                                <div class="form-group">
                                    <Input type="checkbox" name="agree-term" id="agree-term" class="agree-term" />
                                    <label for="agree-term" class="label-agree-term"><span><span></span></span>I agree all statements in  <a href="#" class="term-service">Terms of service</a></label>
                                </div>
                                <div class="form-group form-button">
                                    <button type="button" name="signup" id="signup" class="form-submit" onClick={onClickRegistration} >Register</button>
                                </div>
                            </Form>
                        </div>
                        <div class="signup-image">
                            <figure><img src={logo} alt="sing up image" /></figure>
                            <a href="#" class="signup-image-link">I am already member</a>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    )
}

export default Register