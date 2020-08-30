import React from 'react';
import ReactDOM from 'react-dom';

function Login() {
    return (
        <div className="container">
            Login Page
        </div>
    );
}

export default Login;

if (document.getElementById('login')) {
    ReactDOM.render(<Login />, document.getElementById('login'));
}
