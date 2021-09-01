const express = require('express');
const {
  get,
  getUserPosts,
  insert,
  update,
  remove,
} = require("./users-model")
const {
  insert: insertPost,
} = require("../posts/posts-model")
const { validateUserId, validateUser, validatePost } = require("../middleware/middleware")
 
// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required

const router = express.Router();

router.get('/', async (req, res) => {
  // RETURN AN ARRAY WITH ALL THE USERS
  try {
    const users = await get()
    res.status(200).json(users)
  } catch(err) {
    res.status(500).json(err)
  }
});

router.get('/:id', validateUserId, (req, res) => {
  // RETURN THE USER OBJECT
  // this needs a middleware to verify user id
  res.status(200).json(req.user)
});

router.post('/', validateUser, async (req, res) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
  try {
    const createdUser = await insert(req.body)
    res.status(201).json(createdUser)
  } catch(err) {
    res.status(500).json(err)
  }
});

router.put('/:id', validateUserId, validateUser, async (req, res) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  try {
    const { params: { id }, body } = req
    const updatedUser = await update(id, body)
    res.status(200).json(updatedUser)
  } catch(err) {
    res.status(500).json(err)
  }
});

router.delete('/:id', validateUserId, async (req, res) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
  try {
    const { params: { id }, user } = req
    await remove(id)
    res.status(200).json(user)
  } catch(err) {
    res.status(500).json(err)
  }
});

router.get('/:id/posts', validateUserId, async (req, res) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
  try {
    const posts = await getUserPosts(req.params.id)
    res.status(200).json(posts)
  } catch(err) {
    res.status(500).json(err)
  }
});

router.post('/:id/posts', validateUserId, validatePost, async (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  try {
    const createdPost = await insertPost(req.body)
    res.status(201).json(createdPost)
  } catch(err) {
    res.status(500).json(err)
  }
});


// do not forget to export the router
module.exports = router