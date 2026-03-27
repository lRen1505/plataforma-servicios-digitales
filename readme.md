# Plataforma de Contratación de Servicios Digitales

## Descripción
Este proyecto consiste en el desarrollo de un backend para una plataforma de contratación de servicios digitales. La solución permite gestionar clientes, servicios, pedidos y pagos mediante una API REST construida con Node.js, Express y MySQL.

El sistema está orientado a digitalizar el proceso de contratación de servicios, desde la consulta de servicios disponibles hasta el registro del pedido y la confirmación del pago.

## Objetivo
Desarrollar una API backend que permita administrar de manera estructurada el proceso de contratación de servicios digitales, integrando lógica de negocio, persistencia de datos y organización modular del código.

## Tecnologías utilizadas
- Node.js
- Express
- MySQL
- MySQL Workbench
- Git
- GitHub
- Thunder Client
- Visual Studio Code

## Estructura del proyecto
```text
plataforma-servicios-digitales/
│
├── config/
│   └── db.js
│
├── controllers/
│   ├── clienteController.js
│   ├── servicioController.js
│   ├── pedidoController.js
│   └── pagoController.js
│
├── routes/
│   ├── clienteRoutes.js
│   ├── servicioRoutes.js
│   ├── pedidoRoutes.js
│   └── pagoRoutes.js
│
├── node_modules/
├── .gitignore
├── package.json
├── package-lock.json
└── server.js