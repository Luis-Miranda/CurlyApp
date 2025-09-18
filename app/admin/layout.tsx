'use client'

import { ReactNode, useState, Fragment, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Dialog, Transition } from '@headlessui/react'
import { Menu, X, LogOut } from 'lucide-react'
import { useCurrentUserRole } from '@/lib/auth/useCurrentUserRole'
import { toast } from 'sonner'

const navItemsByRole: Record<string, { name: string; href: string }[]> = {
  admin: [
    { name: 'Dashboard', href: '/admin' },
    { name: 'Citas', href: '/admin/appointments' },
    { name: 'Clientes', href: '/admin/clients' },
    { name: 'Roles', href: '/admin/roles' },
    { name: 'Bloqueo', href: '/admin/calendar/blocked-professionals' },
    { name: 'Meses', href: '/admin/calendar/enabled-months' }
  ],
  recepcionista: [
    { name: 'Dashboard', href: '/admin' },
    { name: 'Citas', href: '/admin/appointments' },
    { name: 'Clientes', href: '/admin/clients' }
  ],
  profesional: [
    { name: 'Dashboard', href: '/admin' },
/*     { name: 'Clientes', href: '/admin/clients' } */
  ]
}

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { role, loading } = useCurrentUserRole()

  useEffect(() => {
    if (!loading && !role) {
      router.push('/')
    }
  }, [loading, role, router])

  const handleLogout = async () => {
    await fetch('/api/logout', { method: 'POST' })
    toast.success('Cerraste sesión con éxito 🌟')
    setTimeout(() => {
      window.location.href = '/login'
    }, 1000)
  }

  if (loading || !role) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-muted-foreground">Cargando acceso administrativo...</p>
      </div>
    )
  }

  const navItems = navItemsByRole[role] || []

  return (
    <div className="flex min-h-screen">
      {/* Mobile Sidebar */}
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50 md:hidden" onClose={setSidebarOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <Dialog.Panel className="fixed inset-y-0 right-0 w-64 bg-black text-white p-4 shadow-lg z-50">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold">Maravilla Admin</h2>
                <button onClick={() => setSidebarOpen(false)}>
                  <X className="text-white" />
                </button>
              </div>
              <ul className="space-y-2 mb-4">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setSidebarOpen(false)}
                      className={cn(
                        'block p-2 rounded hover:bg-white hover:text-black',
                        pathname === item.href && 'bg-white text-black font-semibold'
                      )}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-sm text-white hover:underline"
              >
                <LogOut size={16} /> Cerrar sesión
              </button>
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition.Root>

      {/* Sidebar desktop */}
      <aside className="w-64 bg-black text-white p-4 hidden md:block">
        <h2 className="text-lg font-bold mb-6">Maravilla Admin</h2>
        <ul className="space-y-2 mb-6">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  'block p-2 rounded hover:bg-white hover:text-black',
                  pathname === item.href && 'bg-white text-black font-semibold'
                )}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:underline"
        >
          <LogOut size={16} /> Cerrar sesión
        </button>
      </aside>

      {/* Content */}
      <div className="flex-1 bg-gray-50 dark:bg-background p-4">
        <div className="md:hidden mb-4 flex items-center justify-between">
          <button onClick={() => setSidebarOpen(true)}>
            <Menu className="h-6 w-6" />
          </button>
          <div className="flex items-center gap-3">
            <h2 className="font-semibold text-lg">Maravilla Admin</h2>
            <button
              onClick={handleLogout}
              className="text-sm text-muted-foreground hover:underline flex items-center gap-1"
            >
              <LogOut size={16} />
              Cerrar sesión
            </button>
          </div>
        </div>

        {children}
      </div>
    </div>
  )
}