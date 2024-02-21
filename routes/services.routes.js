const { Router } = require('express');
const { serviceGet, servicePost, servicePut, serviceDel } = require('../controllers/services.controller');
const { celebrateValidator } = require('../middlewares/celebrateValidator');

const router = Router();

router.post("/", celebrateValidator, servicePost);
router.get("/", serviceGet);
router.put("/:id", servicePut);
router.delete("/:id", serviceDel);


module.exports = router