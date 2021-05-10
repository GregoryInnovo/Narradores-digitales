import React from 'react';
import Header from '../components/Header/Header';
import ArduinoConnect from '../components/HistoryVideo/ArduinoConection/ArduinoConnect';
import CanvasRecorder from '../components/HistoryVideo/CanvasRecorder/CanvasRecorder';

const VideoRecorder = () => {
    return (
        <div>
            <Header />
            {/* <CanvasRecorder /> */}
            <ArduinoConnect />
        </div>
    );
}

export default VideoRecorder;