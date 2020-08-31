import React from 'react';
import ReactDOM from 'react-dom';
import { Container, Title, IconHeader, TextHeader } from "./styles";
import Logo from "../logo.png";


function Contact() {
    
    return (
        <Container>
            <Title>
                <IconHeader src={Logo} alt="Logo" />
                <TextHeader>
                    Contatos
                </TextHeader>
            </Title>
        </Container>
    );
}

export default Contact;

if (document.getElementById('contact')) {
    ReactDOM.render(<Contact />, document.getElementById('contact'));
}
