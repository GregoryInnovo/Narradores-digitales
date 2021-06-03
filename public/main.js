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
      comenzarAGrabar();
      break;
    case "5":
      pauseArduino();
      pauseEvent();
      break;
    case "6":
      stopArduino();
      detenerGrabacion();
      break;
    case "7":
      if(!noMoreConfig)
      characterSelected();
      break;
    case "8":
      if(!noMoreConfig)
      sceneSelected();
      break;
    case "9":
      if(!noMoreConfig)
      toggleCharacterTwo();
      break;
    case "0":
      changePosY()
      break;
    case "*":
      // alert("B");
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
  noMoreConfig = true;
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
let characterSelector2;

let backgroundSceneSelector;
let backgroundScene1;
let backgroundScene2;
let backgroundScene3;

let scene1;
let scene2;
let scene3;

let characterSelect = "A";
let sceneSelect = "A";

let toggleBtnCharacter;
let togglePosY;

let noMoreConfig;
setup = () => {
  noMoreConfig = false;
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

  // Btn para grabar
  let btn_record = select("#record");
  btn_record.mousePressed(() => ((recording = true), comenzarAGrabar()));

  // Btn para pausar
  let btn_pause = select("#pause");
  btn_pause.mousePressed(() => (pauseRecord = true));

  // Btn para detener
  let btn_stop = select("#stop");
  btn_stop.mousePressed(() => (stopRecord = true), detenerGrabacion());

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
  characterSelector2 = character2;

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

  toggleBtnCharacter = false;
  togglePosY = false;

};

draw = () => {
  // Imagen de fondo para la historia
  image(
    backgroundSceneSelector,
    0,
    0,
    cwidth / scaleX_size,
    cheight / scaleY_size
  );

  image(
    characterSelector,
    0 + posX,
    height / 1.8 + posY,
    characterSelector.width / 2,
    characterSelector.height / 2
    );

    
    // Personaje 2 de la historia
    if (toggleBtnCharacter) {
    image(
      characterSelector2,
      100 + posX,
      height / 1.8 + posY,
      characterSelector2.width / 2,
      characterSelector2.height / 2
    );
  }

  // Escala personaje
  // scale(0.5);
  // rect(30, 20, 50, 50);
  // scale(1.5);

  // console.log(character1);
  // rect(10 + posX, 200 + posY, 155, 155);

  record();

  pauseMovie();

  stopMovie();

  
  if(!noMoreConfig) {
    scenesController();
    characterController();
  }
  // textSize(12);
  // textAlign(CENTER, CENTER);
  // text(count, width - 50, height / 10);
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

function changePosY() {
  togglePosY = !togglePosY;
  if(togglePosY) {
    posY = 50;
  } else {
    posY = 0;
  }
}

function characterController() {
  switch (characterSelect) {
    case "A":
      characterSelector = character1;
      characterSelector2 = character2;
      break;
    case "B":
      characterSelector = character2;
      characterSelector2 = character3;
      break;
    case "C":
      characterSelector = character3;
      characterSelector2 = character4;
      break;
    case "D":
      characterSelector = character4;
      characterSelector2 = character5;
      break;
    case "E":
      characterSelector = character5;
      characterSelector2 = character6;
      break;
    case "F":
      characterSelector = character6;
      characterSelector2 = character1;
      break;
    default:
      characterSelector = character1;
      characterSelector2 = character2;
      break;
  }
}

function toggleCharacterTwo() {
  toggleBtnCharacter = !toggleBtnCharacter;

}
function record() {
  // Añade un nuevo frame
  if (recording) {
    encoder.addFrameRgba(
      drawingContext.getImageData(0, 0, encoder.width, encoder.height).data
    );
    recordedFrames++;
    console.log("recording and frames", recordedFrames);
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

/* TIMER CONFIGURATION */
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
      detenerGrabacion();
      sum = true;
    }
  }
}

function stopInterval() {
  clearInterval(startTimer);
}

/* AUDIO SUPPORT */

// const tieneSoporteUserMedia = () => !!navigator.mediaDevices.getUserMedia;

// Si no soporta...
// aviso para que el mundo comience a usar navegadores decentes
// if (typeof MediaRecorder === "undefined" || !tieneSoporteUserMedia()) {
//   return alert("Tu navegador web no cumple los requisitos");

// }

// Declaración de elementos del DOM
const $listaDeDispositivos = document.querySelector("#listaDeDispositivos"),
  $duracion = document.querySelector("#duracion"),
  $btnComenzarGrabacion = document.querySelector("#btnComenzarGrabacion"),
  $btnDetenerGrabacion = document.querySelector("#btnDetenerGrabacion");

