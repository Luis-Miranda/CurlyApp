"use client"

import { ReactNode, useState, Fragment } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Dialog, Transition } from "@headlessui/react"
import { Menu, X } from "lucide-react"

const navItems = [
  { name: "Dashboard", href: "/admin" },
  { name: "Citas", href: "/admin/appointments" },
  { name: "Calendario", href: "/admin/calendar" },
  { name: "Clientes", href: "/admin/clients" },
]

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex min-h-screen">
      {/* Mobile Sidebar con animación slide */}
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
              <ul className="space-y-2">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setSidebarOpen(false)}
                      className={cn(
                        "block p-2 rounded hover:bg-white hover:text-black",
                        pathname === item.href && "bg-white text-black font-semibold"
                      )}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition.Root>

      {/* Sidebar desktop */}
      <aside className="w-64 bg-black text-white p-4 hidden md:block">
        <h2 className="text-lg font-bold mb-6">Maravilla Admin</h2>
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  "block p-2 rounded hover:bg-white hover:text-black",
                  pathname === item.href && "bg-white text-black font-semibold"
                )}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </aside>

      {/* Content */}
      <div className="flex-1 bg-gray-50 dark:bg-background p-4">
        {/* Mobile nav top bar */}
        <div className="md:hidden mb-4 flex items-center justify-between">
          <button onClick={() => setSidebarOpen(true)}>
            <Menu className="h-6 w-6" />
          </button>
          <h2 className="font-semibold text-lg">Maravilla Admin</h2>
        </div>

        {children}
      </div>
    </div>
  )
}
