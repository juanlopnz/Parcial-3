const { crearPedido, seleccionarPedido } = require('../Services/pedido');
const { enviarCoordenada } = require('../Services/coordenada'); 
const Pedidos = require('../Models/Pedido');
const users = [];

const socketController = (socket, io) => {
  users.push(socket.id);
  io.emit('usuarios-activos', users)

  console.log('Cliente Conectado', socket.id);

  socket.on('disconnect', () => {
    console.log('Cliente desconectado', socket.id);

    users.splice(users.indexOf(socket.id), 1);
  });

  socket.on('crear-pedido', (payload) => {
    console.log(payload);

    crearPedido({
      fecha: new Date(),
    })

    console.log(users)

    payload.from = 'desde el server'

    socket.broadcast.emit('mensaje-de-server', payload);

  });

  socket.on('enviar-coordenada', async ({x, y, pos}) => {

    
    const pedido = await seleccionarPedido(pos);
    console.log(pedido)
    const pedido_id = pedido._id;

    if(x && y && pedido_id){
      console.log('Coordenada recibida: ', x, y, pedido_id);
      socket.to(pedido_id).emit('recibir-mensaje', {x, y, pedido_id});
      enviarCoordenada({x, y, pedido_id});
    }else{
      //socket.emit('error', {msg: 'Error al enviar la coordenada'});
      console.log('Error al enviar la coordenada');
    }
  });
};

module.exports = { socketController };