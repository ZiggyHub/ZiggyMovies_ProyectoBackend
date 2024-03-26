const asyncHandler = require('express-async-handler')
const Pedido = require('../models/pedidos.model')

const pedidosPost = asyncHandler(async (req,res) => {
    try{
        const { codigo, cliente, producto } = req.body

        const pedido = await Pedido.create({
            codigo,
            cliente,
            producto
        })

        res.status(200).json({
            message: 'Eres un chingon',
            pedido
        })

    } catch(error){
        res.status(500).json({
            message: 'NO TE RINDAS',
            error
        })
    }
})

module.exports = {
    pedidosPost
}