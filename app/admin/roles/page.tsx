'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { db } from '@/lib/firebase'
import {
  collection,
  getDocs,
  updateDoc,
  doc,
  DocumentData
} from 'firebase/firestore'
import { toast } from 'sonner'

import { useCurrentUserRole } from '@/lib/auth/useCurrentUserRole'

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from '@/components/ui/select'
import { Card, CardContent } from '@/components/ui/card'
import {
  Table,
  TableHeader,
  TableHead,
  TableRow,
  TableBody,
  TableCell
} from '@/components/ui/table'

const rolesDisponibles = ['admin', 'recepcionista', 'profesional', 'caja']

export default function AdminRolesPage() {
  const [usuarios, setUsuarios] = useState<DocumentData[]>([])
  const [loading, setLoading] = useState(true)
  const { role, loading: loadingRole } = useCurrentUserRole()
  const router = useRouter()

  // Bloqueo si no es admin
  useEffect(() => {
    if (!loadingRole && role !== 'admin') {
      toast.error('Acceso denegado')
      router.push('/admin')
    }
  }, [role, loadingRole, router])

  // Obtener todos los usuarios
  useEffect(() => {
    if (role !== 'admin') return

    const fetchUsuarios = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'users'))
        const usersData = querySnapshot.docs.map((doc) => ({
          uid: doc.id,
          ...doc.data()
        }))
        setUsuarios(usersData)
      } catch (error) {
        console.error('Error al obtener usuarios:', error)
        toast.error('Error al cargar usuarios')
      } finally {
        setLoading(false)
      }
    }

    fetchUsuarios()
  }, [role])

  const cambiarRol = async (uid: string, nuevoRol: string) => {
    try {
      await updateDoc(doc(db, 'users', uid), { role: nuevoRol })
      setUsuarios((prev) =>
        prev.map((u) =>
          u.uid === uid ? { ...u, role: nuevoRol } : u
        )
      )
      toast.success('Rol actualizado correctamente')
    } catch (error) {
      console.error('Error al actualizar rol:', error)
      toast.error('Error al guardar el nuevo rol')
    }
  }

  if (loading || loadingRole) return <p className="p-4">Cargando...</p>

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Gestión de Roles de Usuario</h1>

      <Card>
        <CardContent className="p-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Rol</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {usuarios.map((usuario) => (
                <TableRow key={usuario.uid}>
                  <TableCell>{usuario.displayName || 'Sin nombre'}</TableCell>
                  <TableCell>{usuario.email}</TableCell>
                  <TableCell>
                    <Select
                      value={usuario.role || ''}
                      onValueChange={(value) =>
                        cambiarRol(usuario.uid, value)
                      }
                    >
                      <SelectTrigger className="w-[160px]">
                        <SelectValue placeholder="Seleccionar rol" />
                      </SelectTrigger>
                      <SelectContent>
                        {rolesDisponibles.map((rol) => (
                          <SelectItem key={rol} value={rol}>
                            {rol}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}