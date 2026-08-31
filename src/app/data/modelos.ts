/**
 * Modelos usados por la web informativa de Rubí Estética Integral.
 * Mantienen la estructura de los catálogos públicos: locales, tratamientos,
 * productos y promociones.
 */

export interface Local {
  id: number;
  uuidGlobal: string;
  nombre: string;
  direccion: string;
  referencia: string;
  distrito: string;
  telefono: string;
  horario: { dias: string; apertura: string; cierre: string }[];
  imagen: string;
  mapa: string;
  latitud: number;
  longitud: number;
  activo: boolean;
}

export interface Habitacion {
  id: number;
  nombre: string;
  localId: number;
  equipamiento: string;
  activa: boolean;
}

export type CategoriaTratamiento =
  | 'Facial'
  | 'Corporal'
  | 'Aparatología'
  | 'Medicina estética'
  | (string & {});

export interface Tratamiento {
  id: number;
  nombre: string;
  categoria: CategoriaTratamiento;
  etiquetas: string[];
  resumen: string;
  descripcion: string;
  beneficios: string[];
  recomendaciones: string[];
  duracionMin: number;
  limpiezaMin: number;
  precio: number;
  precioAntes?: number;
  imagen: string;
  nombreImagen?: string;
  video?: string;
  videoPoster?: string;
  tiktokUrl?: string;
  galeria?: string[];
  destacado: boolean;
  activo: boolean;
}

export interface Producto {
  id: number;
  nombre: string;
  marca: string;
  categoria: string;
  descripcion: string;
  precio: number;
  precioAntes?: number;
  stock: number;
  imagen: string;
  nombreImagen?: string;
  beneficios?: string[];
  recomendaciones?: string[];
  modoUso?: string[];
  activo: boolean;
}

export interface Promocion {
  id: number;
  titulo: string;
  subtitulo: string;
  descripcion: string;
  categoria: CategoriaTratamiento | 'General';
  precioAntes?: number;
  precio?: number;
  sesiones?: number;
  sesionesDetalle?: { titulo: string; descripcion: string; tratamientoId?: number }[];
  vigenciaDesde: string;
  vigenciaHasta: string;
  imagen: string;
  nombreImagen?: string;
  etiqueta: string;
  destacada: boolean;
  activa: boolean;
}
