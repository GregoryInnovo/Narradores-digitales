var info;
var socket = io();
// let btn_play = Document.getElementBy("play");

// console.log(btn_play);

// function changeColor(newColor) {
//   var elem = document.getElementById('para');
//   elem.style.color = newColor;
// }

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
      recordArduino();
      break;
    case 5:
      pauseArduino();
      break;
    case 6:
      stopArduino();
      break;

    default:
      break;
  }
});

let cwidth = 900;
let cheight = 460;

let encoder;

// frames para aproximar los valores de los segs
const frate = 24; // frame rate
const numFrames = 100; // num of frames to record
let recording = false;
let stopRecord = false;
let pauseRecord = false;
let recordedFrames = 0;
let count = 0;

let posX = 0;
let posY = 0;

// Función que permite que el personaje se mueva a la derecha
function right() {
  // count++;
  posX = posX + 50;
}

// Función que permite que el personaje se mueva a la izquierda
function left() {
  posX = posX - 50;
}

// Función que permite que el personaje salte
function jump() {
  var num = 80;
  posY = posY - num;
  setTimeout(() => {
    posY = posY + num;
  }, 100);
}

// Función la cual empieza a grabar cuando se envie el valor 4
function recordArduino() {
  recording = true;
}

// Función pausa la historia
function pauseArduino() {
  pauseRecord = true;
}

// Función detiene y descarga la historia
function stopArduino() {
  stopRecord = true;
}

let mic, recorder, soundFile;
let state = 0;

// variables para escalar el canvas
let scaleX_size = 1;
let scaleY_size = 1;

// encoder configuración
preload = () => {
  HME.createH264MP4Encoder().then((enc) => {
    encoder = enc;
    encoder.outputFilename = "test";
    encoder.width = cwidth / scaleX_size;
    encoder.height = cheight / scaleY_size;
    encoder.frameRate = frate;
    encoder.kbps = 50000; // video quality
    encoder.groupOfPictures = 10; // lower if you have fast actions.
    encoder.initialize();
  });
};
let img;

let backgroundScene;
setup = () => {
  let renderer = createCanvas(cwidth / scaleX_size, cheight / scaleY_size);

  // Lo emparenta con el div
  renderer.parent("recorder-container");
  renderer.id("canvas-container");
  frameRate(frate);

  img = loadImage("./per.png");
  backgroundScene = loadImage("./assets/Escenarios/Parque.jpg");

  // mic = new p5.AudioIn()
  // mic.start();
  // recorder = new p5.SoundRecorder();
  // recorder.setInput(mic);
  // soundFile = new p5.SoundFile();

  // Btn para grabar
  let btn_record = select("#record");
  btn_record.mousePressed(() => (recording = true));

  // Btn para pausar
  let btn_pause = select("#pause");
  btn_pause.mousePressed(() => (pauseRecord = true));

  // Btn para detener
  let btn_stop = select("#stop");
  btn_stop.mousePressed(() => (stopRecord = true));
};

draw = () => {
  background(220);
  textSize(128);
  textAlign(CENTER, CENTER);
  text(count, width / 2, height / 2);
  // Suma la cantidad de frames
  count++;

  // Imagen de fondo para la historia
  image(backgroundScene, 0, 0, cwidth / scaleX_size, cheight / scaleY_size);

  // image(img, 0 + posX, 0 + posY);
  // Personaje que se dibuja en la interfaz
  // image(img, 0 + posX, height / 2.2 + posY, img.width, img.height);

  // Personaje 1 de la historia
  image(img, 0 + posX, height / 2.2 + posY, img.width / 2, img.height / 2);

  // Escala personaje
  // scale(0.5);
  // rect(30, 20, 50, 50);
  // scale(1.5);

  // console.log(img);
  // rect(10 + posX, 200 + posY, 155, 155);
  record();

  pauseMovie();

  stopMovie();

  // Imprime cuando llego a n de frames

  // Detiene la grabación
  // if (count == 125 ) {
  //   console.log("Time!");
  //   stopRecord = true;
  // }
};

windowResized = () => {
  // Hace que el canvas sea responsive con su contenedor
  if (windowWidth / 1.3 > 721) {
    scaleX_size = 1;
    scaleY_size = 1;
    resizeCanvas(cwidth / scaleX_size, cheight / scaleY_size);
  }
  if (windowWidth / 1.3 < 720 && windowWidth / 1.3 > 521) {
    scaleX_size = 2;
    scaleY_size = 2;
    resizeCanvas(cwidth / scaleX_size, cheight / scaleY_size);
    console.log("new size 2");
  }
  if (windowWidth / 1.3 < 520) {
    scaleX_size = 3;
    scaleY_size = 3;
    resizeCanvas(cwidth / scaleX_size, cheight / scaleY_size);
    console.log("new size 3");
  }
};

function record() {
  // Añade un nuevo frame
  if (recording) {
    encoder.addFrameRgba(
      drawingContext.getImageData(0, 0, encoder.width, encoder.height).data
    );
    recordedFrames++;
    console.log("recording and frames", recordedFrames);
    // if (mic.enabled) {
    //     // indicar al grabador que grabe en el objeto p5.SoundFile, que usaremos para la reproducción
    //     recorder.record(soundFile);
    //     console.log('audio')
    // }
  }
}

function pauseMovie() {
  if (recording == true && pauseRecord == true) {
    recording = false;
    console.log("pause");
  } else {
    pauseRecord = false;
  }
}

function stopMovie() {
  // finaliza el encoder y exporta el mp4
  if (stopRecord) {
    // recorder.stop();
    // soundFile.play();
    // saveSound(soundFile, 'mySound.wav');

    stopRecord = false;
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
