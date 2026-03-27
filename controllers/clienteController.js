const db = require("../config/db");

const crearCliente = (req, res) => {
  const { nombreCliente, correo, medioContacto, pais, fechaRegistro } = req.body;

  const sql = `
    INSERT INTO clientes (nombre_cliente, correo, medio_contacto, pais, fecha_registro)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [nombreCliente, correo, medioContacto, pais, fechaRegistro],
    (error, result) => {
      if (error) {
        console.error("Error al crear cliente:", error);
        return res.status(500).json({
          mensaje: "Error al crear cliente"
        });
      }

      res.json({
        mensaje: "Cliente creado correctamente",
        id_cliente: result.insertId
      });
    }
  );
};

const obtenerClientes = (req, res) => {
  const sql = "SELECT * FROM clientes";

  db.query(sql, (error, results) => {
    if (error) {
      console.error("Error al obtener clientes:", error);
      return res.status(500).json({
        mensaje: "Error al obtener clientes"
      });
    }

    res.json(results);
  });
};

module.exports = {
  crearCliente,
  obtenerClientes
};