const pagos = [];

const crearPago = (req, res) => {
  const nuevoPago = req.body;
  pagos.push(nuevoPago);

  res.json({
    mensaje: "Pago registrado correctamente",
    pago: nuevoPago
  });
};

const obtenerPagos = (req, res) => {
  res.json(pagos);
};

module.exports = {
  crearPago,
  obtenerPagos
};