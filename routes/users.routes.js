const { Router } = require('express');
const { userGet, userPost, userPut, userDel } = require('../controllers/users.controller');

const router = Router();

router.post("/", userPost);                  //Create
router.get("/", userGet);                   //Read
router.put("/:id", userPut);               //Update
router.delete("/:id", userDel);           //Delete

module.exports = router
