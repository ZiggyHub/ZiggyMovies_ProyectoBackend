const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/users.model')
const Pedido = require('../models/pedidos.model')

const protect = asyncHandler(async (req, res, next) => {
    let token
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            //obtenemos el token
            token = req.headers.authorization.split(' ')[1]

            //verificar el token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            //obtener los datos del usuario del token
            req.user = await User.findById(decoded.id).select('-password')

            next()

        } catch (error) {
            console.log(error)
            res.status(401)
            throw new Error('Acceso no autorizado')
        }
    }

    if (!token) {
        res.status(401)
        throw new Error('Acceso no autorizado, No se proporcionó el Token')
    }

})

const protectPedido = asyncHandler(async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const usuarioId = decoded.id;

            // Buscar el pedido que contiene el ID del usuario
            req.pedido = await Pedido.findOne({ cliente: usuarioId });

            if (!req.pedido) {
                res.status(404);
                throw new Error('Pedido no encontrado');
            }

            next();
        } catch (error) {
            console.log(error);
            res.status(401);
            throw new Error('Acceso no autorizado');
        }
    }

    if (!token) {
        res.status(401);
        throw new Error('Acceso no autorizado, No se proporcionó el Token');
    }
});

module.exports = { protect, protectPedido }