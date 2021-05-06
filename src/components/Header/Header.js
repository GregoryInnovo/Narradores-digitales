import React from 'react';
import './Header.css'
const Header = () => (
    <>
        <header className="o-header">
            <button className="o-header-buttons">Logo</button>

            <div>
                <button className="o-header-buttons">Comunidad</button>
                <button className="o-header-buttons">Perfil</button>
                <button className="o-header-buttons">Editor</button>
            </div>
        </header>
    </>
);

export default Header;