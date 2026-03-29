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

  const handleChange = (e) => {
    setCliente({
      ...cliente,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:4000/clientes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(cliente)
      });

      const data = await res.json();

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

      <h2>Registrar Cliente</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="nombreCliente"
          placeholder="Nombre del cliente"
          value={cliente.nombreCliente}
          onChange={handleChange}
        />
        <br /><br />

        <input
          type="email"
          name="correo"
          placeholder="Correo"
          value={cliente.correo}
          onChange={handleChange}
        />
        <br /><br />

        <input
          type="text"
          name="medioContacto"
          placeholder="Medio de contacto"
          value={cliente.medioContacto}
          onChange={handleChange}
        />
        <br /><br />

        <input
          type="text"
          name="pais"
          placeholder="País"
          value={cliente.pais}
          onChange={handleChange}
        />
        <br /><br />

        <input
          type="date"
          name="fechaRegistro"
          value={cliente.fechaRegistro}
          onChange={handleChange}
        />
        <br /><br />

        <button type="submit">Registrar Cliente</button>
      </form>
    </div>
  );
}

export default App;