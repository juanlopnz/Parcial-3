const Pedido = require('../Models/Pedido');

const crearPedido = async (pedido) => {

  const { fecha, socketId } = pedido;

  try{
  
    const pedido = new Pedido({fecha, socketId});
    await pedido.save();

    return {
      ok: true,
      pedido,
    };

  }catch(err){
    console.log(err);
    return{
      ok: false,
      msg: 'Error al crear el pedido',
    };
  }
}

module.exports = { crearPedido };