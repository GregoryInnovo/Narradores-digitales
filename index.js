const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const path = require('path');
const io = new Server(server);

// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/index.html');
// });

app.use(express.static(path.join(__dirname, 'public')));

app.set('port', process.env.PORT || 3000);

io.on('connection', (socket) => {
  console.log('a new user connected');
});

server.listen(app.get('port'), () => {
  console.log(`listening on ${app.get('port')}`);
});

var SerialPort = require("serialport");

var arduinoCOMPort = "COM5";

var arduinoSerialPort = new SerialPort(arduinoCOMPort, {  
  baudRate: 9600
});

arduinoSerialPort.on('open',function() {
  console.log('Serial Port ' + arduinoCOMPort + ' is opened.');
});

arduinoSerialPort.on('data', (data) => {
  console.log(data.toString());
    io.emit('arduino:data', {
      value: data.toString()
    });
});

setTimeout( () => console.log(server), 1000);