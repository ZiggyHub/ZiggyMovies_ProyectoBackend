const { Router } = require('express');
const { userGet, userPost, userPut, userDel } = require('../controllers/users.controller');
const { celebrateValidator } = require('../middlewares/celebrateValidator');


const router = Router();

router.post("/", celebrateValidator, userPost);                  //Create
router.get("/", userGet);                   //Read
router.put("/:id", userPut);               //Update
router.delete("/:id", userDel);           //Delete

module.exports = router
