const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { dbConnection } = require('../Database/config');
const { socketController } = require('../Sockets/controller');

class Server {
  constructor(){
    this.app = express();
    this.port = process.env.PORT;
    this.server = require('http').createServer(this.app);
    this.io = require('socket.io')(this.server);

    this.connectToDB();
    this.addMiddlewares();
    this.sockets();
  }

  async connectToDB(){
    await dbConnection();
  }

  addMiddlewares(){
    this.app.use(cors());
    
    this.app.use(express.static('public'));

    this.app.use(express.json());
  }

  sockets(){
    this.io.on('connection', (socket) => {
      socketController(socket, this.io);
    })
  }

  listen(){
    this.server.listen(this.port, () => {
      console.log('Servidor corriendo en el puerto: ', this.port);
    });
  }
}

module.exports = Server;