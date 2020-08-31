import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Contact from '../Contact/Contact';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";


function Login() {


    // const auth = async () => {
    //     const response = await axios.post('http://localhost:8888/api/auth', {
    //         email: 'teste@teste',
    //         senha: '1234',
    //     });
    //     console.log(response.data);
    // }

    return (
            <div className="container" >
                <div className="login" >
                    <button>
                        Login
                    </button>
                  
                </div>
            </div>
    );
}

export default Login;

if (document.getElementById('login')) {
    ReactDOM.render(<Login />, document.getElementById('login'));
}
