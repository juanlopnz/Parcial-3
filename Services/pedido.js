const Pedido = require('../Models/Pedido');

const crearPedido = async (pedido) => {

  const { _id, fecha } = pedido;

  try{
    let a = await Pedido.findOne({_id});
    if(a){
      return {
        ok: false,
        msg: 'El pedido ya existe',
      };
    }
  
    const pedido = new Pedido({_id, fecha});
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

const seleccionarPedido = async (pos) => {
  const pedido = await Pedido.find();
  return pedido[pos];
}

module.exports = { crearPedido, seleccionarPedido };