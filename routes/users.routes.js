const { Router } = require('express');
const { userGet, userPost, loginUser, userPut, userDel } = require('../controllers/users.controller');
const { celebrateValidator } = require('../middlewares/celebrateValidator');


const router = Router();

router.post("/", celebrateValidator, userPost);                 //Create
router.post("/login", loginUser)
router.get("/", userGet);                                       //Read
router.put("/:id", userPut);                                    //Update
router.delete("/:id", userDel);                                 //Delete

module.exports = router
