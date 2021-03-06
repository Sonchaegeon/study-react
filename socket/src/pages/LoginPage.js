import axios from 'axios';
import React from 'react';
import { withRouter } from 'react-router-dom';
import makeToast from '../Toaster';

const LoginPage = (props) => {
    const emailRef = React.createRef();
    const passwordRef = React.createRef();

    const loginUser = () => {
        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        axios.post("http://localhost:3000/user/login", {
            email,
            password
        }).then(response => {
            makeToast("success", response.data.message);
            localStorage.setItem('Token', response.data.token);
            props.history.push('/dashboard');
            props.setupSocket();
        }).catch(err => {
            makeToast("error", err.response.data.message);
        });
    }

    return (
        <div className="card">
            <div className="cardHeader">Login</div>
            <div className="cardBody">
                <div className="inputGroup">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" placeholder="abc@gmail.com" ref={emailRef}></input>
                </div>
                <div className="inputGroup">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" placeholder="Your Password" ref={passwordRef}></input>
                </div>
                <button onClick={loginUser}>Login</button>
            </div>
        </div>
    );
}

export default withRouter(LoginPage);