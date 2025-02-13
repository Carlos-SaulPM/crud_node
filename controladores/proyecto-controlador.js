const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).send("Probando proyecto");
});

router.get("/error", (req, res) => {
  throw new Error("Error");
});

module.exports = router;
