const express = require("express");

const app = express();
const PORT = 3000;

const servicioRoutes = require("./routes/servicioRoutes");
const pedidoRoutes = require("./routes/pedidoRoutes");
const clienteRoutes = require("./routes/clienteRoutes");
const pagoRoutes = require("./routes/pagoRoutes");

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend WoW Carrys funcionando");
});

app.use("/servicios", servicioRoutes);
app.use("/pedidos", pedidoRoutes);
app.use("/clientes", clienteRoutes);
app.use("/pagos", pagoRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});