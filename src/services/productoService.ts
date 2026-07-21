import { Producto } from "../models/producto";
import { ProductoRepository } from "../data/productoRepository";

export class ProductoService {

    private repository = new ProductoRepository();

    async listar(): Promise<Producto[]> {
        return await this.repository.obtenerProductos();
    }

    async buscar(id: number): Promise<Producto | undefined> {
        const productos = await this.repository.obtenerProductos();
        return productos.find(p => p.id === id);
    }

    async agregar(datos: any): Promise<{ error?: string; producto?: Producto }> {
        try {
            const productos = await this.repository.obtenerProductos();

            if (!datos.nombre || datos.nombre.trim() === '') {
                return { error: 'El nombre no puede estar vacío.' };
            }
            if (!datos.categoria || datos.categoria.trim() === '') {
                return { error: 'La categoría no puede estar vacía.' };
            }
            if (datos.precio === undefined || datos.precio < 0) {
                return { error: 'El precio no puede ser negativo.' };
            }
            if (datos.stock === undefined || datos.stock < 0) {
                return { error: 'El stock no puede ser negativo.' };
            }

            const nuevoId = productos.length > 0 ? productos[productos.length - 1].id + 1 : 1;

            const nuevoProducto: Producto = {
                id: nuevoId,
                nombre: datos.nombre,
                descripcion: datos.descripcion || '',
                precio: datos.precio,
                stock: datos.stock,
                categoria: datos.categoria,
                estado: datos.estado !== undefined ? datos.estado : true
            };

            productos.push(nuevoProducto);
            await this.repository.guardarProductos(productos);
            return { producto: nuevoProducto };

        } catch (error) {
            return { error: 'Error interno al agregar el producto.' };
        }
    }

    async actualizar(id: number, datos: any): Promise<{ error?: string; producto?: Producto }> {
        try {
            const productos = await this.repository.obtenerProductos();
            const indice = productos.findIndex(p => p.id === id);

            if (indice === -1) {
                return { error: 'Producto no encontrado.' };
            }

            if (datos.precio !== undefined && datos.precio < 0) {
                return { error: 'El precio no puede ser negativo.' };
            }
            if (datos.stock !== undefined && datos.stock < 0) {
                return { error: 'El stock no puede ser negativo.' };
            }

            const productoActualizado: Producto = {
                ...productos[indice],
                ...datos,
                id 
            };

            productos[indice] = productoActualizado;
            await this.repository.guardarProductos(productos);
            return { producto: productoActualizado };

        } catch (error) {
            return { error: 'Error interno al actualizar.' };
        }
    }

    async eliminar(id: number): Promise<boolean> {
        try {
            const productos = await this.repository.obtenerProductos();
            const nuevos = productos.filter(p => p.id !== id);

            if (productos.length === nuevos.length) {
                return false; 
            }

            await this.repository.guardarProductos(nuevos);
            return true;
        } catch (error) {
            return false;
        }
    }
}