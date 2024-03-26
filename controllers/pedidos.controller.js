const asyncHandler = require('express-async-handler')
const { response, request } = require('express');
const Pedido = require('../models/pedidos.model')

const pedidosPost = asyncHandler(async (req,res) => {
    try{
        const { codigo, cliente, producto, state } = req.body

        const pedido = await Pedido.create({
            codigo,
            cliente,
            producto, 
            state
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

const pedidosGet = asyncHandler(async (req, res) => {
    try {
        const queryParam = {state: true}
        const pedidos = await Pedido.find(queryParam).populate("cliente")
        res.status(200).json({
            pedidos
        })
    } catch(error){
        res.status(500).json({
            message: "te la pelstei papa"
        })
    }
})

const updatePedido = asyncHandler(async (req,res) => {
    const pedido = await Pedido.findById(req.params.id)

    if (!pedido) {
        res.status(404)
            throw new Error('El error no fue encontrado')
    } else {
        const updatedPedido = await Pedido.findByIdAndUpdate(req.params.id, req.body, {new: true})
        res.status(200).json(updatedPedido)
    }
})

module.exports = {
    pedidosPost,
    pedidosGet,
    updatePedido
}