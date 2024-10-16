import React from 'react';
import LoginForm from '../components/LoginForm/LoginForm';
import '../styles/login.css'; // Import your CSS file

const Login = () => {
    return (
        <>
            <main className="headerBox">
                <h2 className="col-md-12 subHeader">Welcome to the Groove, Friends!</h2>
                <h1 className="headerBlue">Login <span className="headerBlack"> Here, Baby!</span></h1>
                <div className="block col-md-3"></div>
                <small className="createAccountText">Not groovy yet? <a href="/create-account" className="linkStyle">Join our funky family!</a></small>
                <LoginForm />
            </main>
            <hr/>
        </>
    );
};

export default Login;
