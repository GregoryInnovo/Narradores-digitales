const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('a new user connected');
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});




// const express = require('express');
// const app = express();
var SerialPort = require("serialport");
// const path = require('path');

// var http = require('http');
// const server = http.createServer(app);

// const { Server } = require('socket.io');

// const io = new Server(server);

// var port = 3000;

var arduinoCOMPort = "COM5";

var arduinoSerialPort = new SerialPort(arduinoCOMPort, {  
    baudRate: 9600
});

arduinoSerialPort.on('open',function() {
  console.log('Serial Port ' + arduinoCOMPort + ' is opened.');
});

// app.get('/', function (req, res, next) {

//     return res.sendFile(path.join(__dirname, './index.html'));
 
// })


// app.get('/:action', function (req, res) {
    
//    var action = req.params.action || req.param('action');
    
//     if(action == 'led'){
//         arduinoSerialPort.write("o");
//         return res.send('Led light is on!');
//     } 
//     if(action == 'off') {
//         arduinoSerialPort.write("f");
//         return res.send("Led light is off!");
//     }
    
//     return res.send('Action: ' + action);
    
// });



// app.listen(port, function () {
//     console.log('Example app listening on port http://0.0.0.0:' + port + '!');
    
// });

arduinoSerialPort.on('data', (data) => {
    console.log(data.toString());
    io.emit('arduino:data', {
        value: data.toString()
    });
});

