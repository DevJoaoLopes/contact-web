import React from 'react';
import ReactDOM from 'react-dom';


function Contact() {
    return (
        <div className="container">
            Contato Page
        </div>
    );
}

export default Contact;

if (document.getElementById('contact')) {
    ReactDOM.render(<Contact />, document.getElementById('contact'));
}
