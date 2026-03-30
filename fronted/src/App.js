import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [servicios, setServicios] = useState([]);

  const [formData, setFormData] = useState({
    nombreCliente: "",
    correo: "",
    medioContacto: "",
    pais: "",
    idServicio: "",
    descripcionRequerimiento: "",
    fechaPedido: "",
    observaciones: ""
  });

  useEffect(() => {
    fetch("http://localhost:4000/servicios")
      .then((res) => res.json())
      .then((data) => setServicios(data))
      .catch((error) => console.error("Error al obtener servicios:", error));
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // 1. Registrar cliente
      const clienteResponse = await fetch("http://localhost:4000/clientes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          nombreCliente: formData.nombreCliente,
          correo: formData.correo,
          medioContacto: formData.medioContacto,
          pais: formData.pais,
          fechaRegistro: new Date().toISOString().split("T")[0]
        })
      });

      const clienteData = await clienteResponse.json();

      if (!clienteResponse.ok) {
        alert(clienteData.mensaje || "Error al registrar cliente");
        return;
      }

      // 2. Buscar el servicio seleccionado para obtener precio
      const servicioSeleccionado = servicios.find(
        (servicio) => String(servicio.id_servicio) === String(formData.idServicio)
      );

      if (!servicioSeleccionado) {
        alert("Debe seleccionar un servicio válido");
        return;
      }

      // 3. Crear pedido
      const pedidoResponse = await fetch("http://localhost:4000/pedidos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          idCliente: clienteData.id_cliente,
          idServicio: Number(formData.idServicio),
          descripcionRequerimiento: formData.descripcionRequerimiento,
          fechaPedido: formData.fechaPedido,
          estadoPedido: "Pendiente",
          montoTotal: servicioSeleccionado.precio,
          observaciones: formData.observaciones
        })
      });

      const pedidoData = await pedidoResponse.json();

      if (!pedidoResponse.ok) {
        alert(pedidoData.mensaje || "Error al crear pedido");
        return;
      }

      alert("Solicitud de servicio registrada correctamente");

      setFormData({
        nombreCliente: "",
        correo: "",
        medioContacto: "",
        pais: "",
        idServicio: "",
        descripcionRequerimiento: "",
        fechaPedido: "",
        observaciones: ""
      });
    } catch (error) {
      console.error("Error:", error);
      alert("No se pudo conectar con el backend");
    }
  };

  return (
    <div className="container">
      <h1>Plataforma de Servicios Digitales</h1>

      <h2>Servicios disponibles</h2>
      {servicios.map((servicio) => (
        <div className="card" key={servicio.id_servicio}>
          <h3>{servicio.nombre_servicio}</h3>
          <p>{servicio.descripcion}</p>
          <p><strong>Precio:</strong> {servicio.precio}</p>
        </div>
      ))}

      <h2>Solicitar Servicio</h2>
      <div className="card">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="nombreCliente"
            placeholder="Nombre del cliente"
            value={formData.nombreCliente}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="correo"
            placeholder="Correo"
            value={formData.correo}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="medioContacto"
            placeholder="Medio de contacto"
            value={formData.medioContacto}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="pais"
            placeholder="País"
            value={formData.pais}
            onChange={handleChange}
            required
          />

          <select
            name="idServicio"
            value={formData.idServicio}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione un servicio</option>
            {servicios.map((servicio) => (
              <option key={servicio.id_servicio} value={servicio.id_servicio}>
                {servicio.nombre_servicio}
              </option>
            ))}
          </select>

          <textarea
            name="descripcionRequerimiento"
            placeholder="Describa su requerimiento"
            value={formData.descripcionRequerimiento}
            onChange={handleChange}
            required
          />

          <input
            type="date"
            name="fechaPedido"
            value={formData.fechaPedido}
            onChange={handleChange}
            required
          />

          <textarea
            name="observaciones"
            placeholder="Observaciones"
            value={formData.observaciones}
            onChange={handleChange}
          />

          <button type="submit">Solicitar Servicio</button>
        </form>
      </div>
    </div>
  );
}

export default App;