const db = require("../config/db");

const obtenerServicios = (req, res) => {
  const sql = "SELECT * FROM servicios";

  db.query(sql, (error, results) => {
    if (error) {
      console.error("Error al obtener servicios:", error);
      return res.status(500).json({
        mensaje: "Error al obtener servicios"
      });
    }

    res.json(results);
  });
};

module.exports = {
  obtenerServicios
};