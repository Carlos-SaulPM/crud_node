const express = require("express");
const router = express.Router();

const home_controller = require("../controladores/home_controller")

router.get("/", home_controller.index);

module.exports = router;