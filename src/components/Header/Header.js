import React from 'react';
import './Header.css'
import { Link } from 'react-router-dom';

const Header = () => (
    <>
        <header className="o-header">
            <Link to="/">
                <button className="o-header-buttons">Logo</button>
            </Link>

            <div>
                <Link to="/community">
                    <button className="o-header-buttons">Comunidad</button>
                </Link>
                <Link to="/editor">
                    <button className="o-header-buttons">Editor</button>
                </Link>
                <Link to="/profile">
                    <button className="o-header-buttons">Perfil</button>
                </Link>
            </div>
        </header>
    </>
);

export default Header;