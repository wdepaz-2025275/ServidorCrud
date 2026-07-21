#  Proyecto: Servidor HTTP Nativo con Node.js y TypeScript
**Estudiante:** Wilfred De Paz  
**Grado:** 5to Bachillerato en Computación / Informática  
**Materia:** Desarrollo Web / Programación  

---

##  Descripción del Proyecto
Este proyecto consiste en la creación de un servidor backend utilizando el módulo nativo `http` de Node.js junto con TypeScript, sin utilizar frameworks externos como Express.

El objetivo principal es implementar un CRUD completo (Crear, Leer, Actualizar y Eliminar) para dos módulos independientes: **Productos** y **Clientes**, almacenando la información de forma persistente en archivos con formato JSON.

---

##  Objetivos Alcanzados
* Comprender el funcionamiento básico de los protocolos HTTP y el módulo `http` nativo de Node.js.
* Manejar adecuadamente los métodos/verbos HTTP principales (`GET`, `POST`, `PUT`, `DELETE`).
* Estructurar el proyecto por capas (`models`, `data`, `services`, `api`) para mantener un código limpio y legible.
* Implementar validaciones de datos y respuestas JSON con códigos de estado HTTP correctos (200, 201, 400, 404, 405).

---

##  Tecnologías y Herramientas Utilizadas
* **Entorno de ejecución:** Node.js
* **Lenguaje:** TypeScript
* **Gestor de paquetes:** PNPM
* **Herramientas de desarrollo:** `tsx` (para ejecutar TypeScript en modo desarrollo)
* **Pruebas de API:** Postman / Navegador Web

---

##  Estructura del Código

El proyecto sigue una arquitectura organizada por carpetas y responsabilidades:

```text
ServidorCRUD/
├── src/
│   ├── api/
│   │   ├── router.ts          # Enrutamiento de las peticiones HTTP
│   │   └── server.ts          # Configuración e inicio del servidor HTTP
│   ├── data/
│   │   ├── clienteRepository.ts # Lectura y escritura del JSON de clientes
│   │   ├── productoRepository.ts# Lectura y escritura del JSON de productos
│   │   ├── clientes.json      # Base de datos local de clientes
│   │   └── productos.json     # Base de datos local de productos
│   ├── models/
│   │   ├── cliente.ts         # Interfaz y modelo del Cliente
│   │   └── producto.ts        # Interfaz y modelo del Producto
│   ├── services/
│   │   ├── clienteService.ts  # Lógica de negocio y validaciones de Clientes
│   │   └── productoService.ts # Lógica de negocio y validaciones de Productos
│   └── index.ts               # Punto de entrada principal (Entry point)
├── package.json               # Configuración de dependencias y scripts
├── tsconfig.json              # Configuración del compilador de TypeScript
└── README.md                  # Documentación del proyecto