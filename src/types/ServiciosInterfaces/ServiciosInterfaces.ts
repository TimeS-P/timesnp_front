export interface Servicio {
  id: string;
  nombre: string;
  descripcion: string;
  precio: number;
  tipoServicio: TipoServicio;
  fotosTrabajo: FotoTrabajo[];
  idProveedorHasServicio: ProveedorHasServicio;
  contrataciones: Contratacion[];
  idCombo: string | null;
}

// Enums
export type TipoServicio = "SERVICIO" | "PRODUCTO";
export type Genero = "M" | "F" | "O";
export type DiaSemana = "LUNES" | "MARTES" | "MIÉRCOLES" | "JUEVES" | "VIERNES" | "SÁBADO" | "DOMINGO";

// Interfaces secundarias
export interface FotoTrabajo {
  id: string;
  url_foto: string;
}

export interface ProveedorHasServicio {
  id: string;
  calificacion: number;
  tipoPrecio: TipoPrecio;
  proveedor: Proveedor;
  diasLibres: DiaLibre[];
}

export interface TipoPrecio {
  id: string;
  unidad_medida: string;
}

export interface Proveedor {
  id: string;
  rfc: string;
  perfil: Perfil;
}

export interface Perfil {
  id: string;
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  telefono: string | null;
  foto: string;
  puntos: number;
  codigoCompartir: string;
  fechaNacimiento: string;
  genero: Genero;
  descripcion: string;
  usuario: Usuario;
  verificacion: Verificacion;
}

export interface Usuario {
  id: string;
  email: string;
  verificarCorreo: string | null;
  domicilios: Domicilio[];
  recuperarPassword: string | null;
  enabled: boolean;
  accountNonExpired: boolean;
  accountNonLocked: boolean;
  credentialsNonExpired: boolean;
  username: string;
}

export interface Domicilio {
  id: string;
  calle: string;
  numero: string;
  colonia: string;
  cp: string;
  ciudad: string;
  estado: string;
  pais: string;
}

export interface Verificacion {
  id: string;
  filename_foto_credencial: string;
  filename_foto_credencial_trasera: string;
  fecha_verificacion: string;
  verificado: boolean;
}

export interface DiaLibre {
  id: string;
  dia: DiaSemana;
}

export interface Contratacion {
  id: string;
  fechaInicio: string;
  fechaFin: string;
  total: number;
  cantidad: number;
  resenas: Resena[];
}

export interface Resena {
  id: string;
  calificacion: number;
  comentario: string;
}

// Interface para los datos transformados que espera el componente ServicioCompleto
export interface ServicioTransformado {
  id: string;
  name: string;
  rating: number;
  reviews: number;
  price: number;
  category: string;
  availability: string;
  avatar: string;
  description: string;
  serviceTitle: string;
  tipoPrecio: string;
  includes: string[];
  gallery: string[];
  reviewsData: ReviewTransformada[];
  proveedorInfo: ProveedorInfo;
}

export interface ReviewTransformada {
  name: string;
  date: string;
  avatar: string;
  comment: string;
  rating: number;
}

export interface ProveedorInfo {
  email: string;
  telefono: string | null;
  direccion: string | null;
  verificado: boolean;
  puntos: number;
}

// Constantes útiles
export const DIAS_SEMANA: DiaSemana[] = [
  'LUNES', 'MARTES', 'MIÉRCOLES', 'JUEVES', 'VIERNES', 'SÁBADO', 'DOMINGO'
];

export const TIPOS_SERVICIO: TipoServicio[] = ['SERVICIO', 'PRODUCTO'];