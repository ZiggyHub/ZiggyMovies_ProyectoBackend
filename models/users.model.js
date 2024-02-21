const { Schema, model } = require('mongoose');

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
        type: Boolean
    }
})

module.exports = model('User', UserSchema)

