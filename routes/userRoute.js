const userRouter = require("express").Router();

const userController = require("../controllers/userController")

userRouter.get('/users', userController.allUsers);
userRouter.get('/users/:id', userController.idUsers);
userRouter.get('/:id', userController.getUser);

module.exports = {
     userRouter
}