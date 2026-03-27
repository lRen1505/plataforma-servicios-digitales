const express = require("express");
const router = express.Router();

const { obtenerServicios } = require("../controllers/servicioController");

router.get("/", obtenerServicios);

module.exports = router;