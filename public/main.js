var info;
var socket = io();

socket.on("arduino:data", function (data) {
  // console.log(data);
  info = parseInt(data.value);
  // info = (data.value)+"";
  // console.log(info);
  // var a = info === "1";
  // console.log(a);
  switch (info.toString()) {
    case "1":
      right();
      break;
    case "2":
      jump();
      break;
    case "3":
      left();
      break;
    case "4":
      recordArduino();
      recordEvent();
      break;
    case "5":
      pauseArduino();
      pauseEvent();
      break;
    case "6":
      stopArduino();
      break;
    case "7":
      characterSelected();
      break;
    case "8":
      sceneSelected();
      break;
    case "9":
      alert("9");
      break;
    case "0":
      alert("0");
      break;
    case "*":
      alert("B");
      break;

    default:
      break;
  }
});

let cwidth = 900;
let cheight = 460;

let encoder;

// frames para aproximar los valores de los segs
const frate = 20; // frame rate
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
let posCharacter = 0;

// Función que cambia el personaje
function characterSelected() {
  const characterArray = ["A", "B", "C", "D", "E", "F"];
  posCharacter++;
  if (posCharacter >= 0 && posCharacter < 6) {
    characterSelect = characterArray[posCharacter];
  } else {
    posCharacter = 0;
    characterSelect = characterArray[posCharacter];
  }
}
let posScene = 0;

