import React from 'react';
import './Wrapper.css'

const Wrapper = ( {children, title} ) => (
    <div className="o-wrapper">
        <div className="o-wrapper-title">{title}</div>
        <div>{children}</div>
    </div>
);

export default Wrapper;