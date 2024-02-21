const { Router } = require('express');
const { userGet, userPost } = require('../controllers/users.controller');

const router = Router();

router.post("/", userPost)                  //Create
router.get("/", userGet);                   //Read

module.exports = router
