import React from 'react';
import ReactDOM from 'react-dom';
import { login, api } from '../services';
import { Form, Container } from "./styles";
import {
    withRouter, useHistory, 
} from "react-router-dom";


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
                    email,
                    pass,
                });
                if (response.data.auth) {
                    login();
                    history.push('/contact');
                }else{
                    setError("Dados invalidos!!")
                }
            } catch (error) {
                setError("Erro ao fazer login!");
            }
        }
    }

    return (
        <Container>
            <Form onSubmit={handleAuth}>
                <h3>Login</h3>
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
