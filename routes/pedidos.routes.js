const express = require('express')
const { pedidosPost, pedidosGet, updatePedido } = require('../controllers/pedidos.controller')
const router = express.Router()

router.post("/", pedidosPost)
router.get("/", pedidosGet)
router.put("/:id", updatePedido)

module.exports = router 
