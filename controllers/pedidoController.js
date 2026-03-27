const pedidos = [];

const crearPedido = (req, res) => {
  const nuevoPedido = req.body;
  pedidos.push(nuevoPedido);

  res.json({
    mensaje: "Pedido registrado correctamente",
    pedido: nuevoPedido
  });
};

const obtenerPedidos = (req, res) => {
  res.json(pedidos);
};

module.exports = {
  crearPedido,
  obtenerPedidos
};