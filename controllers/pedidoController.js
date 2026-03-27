const db = require("../config/db");

const crearPedido = (req, res) => {
  const {
    idCliente,
    idServicio,
    descripcionRequerimiento,
    fechaPedido,
    estadoPedido,
    montoTotal,
    observaciones
  } = req.body;

  const sql = `
    INSERT INTO pedidos (
      id_cliente,
      id_servicio,
      descripcion_requerimiento,
      fecha_pedido,
      estado_pedido,
      monto_total,
      observaciones
    )
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      idCliente,
      idServicio,
      descripcionRequerimiento,
      fechaPedido,
      estadoPedido,
      montoTotal,
      observaciones
    ],
    (error, result) => {
      if (error) {
        console.error("Error al crear pedido:", error);
        return res.status(500).json({
          mensaje: "Error al crear pedido"
        });
      }

      res.json({
        mensaje: "Pedido registrado correctamente",
        id_pedido: result.insertId
      });
    }
  );
};

const obtenerPedidos = (req, res) => {
  const sql = `
    SELECT 
      p.id_pedido,
      c.nombre_cliente,
      s.nombre_servicio,
      p.descripcion_requerimiento,
      p.fecha_pedido,
      p.estado_pedido,
      p.monto_total,
      p.observaciones
    FROM pedidos p
    INNER JOIN clientes c ON p.id_cliente = c.id_cliente
    INNER JOIN servicios s ON p.id_servicio = s.id_servicio
  `;

  db.query(sql, (error, results) => {
    if (error) {
      console.error("Error al obtener pedidos:", error);
      return res.status(500).json({
        mensaje: "Error al obtener pedidos"
      });
    }

    res.json(results);
  });
};

module.exports = {
  crearPedido,
  obtenerPedidos
};