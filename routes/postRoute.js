const postRouter = require("express").Router();

const postController = require("../controllers/postController")

postRouter.get('/posts', postController.allPosts);
postRouter.post('/sharefeed', postController.createPost);

module.exports = {
     postRouter
}