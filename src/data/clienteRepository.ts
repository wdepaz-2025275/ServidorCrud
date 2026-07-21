import { readFile, writeFile } from "fs/promises";
import { Cliente } from "../models/cliente";

export class ClienteRepository {

    private ruta = "./src/data/clientes.json";

    async obtenerClientes(): Promise<Cliente[]> {
        try {
            const datos = await readFile(this.ruta, "utf-8");
            return JSON.parse(datos);
        } catch (error) {
            console.log("Error al leer el archivo de clientes");
            return [];
        }
    }

    async guardarClientes(clientes: Cliente[]): Promise<void> {
        try {
            await writeFile(
                this.ruta,
                JSON.stringify(clientes, null, 4)
            );
        } catch (error) {
            console.log("Error al guardar clientes");
        }
    }

    async eliminarCliente(id: number): Promise<void> {
        try {
            const clientes = await this.obtenerClientes();
            const index = clientes.findIndex(c => c.id === id);

            if (index !== -1) {
                clientes.splice(index, 1);
                await this.guardarClientes(clientes);
            }
        } catch (error) {
            console.log("Error al eliminar cliente");
        }
    }

    async actualizarCliente(cliente: Cliente): Promise<void> {
        try {
            const clientes = await this.obtenerClientes();
            const index = clientes.findIndex(c => c.id === cliente.id);

            if (index !== -1) {
                clientes.splice(index, 1, cliente);
                await this.guardarClientes(clientes);
            }
        } catch (error) {
            console.log("Error al actualizar cliente");
        }
    }
}