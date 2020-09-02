import React from 'react';
import ReactDOM from 'react-dom';
import { login, api } from '../services';
import { Form, Container } from "./styles";
import {
    withRouter, useHistory, 
} from "react-router-dom";

import Logo from "../logo.png";


function Login() {
    const [error, setError] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [pass, setPass] = React.useState('');
    const [name, setName] = React.useState('');

    const history = useHistory();

    const handleAuth = async event => {
        event.preventDefault();
        if (!email || !pass) {
            setError('Preencha e-mail e senha para continuar!');
        } else {
            try {
                const response = await api.post('/api/auth', {
                    name,
                    email,
                    pass,
                });
                if (response.data.success) {
                    login('token-abc');
                    history.push('/contact');
                }else{
                    setError(response.data.message)
                }
            } catch (error) {
                setError("Erro ao fazer login!");
            }
        }
    }

    return (
        <Container>
            <Form onSubmit={handleAuth}>
                <img src={Logo} alt="Logo" />
                {error && <p>{error}</p>}
                <input
                    type="nome"
                    placeholder="Nome"
                    onChange={ev => setName(ev.target.value)}
                />
                <input
                    type="email"
                    placeholder="Endereço de e-mail"
                    onChange={ev => setEmail(ev.target.value)}
                />
                <input
                    type="password"
                    placeholder="Senha"
                    onChange={ev => setPass(ev.target.value)}
                />
                <button type="submit">Entrar</button>
            </Form>
        </Container>
    );
}

export default withRouter(Login);

if (document.getElementById('login')) {
    ReactDOM.render(<Login />, document.getElementById('login'));
}