// Algunas funciones útiles
const limpiarSelect = () => {
  for (let x = $listaDeDispositivos.options.length - 1; x >= 0; x--) {
    $listaDeDispositivos.options.remove(x);
  }
};

const segundosATiempo = (numeroDeSegundos) => {
  let horas = Math.floor(numeroDeSegundos / 60 / 60);
  numeroDeSegundos -= horas * 60 * 60;
  let minutos = Math.floor(numeroDeSegundos / 60);
  numeroDeSegundos -= minutos * 60;
  numeroDeSegundos = parseInt(numeroDeSegundos);
  if (horas < 10) horas = "0" + horas;
  if (minutos < 10) minutos = "0" + minutos;
  if (numeroDeSegundos < 10) numeroDeSegundos = "0" + numeroDeSegundos;

  return `${horas}:${minutos}:${numeroDeSegundos}`;
};
// Variables "globales"
let tiempoInicio, mediaRecorder, idIntervalo;
const refrescar = () => {
  $duracion.textContent = segundosATiempo((Date.now() - tiempoInicio) / 1000);
};
// Consulta la lista de dispositivos de entrada de audio y llena el select
const llenarLista = () => {
  navigator.mediaDevices.enumerateDevices().then((dispositivos) => {
    limpiarSelect();
    dispositivos.forEach((dispositivo, indice) => {
      if (dispositivo.kind === "audioinput") {
        const $opcion = document.createElement("option");

        $opcion.text = dispositivo.label || `Dispositivo ${indice + 1}`;
        $opcion.value = dispositivo.deviceId;
        $listaDeDispositivos.appendChild($opcion);
      }
    });
  });
};
// Ayudante para la duración
const comenzarAContar = () => {
  tiempoInicio = Date.now();
  idIntervalo = setInterval(refrescar, 500);
};

// Comienza a grabar el audio con el dispositivo seleccionado
const comenzarAGrabar = () => {
  if (!$listaDeDispositivos.options.length) return alert("No hay dispositivos");
  // No permitir que se grabe doblemente
  if (mediaRecorder) return alert("Ya se está grabando");

  navigator.mediaDevices
    .getUserMedia({
      audio: {
        deviceId: $listaDeDispositivos.value,
      },
    })
    .then((stream) => {
      // Comenzar a grabar con el stream
      mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.start();
      comenzarAContar();
      // En el arreglo pondremos los datos que traiga el evento dataavailable
      const fragmentosDeAudio = [];
      // Escuchar cuando haya datos disponibles
      mediaRecorder.addEventListener("dataavailable", (evento) => {
        // Y agregarlos a los fragmentos
        fragmentosDeAudio.push(evento.data);
      });
      // Cuando se detenga (haciendo click en el botón) se ejecuta esto
      mediaRecorder.addEventListener("stop", () => {
        // Detener el stream
        stream.getTracks().forEach((track) => track.stop());
        // Detener la cuenta regresiva
        detenerConteo();
        // Convertir los fragmentos a un objeto binario
        const blobAudio = new Blob(fragmentosDeAudio);

        // Crear una URL o enlace para descargar
        const urlParaDescargar = URL.createObjectURL(blobAudio);
        // Crear un elemento <a> invisible para descargar el audio
        let a = document.createElement("a");
        document.body.appendChild(a);
        a.style = "display: none";
        a.href = urlParaDescargar;
        a.download = "grabacion.wav";
        // Hacer click en el enlace
        a.click();
        // Y remover el objeto
        window.URL.revokeObjectURL(urlParaDescargar);
      });
    })
    .catch((error) => {
      // Aquí maneja el error, tal vez no dieron permiso
      console.log(error);
    });
};

const detenerConteo = () => {
  clearInterval(idIntervalo);
  tiempoInicio = null;
  $duracion.textContent = "";
};

const detenerGrabacion = () => {
  if (!mediaRecorder) {
    return console.log("No se está grabando");
  }
  mediaRecorder.stop();
  mediaRecorder = null;
};

$btnComenzarGrabacion.addEventListener("click", comenzarAGrabar);
$btnDetenerGrabacion.addEventListener("click", detenerGrabacion);

// Cuando ya hemos configurado lo necesario allá arriba llenamos la lista

llenarLista();

// Esperar a que el documento esté listo
// document.addEventListener("DOMContentLoaded", init);
