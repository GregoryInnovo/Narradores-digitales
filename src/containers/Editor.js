import React from 'react';
import Header from '../components/Header/Header';
import HistoryCaract from '../components/HistoryConfig/HistoryCaract/HistoryCaract';

const Editor = () => {
    return (
        <div>
            <Header />
            <h1>Esta es la vista del editor</h1>
            <HistoryCaract />
        </div>
    );
}

export default Editor;