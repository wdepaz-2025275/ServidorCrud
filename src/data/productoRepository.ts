import { readFile, writeFile } from "fs/promises";
import { Producto } from "../models/producto";

export class ProductoRepository {

    private ruta = "./src/data/productos.json";

    async obtenerProductos(): Promise<Producto[]> {
        try {
            const datos = await readFile(this.ruta, "utf-8");
            return JSON.parse(datos);
        } catch (error) {
            console.log("Error al leer el archivo de productos");
            return [];
        }
    }

    async guardarProductos(productos: Producto[]): Promise<void> {
        try {
            await writeFile(
                this.ruta,
                JSON.stringify(productos, null, 4)
            );
        } catch (error) {
            console.log("Error al guardar productos");
        }
    }

    async eliminarProducto(id: number): Promise<void> {
        try {
            const productos = await this.obtenerProductos();
            const index = productos.findIndex(p => p.id === id);
            
            if (index !== -1) {
                productos.splice(index, 1);
                await this.guardarProductos(productos);
            }
        } catch (error) {
            console.log("Error al eliminar producto");
        }
    }

    async actualizarProducto(producto: Producto): Promise<void> {
        try {
            const productos = await this.obtenerProductos();
            const index = productos.findIndex(p => p.id === producto.id);

            if (index !== -1) {
                productos.splice(index, 1, producto);
                await this.guardarProductos(productos);
            }
        } catch (error) {
            console.log("Error al actualizar producto");
        }
    }
}