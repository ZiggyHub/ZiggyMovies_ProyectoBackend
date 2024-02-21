const { Router } = require('express');
const { serviceGet, servicePost, servicePut, serviceDel } = require('../controllers/services.controller');

const router = Router();

router.post("/", servicePost);
router.get("/", serviceGet);
router.put("/:id", servicePut);
router.delete("/:id", serviceDel);


module.exports = router