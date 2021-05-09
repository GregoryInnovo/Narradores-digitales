import React from 'react';
import Header from '../components/Header/Header';
import CanvasRecorder from '../components/HistoryVideo/CanvasRecorder/CanvasRecorder';

const VideoRecorder = () => {
    return (
        <div>
            <Header />
            <CanvasRecorder />
        </div>
    );
}

export default VideoRecorder;