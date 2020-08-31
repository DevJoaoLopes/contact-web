import React from 'react';
import ReactDOM from 'react-dom';
import Login from './Login/Login';
import Contact from './Contact/Contact';
import { isAuthenticated } from './services';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";


const PrivateRoute = ({ component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={props =>
                isAuthenticated() ? (
                    <Component {...props} {...rest} />
                ) : (
                        <Redirect to={{ pathname: "/", state: { from: props.location } }} />
                    )
            }
        />
    );
}


const Routes = () => (
    <Router>
        <Switch>
            <Route exact path="/" component={Login} />
            <PrivateRoute path="/contact" component={Contact} />
        </Switch>
    </Router>
);



export default Routes;

if (document.getElementById('routes')) {
    ReactDOM.render(<Routes />, document.getElementById('routes'));
}
