export type CategoriaServicio = "regular" | "vip"

export type Service = {
  id: string
  nombre: string
  descripcion: string
  duracion: string
  precio: number
  categoria: CategoriaServicio
  calendlyUrl: string
}