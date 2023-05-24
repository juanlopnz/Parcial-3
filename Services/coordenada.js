
const Coordenada = require('../Models/Pedido');

const enviarCoordenada = async (coordenada) => {

  const { x, y, pedido_id } = coordenada;

  try{
    let a = await Coordenada.findOne({x, y});
    if(a){
      return {
        ok: false,
        msg: 'La coordenada ya existe',
      };
    }
  
    const coordenada = new Coordenada({x, y, pedido_id});
    await coordenada.save();

    return {
      ok: true,
      coordenada,
    };

  }catch(err){
    console.log(err);
    return{
      ok: false,
      msg: 'Error al enviar la coordenada',
    };
  }
}

module.exports = { enviarCoordenada };
