const { crearPedido} = require('../Services/pedido');
const { guardarCoordenada } = require('../Services/coordenada'); 
const Pedido = require('../Models/Pedido');
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
      socketId: socket.id
    })

    console.log(users)

    payload.from = 'desde el server'

    socket.broadcast.emit('mensaje-de-server', payload);

  });

  socket.on('enviar-coordenada', async ({x, y, pos}) => {

    try{
      const pedidos = await Pedido.find().exec();
      console.log(pedidos);
      const pedido_id = pedidos[pos]._id;
      console.log(pedido_id);

      if(x && y && pedido_id){
        guardarCoordenada({x, y, pedido_id});
        io.to( pedidos[pos].socketId ).emit('coordenada-recibida', {x, y, pedido_id}  )
      }
      

    }catch(err){
      console.log(err);
      return{
        ok: false,
        msg: 'Error al seleccionar el pedido',
      };
    }
  });
};

module.exports = { socketController };