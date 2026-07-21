import { IncomingMessage, ServerResponse } from "http";
import { json } from "stream/consumers";
import { ProductoService } from "../services/productoService";
import { ClienteService } from "../services/clienteService";
import { Producto } from "../models/producto";
import { Cliente } from "../models/cliente";

const productoService = new ProductoService();
const clienteService = new ClienteService();

export async function router(req: IncomingMessage, res: ServerResponse) {
    res.setHeader("Content-Type", "application/json");

    const url = req.url ?? "";
    const method = req.method ?? "";

    try {

        //  RUTAS DE PRODUCTOS

        // 1. GET /productos (Mostrar todos)
        if (method === "GET" && url === "/productos") {
            const productos = await productoService.listar();
            res.writeHead(200);
            res.end(JSON.stringify(productos));
            return;
        }

        // 2. GET /productos/:id (Buscar uno)
        if (method === "GET" && url.startsWith("/productos/")) {
            const id = parseInt(url.split("/").pop() ?? "");
            const producto = await productoService.buscar(id);

            if (producto) {
                res.writeHead(200);
                res.end(JSON.stringify(producto));
                return;
            }

            res.writeHead(404);
            res.end(JSON.stringify({ error: "Producto no encontrado" }));
            return;
        }

        // 3. POST /productos (Agregar)
        if (method === "POST" && url === "/productos") {
            const body = await json(req) as Producto;
            const resultado = await productoService.agregar(body);

            if (resultado.error) {
                res.writeHead(400);
                res.end(JSON.stringify({ error: resultado.error }));
                return;
            }

            res.writeHead(201);
            res.end(JSON.stringify(resultado.producto));
            return;
        }

        // 4. PUT /productos/:id (Actualizar)
        if (method === "PUT" && url.startsWith("/productos/")) {
            const id = parseInt(url.split("/").pop() ?? "");
            const body = await json(req) as Producto;

            const resultado = await productoService.actualizar(id, body);

            if (resultado.error) {
                res.writeHead(400);
                res.end(JSON.stringify({ error: resultado.error }));
                return;
            }

            res.writeHead(200);
            res.end(JSON.stringify(resultado.producto));
            return;
        }

        // 5. DELETE /productos/:id (Eliminar)
        if (method === "DELETE" && url.startsWith("/productos/")) {
            const id = parseInt(url.split("/").pop() ?? "");
            const eliminado = await productoService.eliminar(id);

            if (eliminado) {
                res.writeHead(200);
                res.end(JSON.stringify({ mensaje: "Producto eliminado correctamente" }));
                return;
            }

            res.writeHead(404);
            res.end(JSON.stringify({ error: "Producto no encontrado" }));
            return;
        }

        // RUTAS DE CLIENTES

        // 1. GET /clientes (Mostrar todos)
        if (method === "GET" && url === "/clientes") {
            const clientes = await clienteService.listar();
            res.writeHead(200);
            res.end(JSON.stringify(clientes));
            return;
        }

        // 2. GET /clientes/:id (Buscar uno)
        if (method === "GET" && url.startsWith("/clientes/")) {
            const id = parseInt(url.split("/").pop() ?? "");
            const cliente = await clienteService.buscar(id);

            if (cliente) {
                res.writeHead(200);
                res.end(JSON.stringify(cliente));
                return;
            }

            res.writeHead(404);
            res.end(JSON.stringify({ error: "Cliente no encontrado" }));
            return;
        }

        // 3. POST /clientes (Agregar)
        if (method === "POST" && url === "/clientes") {
            const body = await json(req) as Cliente;
            const resultado = await clienteService.agregar(body);

            if (resultado.error) {
                res.writeHead(400);
                res.end(JSON.stringify({ error: resultado.error }));
                return;
            }

            res.writeHead(201);
            res.end(JSON.stringify(resultado.cliente));
            return;
        }

        // 4. PUT /clientes/:id (Actualizar)
        if (method === "PUT" && url.startsWith("/clientes/")) {
            const id = parseInt(url.split("/").pop() ?? "");
            const body = await json(req) as Cliente;

            const resultado = await clienteService.actualizar(id, body);

            if (resultado.error) {
                res.writeHead(400);
                res.end(JSON.stringify({ error: resultado.error }));
                return;
            }

            res.writeHead(200);
            res.end(JSON.stringify(resultado.cliente));
            return;
        }

        // 5. DELETE /clientes/:id (Eliminar)
        if (method === "DELETE" && url.startsWith("/clientes/")) {
            const id = parseInt(url.split("/").pop() ?? "");
            const eliminado = await clienteService.eliminar(id);

            if (eliminado) {
                res.writeHead(200);
                res.end(JSON.stringify({ mensaje: "Cliente eliminado correctamente" }));
                return;
            }

            res.writeHead(404);
            res.end(JSON.stringify({ error: "Cliente no encontrado" }));
            return;
        }

        // Ruta no encontrada
        res.writeHead(404);
        res.end(JSON.stringify({ error: "Ruta inexistente" }));

    } catch (error) {
        res.writeHead(500);
        res.end(JSON.stringify({ error: "Error interno del servidor o JSON inválido" }));
    }
}