const { Schema, model, SchemaType } = require('mongoose')

const PedidosSchema = Schema({
    codigo: {
        type: Number,
        required: true,
        unique: true
    },
    cliente: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, "El campo user no debe de estar vacio"]
    },
    producto: {
        type: String,
        required: [true, "Un pedido debe contener productos"]
    },
    state: {
        type: Boolean,
        default: true
    }
})

module.exports =model('Pedido', PedidosSchema)