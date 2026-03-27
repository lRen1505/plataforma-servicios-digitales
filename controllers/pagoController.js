const db = require("../config/db");

const crearPago = (req, res) => {
  const {
    idPedido,
    metodoPago,
    estadoPago,
    referenciaPago,
    fechaPago,
    montoPagado,
    moneda
  } = req.body;

  const sql = `
    INSERT INTO pagos (
      id_pedido,
      metodo_pago,
      estado_pago,
      referencia_pago,
      fecha_pago,
      monto_pagado,
      moneda
    )
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      idPedido,
      metodoPago,
      estadoPago,
      referenciaPago,
      fechaPago,
      montoPagado,
      moneda
    ],
    (error, result) => {
      if (error) {
        console.error("Error al registrar pago:", error);
        return res.status(500).json({
          mensaje: "Error al registrar pago"
        });
      }

      res.json({
        mensaje: "Pago registrado correctamente",
        id_pago: result.insertId
      });
    }
  );
};

const obtenerPagos = (req, res) => {
  const sql = `
    SELECT 
      pa.id_pago,
      p.id_pedido,
      pa.metodo_pago,
      pa.estado_pago,
      pa.referencia_pago,
      pa.fecha_pago,
      pa.monto_pagado,
      pa.moneda
    FROM pagos pa
    INNER JOIN pedidos p ON pa.id_pedido = p.id_pedido
  `;

  db.query(sql, (error, results) => {
    if (error) {
      console.error("Error al obtener pagos:", error);
      return res.status(500).json({
        mensaje: "Error al obtener pagos"
      });
    }

    res.json(results);
  });
};

module.exports = {
  crearPago,
  obtenerPagos
};