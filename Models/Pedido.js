const { Schema, model } = require('mongoose');

const PedidoSchema = Schema({
  fecha: {
    type: Date,
    required: true,
  },
  socketId: {
    type: String,
    required: true,
  },
}, {
  toJSON: {
    virtuals: true,
  },
  toObject: {
    virtuals: true,
  }
})

PedidoSchema.virtual('coordenadas', {
  ref: 'Coordenada',
  localField: '_id',
  foreignField: 'pedido_id',
  justOne: false,
})

module.exports = model('Pedido', PedidoSchema);