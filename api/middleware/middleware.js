const { getById } = require("../users/users-model")

function logger(req, res, next) {
  // DO YOUR MAGIC
  const { method, url, timestamp } = req
  console.log(method, url, timestamp)
  next()
}

async function validateUserId(req, res, next) {
  // DO YOUR MAGIC
  try {
    const { id } = req.params
    const user = await getById(id)
    user ? req.user = user : res.status(404).json({ message: "user not found" })
    next()
  } catch(err) {
    res.status(500).json({ message: err.message })
  }
}

function validateUser(req, res, next) {
  // DO YOUR MAGIC
  const { body } = req
  body.name ? next() : res.status(400).json({ message: "missing required name field" })
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
  const { body } = req
  body.text ? next() : res.status(400).json({ message: "missing required text field" })
}

// do not forget to expose these functions to other modules
module.exports = { logger, validateUserId, validateUser, validatePost }