const { Schema, model, SchemaType } = require('mongoose');

const UserSchema = Schema({
    userName:{
        type: String,
        required: [true, "Se necesita un nombre de usuario"]
    },
    email:{
        type: String,
        required: [true, "Se necesita un email"]
    },
    password:{
        type: String,
        required: [true ,"Se necesita un password"]
    },
    state:{
        type: Boolean,
        default: true
    },
    service:{
        type: Schema.Types.ObjectId,
        ref: 'Service',
        required: [true, 'El servicio es requerido']
    }
}, { timestamps: true }
)

module.exports = model('User', UserSchema)

