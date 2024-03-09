const { Router } = require('express');
const { userGet, userPost, loginUser, userPut, userDel, getUserData } = require('../controllers/users.controller');
const { celebrateValidator } = require('../middlewares/celebrateValidator');
const { protect } = require('../middlewares/authMiddleware');


const router = Router();

router.post("/", userPost);                 //Create
router.post("/login", loginUser)
router.get("/", userGet);                
router.get("/me", protect, getUserData)                         //Read
router.put("/:id", protect, userPut);                                    //Update
router.delete("/:id", protect, userDel);                                 //Delete

module.exports = router
