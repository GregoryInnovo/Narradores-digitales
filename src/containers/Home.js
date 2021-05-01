import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div>
            <h1>Aqui ira el Home de la app</h1>
            <Link to="/login">
                <h1>Cambiar a Login</h1>
            </Link>
        </div>
    );
}

export default Home;