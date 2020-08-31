import React from 'react';
import ReactDOM from 'react-dom';
import { Container } from "./styles";


function Contact() {
    return (
        <Container>
            
        </Container>
    );
}

export default Contact;

if (document.getElementById('contact')) {
    ReactDOM.render(<Contact />, document.getElementById('contact'));
}