// Función que cambia el personaje
function sceneSelected() {
  const sceneArray = ["A", "B", "C"];
  posScene++;
  if (posScene >= 0 && posScene < 3) {
    sceneSelect = sceneArray[posScene];
  } else {
    posScene = 0;
    sceneSelect = sceneArray[posScene];
  }
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

// Characters
let character1;
let character2;
let character3;
let character4;
let character5;
let character6;

let characterSelector;

let backgroundSceneSelector;
let backgroundScene1;
let backgroundScene2;
let backgroundScene3;

let scene1;
let scene2;
let scene3;

let characterSelect = "A";
let sceneSelect = "A";

setup = () => {
  let renderer = createCanvas(cwidth / scaleX_size, cheight / scaleY_size);

  // Lo emparenta con el div
  renderer.parent("recorder-container");
  renderer.id("canvas-container");
  frameRate(frate);

  // Load character character1
  character1 = loadImage("./assets/Personajes/Human/HMM.png");
  character2 = loadImage("./assets/Personajes/Human/HFF.png");
  character3 = loadImage("./assets/Personajes/Human/HFM.png");
  character4 = loadImage("./assets/Personajes/Human/HM.png");
  character5 = loadImage("./assets/Personajes/Animal/AP.png");
  character6 = loadImage("./assets/Personajes/Animal/AR.png");

  backgroundScene1 = loadImage("./assets/Escenarios/Parque.jpg");
  backgroundScene2 = loadImage("./assets/Escenarios/Casa.jpg");
  backgroundScene3 = loadImage("./assets/Escenarios/Carro.jpg");

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

  // Btn para scene1
  let btn_scene1 = select("#scene1");
  btn_scene1.mousePressed(() => (sceneSelect = "A"));

  // Btn para scene2
  let btn_scene2 = select("#scene2");
  btn_scene2.mousePressed(() => (sceneSelect = "B"));

  // Btn para scene3
  let btn_scene3 = select("#scene3");
  btn_scene3.mousePressed(() => (sceneSelect = "C"));

  // Controller scenes
  backgroundSceneSelector = backgroundScene1;

  // Character controller
  characterSelector = character1;

  // Btn character1
  let btn_charac1 = select("#charac1");
  btn_charac1.mousePressed(() => (characterSelect = "A"));
  // Btn character2
  let btn_charac2 = select("#charac2");
  btn_charac2.mousePressed(() => (characterSelect = "B"));
  // Btn character3
  let btn_charac3 = select("#charac3");
  btn_charac3.mousePressed(() => (characterSelect = "C"));
  // Btn character4
  let btn_charac4 = select("#charac4");
  btn_charac4.mousePressed(() => (characterSelect = "D"));
  // Btn character5
  let btn_charac5 = select("#charac5");
  btn_charac5.mousePressed(() => (characterSelect = "E"));
  // Btn character6
  let btn_charac6 = select("#charac6");
  btn_charac6.mousePressed(() => (characterSelect = "F"));
};

draw = () => {
  // background(220);

  // Imagen de fondo para la historia
  image(
    backgroundSceneSelector,
    0,
    0,
    cwidth / scaleX_size,
    cheight / scaleY_size
  );

  // image(character1, 0 + posX, 0 + posY);
  // Personaje que se dibuja en la interfaz
  // image(character1, 0 + posX, height / 2.2 + posY, character1.width, character1.height);

  // Personaje 1 de la historia
  image(
    characterSelector,
    0 + posX,
    height / 1.8 + posY,
    characterSelector.width / 2,
    characterSelector.height / 2
  );

  image(
    characterSelector,
    100 + posX,
    height / 1.8 + posY,
    characterSelector.width / 2,
    characterSelector.height / 2
  );

  // Escala personaje
  // scale(0.5);
  // rect(30, 20, 50, 50);
  // scale(1.5);

  // console.log(character1);
  // rect(10 + posX, 200 + posY, 155, 155);
  record();

  pauseMovie();

  stopMovie();

  scenesController();
  characterController();
  // Imprime cuando llego a n de frames

  // Detiene la grabación
  // if (count == 125 ) {
  //   console.log("Time!");
  //   stopRecord = true;
  // }

  textSize(12);
  textAlign(CENTER, CENTER);
  text(count, width - 50, height / 10);
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

function scenesController() {
  switch (sceneSelect) {
    case "A":
      backgroundSceneSelector = backgroundScene1;
      console.log("scene1");
      break;
    case "B":
      backgroundSceneSelector = backgroundScene2;
      console.log("scene2");
      break;
    case "C":
      backgroundSceneSelector = backgroundScene3;
      console.log("scene3");
      break;
    default:
      backgroundSceneSelector = backgroundScene1;
      break;
  }
}

function characterController() {
  switch (characterSelect) {
    case "A":
      characterSelector = character1;
      break;
    case "B":
      characterSelector = character2;
      break;
    case "C":
      characterSelector = character3;
      break;
    case "D":
      characterSelector = character4;
      break;
    case "E":
      characterSelector = character5;
      break;
    case "F":
      characterSelector = character6;
      break;
    default:
      characterSelector = character1;
      break;
  }
}

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
    count++;
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

var start = document.getElementById("record");
var stop = document.getElementById("pause");

var workMin = document.getElementById("w_minutes");
var workSec = document.getElementById("w_seconds");

var startTimer;
var sum = false;
var operacion = 4 - 1;

start.addEventListener("click", function () {

  if (startTimer === undefined) {
    startTimer = setInterval(timer, 1000);
  } else {
    alert("El tiempo esta corriendo");
  }
});

function recordEvent() {
  if (startTimer === undefined) {
    startTimer = setInterval(timer, 1000);
  } else {
    alert("El tiempo esta corriendo");
  }
}

function pauseEvent() {
  stopInterval();
  startTimer = undefined;
}

stop.addEventListener("click", function () {
  stopInterval();
  startTimer = undefined;
});

function timer() {
  if (workSec.innerText != 0) {
    workSec.innerText--;
  } else if (workMin.innerText != 0 && workSec.innerText == 0) {
    workSec.innerText = 59;
    workMin.innerText--;
  }

  if (workMin.innerText == 0 && workSec.innerText == 0) {
    if (sum == false) {
      stopRecord = true;
      sum = true;
    }
  }
}

function stopInterval() {
  clearInterval(startTimer);
}
