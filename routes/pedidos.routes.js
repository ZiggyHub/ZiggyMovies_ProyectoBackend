const express = require('express')
const { pedidosPost, pedidosGet, updatePedido, getUserPedido } = require('../controllers/pedidos.controller')
const { protect, protectPedido } = require('../middlewares/authMiddleware')
const router = express.Router()

router.post("/", pedidosPost)
router.get("/", pedidosGet)
router.get("/me",protectPedido, getUserPedido)
router.put("/:id", updatePedido)

module.exports = router 
