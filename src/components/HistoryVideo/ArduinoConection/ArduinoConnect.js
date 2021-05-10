import React, { Component } from "react";
const p5 = require("p5");
const HME = require("h264-mp4-encoder");
const http = require("http");
var SerialPort = require("serialport");


const { Server } = require("socket.io");
const io = new Server('http://localhost:3000/');


class ArduinoConnect extends Component {
  
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }

  Sketch = (p) => {

    var info;
    // var socket = io();
    // socket.on('arduino:data', function(data){
    //     console.log(data)
    //     info = data.value;
    //     increment();
    // })

    let cwidth = 640;
    let cheight = 360;
    let button;
    let waits;
    let pause;
    let encoder;

    const frate = 30; // frame rate
    const numFrames = 100; // num of frames to record
    let recording = false;
    let waitsing = false;
    let pausing = false;
    let recordedFrames = 0;
    let count = 0;

    let x = 0;

    function increment() {
        count++
        x = count;
        if(count == 100) {
            console.log('im happy that this fk works!')
        }
    }

    let mic, recorder, soundFile;
    let state = 0;

    p.preload = () => {
      HME.createH264MP4Encoder().then((enc) => {
        encoder = enc;
        encoder.outputFilename = "test";
        encoder.width = cwidth;
        encoder.height = cheight;
        encoder.frameRate = frate;
        encoder.kbps = 50000; // video quality
        encoder.groupOfPictures = 10; // lower if you have fast actions.
        encoder.initialize();
      });
    };

    p.setup = () => {
      p.createCanvas(cwidth, cheight);
      p.frameRate(frate);
      button = p.createButton("record");
      waits = p.createButton("stop");
      pause = p.createButton("pause");

      // mic = new p5.AudioIn()
      // mic.start();
      // recorder = new p5.SoundRecorder();
      // recorder.setInput(mic);
      // soundFile = new p5.SoundFile();

      button.mousePressed(() => (recording = true));
      waits.mousePressed(() => (waitsing = true));
      pause.mousePressed(() => (pausing = true));
    };

    p.draw = () => {
      p.background(220);
      p.textSize(128);
      p.textAlign(p.CENTER, p.CENTER);
      p.text(count, p.width / 2, p.height / 2);
      count++;
      p.rect(10+x, 10, 155, 155);
      record();

      pauseMovie();

      stopMovie();
    };

    function record() {
      // keep adding new frame
      if (recording) {
        console.log("recording");
        encoder.addFrameRgba(
          p.drawingContext.getImageData(0, 0, encoder.width, encoder.height)
            .data
        );
        recordedFrames++;
        // if (mic.enabled) {
        //     // indicar al grabador que grabe en el objeto p5.SoundFile, que usaremos para la reproducción
        //     recorder.record(soundFile);
        //     console.log('audio')
        // }
      }
    }

    function pauseMovie() {
      if (recording == true && pausing == true) {
        recording = false;
        console.log("pause");
      } else {
        pausing = false;
      }
    }

    function stopMovie() {
      // finalize encoding and export as mp4
      if (waitsing) {
        // recorder.stop();
        // soundFile.play();
        // saveSound(soundFile, 'mySound.wav');

        waitsing = false;
        recording = false;
        recordedFrames = 0;
        console.log("recording stop");

        encoder.finalize();
        const uint8Array = encoder.FS.readFile(encoder.outputFilename);
        const anchor = document.createElement("a");
        anchor.href = URL.createObjectURL(
          new Blob([uint8Array], { type: "video/mp4" })
        );
        anchor.download = encoder.outputFilename;
        anchor.click();
        encoder.delete();

        p.preload(); // reinitialize encoder
      }
    }
  };

  componentDidMount() {
      // io.on('connection', (socket) => {
      //   console.log('a new user connected');
      // });
      
      // server.listen(3000, () => {
      //   console.log(`listening on ${3000}`);
      // });
      
      
      
      // var arduinoCOMPort = "COM5";
      
      // var arduinoSerialPort = new SerialPort(arduinoCOMPort, {  
      //   baudRate: 9600
      // });
      
      // arduinoSerialPort.on('open',function() {
      //   console.log('Serial Port ' + arduinoCOMPort + ' is opened.');
      // });
      
      // arduinoSerialPort.on('data', (data) => {
      //   console.log(data.toString());
      //     io.emit('arduino:data', {
      //       value: data.toString()
      //     });
      // });

    this.myP5 = new p5(this.Sketch, this.myRef.current);
  }

  render() {
    return <div ref={this.myRef}></div>;
  }
}

export default ArduinoConnect;
