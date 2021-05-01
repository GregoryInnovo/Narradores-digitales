import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Login extends Component {

    render () {
            return (
            <div>
                <h1>Aqui ira el Login de la app</h1>
                <Link to="/">
                    <h1>Cambiar a Home</h1>
                </Link>
            </div>
        );
    }
}

export default Login;