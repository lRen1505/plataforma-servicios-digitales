const servicios = [
  { id: 1, nombre: "Carry Mítico+", precio: 50 },
  { id: 2, nombre: "Carry Raid Heroico", precio: 100 }
];

const obtenerServicios = (req, res) => {
  res.json(servicios);
};

module.exports = {
  obtenerServicios
};