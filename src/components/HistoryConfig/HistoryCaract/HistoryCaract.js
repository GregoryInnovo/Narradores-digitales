import React from 'react';
import Wrapper from '../Wrapper';
import './HistoryCaract.css'

const HistoryCaract = () => (
    <Wrapper title="Selecciona las características">
        <section className="o-features">
            <div className="o-feature-container">
                <button>Personajes</button>
                <button>Animales</button>
                <button>Familia</button>
                <button>Personas</button>
            </div>
            <div className="o-feature-container">
                <button>Escenarios</button>
                <button>Casa</button>
                <button>Colegio</button>
                <button>Parque de diversiones</button>
            </div>
            <div className="o-feature-container">
                <button>Clima</button>
                <button>Día</button>
                <button>Noche</button>
                <button>Lluvia</button>
            </div>
        </section>
        
    </Wrapper>
);

export default HistoryCaract;