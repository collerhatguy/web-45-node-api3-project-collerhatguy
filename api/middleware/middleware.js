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
    user ? req.user = user : next({ status: 404, message: "user not found" })
    next()
  } catch(err) {
    next({ message: err.message })
  }
}

function validateUser(req, res, next) {
  // DO YOUR MAGIC
  const { body } = req
  body.name ? next() : next({ status: 400, message: "missing required name field" })
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
  const { body, params: { id } } = req
  body.text ? req.post = { ...body, user_id: id } : next({ status: 400, message: "missing required text field" })
  next()
}

// do not forget to expose these functions to other modules
module.exports = { logger, validateUserId, validateUser, validatePost }