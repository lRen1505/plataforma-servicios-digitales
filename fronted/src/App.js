import { useEffect, useState } from "react";

function App() {
  const [servicios, setServicios] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/servicios")
      .then((res) => res.json())
      .then((data) => setServicios(data))
      .catch((error) => console.error("Error:", error));
  }, []);

  return (
    <div>
      <h1>Plataforma de Servicios Digitales</h1>

      <h2>Servicios disponibles</h2>

      {servicios.map((servicio) => (
        <div key={servicio.id_servicio}>
          <h3>{servicio.nombre_servicio}</h3>
          <p>{servicio.descripcion}</p>
          <p>Precio: {servicio.precio}</p>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default App;