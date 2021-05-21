var info;
var socket = io();

socket.on("arduino:data", function (data) {
  // console.log(data);
  info = parseInt(data.value);
  // console.log(info);
  // var a = info === 1;
  // console.log(a);
  switch (info) {
    case 1:
      right();
      break;
    case 2:
      left();
      break;
    case 3:
      jump();
      break;
    case 4:
      console.log(`Se realiza la acción ${info}`);
      break;
    case 5:
      console.log(`Se realiza la acción ${info}`);
      break;

    default:
      break;
  }
});

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

let posX = 0;
let posY = 0;

function right() {
  // count++;
  posX = posX + 50;
  if (count == 100) {
    console.log("Time!");
  }
}

function left() {
  posX = posX - 50;
}

function jump() {
  var num = 80;
  posY = posY - num;
  setTimeout(() => {
    posY = posY + num;
  }, 100);
}

let mic, recorder, soundFile;
let state = 0;

preload = () => {
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
let img;

let backgroundScene;
setup = () => {
  let renderer = createCanvas(cwidth, cheight);
  renderer.parent("recorder-container");
  renderer.id("canvas-container");
  frameRate(frate);
  button = createButton("record");
  waits = createButton("stop");
  pause = createButton("pause");
  img = loadImage("./per.png");
  backgroundScene = loadImage("./assets/Escenarios/Parque.jpg");
  // mic = new p5.AudioIn()
  // mic.start();
  // recorder = new p5.SoundRecorder();
  // recorder.setInput(mic);
  // soundFile = new p5.SoundFile();

  button.mousePressed(() => (recording = true));
  button.class("btn-record");
  button.parent("recorder-container");

  waits.mousePressed(() => (waitsing = true));
  waits.parent("recorder-container");
  waits.class("btn-stop");

  pause.mousePressed(() => (pausing = true));
  pause.parent("recorder-container");
  pause.class("btn-pause");
};

draw = () => {
  background(220);
  textSize(128);
  textAlign(CENTER, CENTER);
  text(count, width / 2, height / 2);
  count++;

  image(backgroundScene, 0, 0, 640, 360);

  // image(img, 0 + posX, 0 + posY);
  // Personaje que se dibuja en la interfaz
  // image(img, 0 + posX, height / 2.2 + posY, img.width, img.height);
  image(img, 0 + posX, height / 2.2 + posY, img.width / 2, img.height / 2);
  
  // Escala personaje
  // scale(0.5);
  // rect(30, 20, 50, 50);
  // scale(1.5);
  
  
  console.log(img);
  // rect(10 + posX, 200 + posY, 155, 155);
  record();

  pauseMovie();

  stopMovie();
};

function record() {
  // keep adding new frame
  if (recording) {
    console.log("recording");
    encoder.addFrameRgba(
      drawingContext.getImageData(0, 0, encoder.width, encoder.height).data
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

    preload(); // reinitialize encoder
  }
}
