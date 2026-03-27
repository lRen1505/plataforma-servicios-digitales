const express = require("express");
const router = express.Router();

const { crearPago, obtenerPagos } = require("../controllers/pagoController");

router.post("/", crearPago);
router.get("/", obtenerPagos);

module.exports = router;