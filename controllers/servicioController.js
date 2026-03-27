const servicios = [
  {
    id: 1,
    nombre: "Desarrollo de página web",
    descripcion: "Creación de landing page o sitio web corporativo",
    precio: 300 
  },
  {
    id: 2,
    nombre: "Diseño de logo",
    descripcion: "Diseño de identidad visual para marca o negocio",
    precio: 80
  },
  {
    id: 3,
    nombre: "Dashboard en Power BI",
    descripcion: "Desarrollo de reportes y paneles interactivos",
    precio: 150
  }
];

const obtenerServicios = (req, res) => {
  res.json(servicios);
};

module.exports = {
  obtenerServicios
};