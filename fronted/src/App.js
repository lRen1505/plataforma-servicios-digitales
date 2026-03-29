import { useEffect, useState } from "react";

function App() {
  const [servicios, setServicios] = useState([]);

  const [cliente, setCliente] = useState({
    nombreCliente: "",
    correo: "",
    medioContacto: "",
    pais: "",
    fechaRegistro: ""
  });

  useEffect(() => {
    fetch("http://localhost:4000/servicios")
      .then((res) => res.json())
      .then((data) => setServicios(data))
      .catch((error) => console.error("Error:", error));
  }, []);

const handleSubmit = async (e) => {
  e.preventDefault();

  console.log("Enviando cliente:", cliente);

  try {
    const res = await fetch("http://localhost:4000/clientes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(cliente)
    });

    const data = await res.json();
    console.log("Respuesta:", data);

    if (!res.ok) {
      alert(data.mensaje || "Error al registrar cliente");
      return;
    }

    alert("Cliente registrado correctamente");

    setCliente({
      nombreCliente: "",
      correo: "",
      medioContacto: "",
      pais: "",
      fechaRegistro: ""
    });
  } catch (error) {
    console.error("Error:", error);
    alert("No se pudo conectar con el backend");
  }
};

  return (
    <div style={{ padding: "20px" }}>
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