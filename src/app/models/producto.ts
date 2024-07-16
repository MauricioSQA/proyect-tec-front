export interface Producto {
    id?: number;
    nombre: string;
    descripcion: string;
    codProducto?: string;
    precioOriginal: number;
    precioOferta: number;
    cant_disponible: number;
    tipoProducto: string;
    empresa: {
      id: number;
    };
  }