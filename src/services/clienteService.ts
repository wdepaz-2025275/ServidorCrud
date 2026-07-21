import { Cliente } from "../models/cliente";
import { ClienteRepository } from "../data/clienteRepository";

export class ClienteService {

    private repository = new ClienteRepository();

    async listar(): Promise<Cliente[]> {
        return await this.repository.obtenerClientes();
    }

    async buscar(id: number): Promise<Cliente | undefined> {
        const clientes = await this.repository.obtenerClientes();
        return clientes.find(c => c.id === id);
    }

    async agregar(datos: any): Promise<{ error?: string; cliente?: Cliente }> {
        try {
            const clientes = await this.repository.obtenerClientes();

            if (!datos.nombre || datos.nombre.trim() === '') {
                return { error: 'El nombre no puede estar vacío.' };
            }
            if (!datos.apellido || datos.apellido.trim() === '') {
                return { error: 'El apellido no puede estar vacío.' };
            }
            if (!datos.correo || datos.correo.trim() === '') {
                return { error: 'El correo no puede estar vacío.' };
            }
            if (!datos.telefono || datos.telefono.trim() === '') {
                return { error: 'El teléfono no puede estar vacío.' };
            }

            const correoExiste = clientes.some(c => c.correo === datos.correo);
            if (correoExiste) {
                return { error: 'El correo ya se encuentra registrado.' };
            }

            const nuevoId = clientes.length > 0 ? clientes[clientes.length - 1].id + 1 : 1;

            const nuevoCliente: Cliente = {
                id: nuevoId,
                nombre: datos.nombre,
                apellido: datos.apellido,
                correo: datos.correo,
                telefono: datos.telefono,
                direccion: datos.direccion || '',
                estado: datos.estado !== undefined ? datos.estado : true
            };

            clientes.push(nuevoCliente);
            await this.repository.guardarClientes(clientes);
            return { cliente: nuevoCliente };

        } catch (error) {
            return { error: 'Error interno al agregar cliente.' };
        }
    }

    async actualizar(id: number, datos: any): Promise<{ error?: string; cliente?: Cliente }> {
        try {
            const clientes = await this.repository.obtenerClientes();
            const indice = clientes.findIndex(c => c.id === id);

            if (indice === -1) {
                return { error: 'Cliente no encontrado.' };
            }

            if (datos.correo) {
                const correoExiste = clientes.some(c => c.correo === datos.correo && c.id !== id);
                if (correoExiste) {
                    return { error: 'El correo ya pertenece a otro cliente.' };
                }
            }

            const clienteActualizado: Cliente = {
                ...clientes[indice],
                ...datos,
                id
            };

            clientes[indice] = clienteActualizado;
            await this.repository.guardarClientes(clientes);
            return { cliente: clienteActualizado };

        } catch (error) {
            return { error: 'Error interno al actualizar.' };
        }
    }

    async eliminar(id: number): Promise<boolean> {
        try {
            const clientes = await this.repository.obtenerClientes();
            const nuevos = clientes.filter(c => c.id !== id);

            if (clientes.length === nuevos.length) {
                return false;
            }

            await this.repository.guardarClientes(nuevos);
            return true;
        } catch (error) {
            return false;
        }
    }
}