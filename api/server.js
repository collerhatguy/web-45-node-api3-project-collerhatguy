const express = require('express');
const { logger } = require('./middleware/middleware');
const userEndpoints = require("./users/users-router")

const server = express();

// remember express by default cannot parse JSON in request bodies
server.use(express.json())

// global middlewares and the user's router need to be connected here
server.use(logger)
server.use("/api/users", userEndpoints)


module.exports = server;
