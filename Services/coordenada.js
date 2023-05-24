
const Coordenada = require('../Models/Coordenada');

const guardarCoordenada = async (coordenada) => {

  const { x, y, pedido_id } = coordenada;

  try{
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

module.exports = { guardarCoordenada };
