const postRouter = require("express").Router();

const postController = require("../controllers/postController");
const { loginRequired } = require("../middlewares/auth");

postRouter.get('/posts', postController.allPosts);
postRouter.post('/sharefeed', loginRequired, postController.createPost);

module.exports = {
     postRouter
}