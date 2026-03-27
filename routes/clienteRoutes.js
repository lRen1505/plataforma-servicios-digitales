const express = require("express");
const router = express.Router();

const { crearCliente, obtenerClientes } = require("../controllers/clienteController");

router.post("/", crearCliente);
router.get("/", obtenerClientes);

module.exports = router;