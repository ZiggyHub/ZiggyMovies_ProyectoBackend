const { Router } = require('express');
const { serviceGet, servicePost } = require('../controllers/services.controller');

const router = Router();

router.post("/", servicePost);
router.get("/", serviceGet);


module.exports = router