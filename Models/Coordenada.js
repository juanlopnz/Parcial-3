const {Schema, model} = require('mongoose');

const CoordenadaSchema = Schema({
  x: {
    type: Number,
    required: true,
  },
  y: {
    type: Number,
    required: true,
  },
  pedido_id: {
    type: Schema.Types.ObjectId,
    ref: 'Pedido',
    required: true,
  }
})

module.exports = model('Coordenada', CoordenadaSchema);