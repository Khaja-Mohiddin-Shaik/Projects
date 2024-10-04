const express = require("express");
const commonRouter = express.Router();
const {login} = require("../controller/commonApi");

commonRouter.post("/login",login);

module.exports = commonRouter


