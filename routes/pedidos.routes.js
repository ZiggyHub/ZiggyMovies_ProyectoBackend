const express = require('express')
const { pedidosPost } = require('../controllers/pedidos.controller')
const router = express.Router()

router.post("/", pedidosPost)

module.exports = router 
