const clientes = [];

const crearCliente = (req, res) => {
  const nuevoCliente = req.body;
  clientes.push(nuevoCliente);

  res.json({
    mensaje: "Cliente creado correctamente",
    cliente: nuevoCliente
  });
};

const obtenerClientes = (req, res) => {
  res.json(clientes);
};

module.exports = {
  crearCliente,
  obtenerClientes
};