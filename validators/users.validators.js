const Joi = require('joi');

const schema = Joi.object().keys({
    userName: Joi.string().min(3).max(30).required().messages({
        "string.base":`Username debe de ser una cadena de caracteres`,
        "string.empty":`Username no debe de estar vacio`,
        "string.min":`Username debe tener un minimo de {$limit} caracteres`,
        "any.required":`El campo username es requerido`
    }),
    email: Joi.string().email().required().messages({
        "stringemail":`El campo debe de tener un formato valido`
    }),
    password: Joi.string().min(3).max(100).required().messages({
        "string.min": "El campo password debe de tener un minimo de {#limit} caracteres",
        "string.max":"aqui estaba el pedo we "
    }),
    state: Joi.boolean(),
    service: Joi.required()
})

module.exports = { schema };