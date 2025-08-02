# CurlyApp
# Curly Admin Pro ✨

**Fecha de actualización:** 2025-08-02

Curly Admin Pro es un sistema administrativo integral para Maravilla Curly, enfocado en agendamiento de citas, gestión de clientes, control de ventas y administración del personal.

---

## ✅ Funcionalidades actuales

### 👥 Clientes (Versión pública)
- Selección de servicio, sucursal y colaboradora.
- Validación de:
  - 4 citas por colaboradora por día.
  - Citas sin traslapes (por duración).
  - Fechas disponibles dentro de los 3 meses siguientes.
- Sistema aleatorio o manual para asignar colaboradora.
- Conexión directa a Firebase (Firestore).
- Responsive y mobile first.
- Estilo moderno con TailwindCSS + Shadcn/UI.

### 🧑‍💻 Panel Administrativo
- Ruta: `/admin`
- Sidebar con navegación:
  - Dashboard (saludo personalizado según hora).
  - Vista de citas futuras por colaboradora y fecha.
  - Calendario para bloquear días (ruta `/admin/calendar`)
- Diseño UI unificado con la versión cliente.

---

## 🔜 Próximas features

### 🔐 Autenticación
- Firebase Auth con roles: Admin, Colaboradora, Recepcionista.
- Saludo dinámico con nombre del usuario.

### 📅 Citas y colaboradores
- Dashboard individual por colaboradora.
- Filtro de citas por sucursal o colaboradora.
- Resumen visual con tarjetas dinámicas.
- Exportar citas como CSV.

### 📁 Gestión de clientes
- Ficha clínica digital.
- Firma electrónica.
- Adjuntar fotos del proceso.

### 📊 Ventas y reportes
- Registro diario, semanal, mensual y anual.
- Panel de productos y control de inventario.

---

## 🚀 Stack tecnológico

- **Framework:** Next.js 14 (App Router)
- **Lenguaje:** TypeScript
- **UI:** TailwindCSS + shadcn/ui
- **Base de datos:** Firebase Firestore
- **Autenticación (próximamente):** Firebase Auth
- **Almacenamiento:** Firebase Storage
- **Hosting (planeado):** Vercel
- **Control de versiones:** Git & GitHub

---

## 📁 Organización de carpetas

```
/app
  /booking
  /admin
    /appointments
    /calendar
  layout.tsx
  page.tsx

/lib
  utils.ts

/components
  (componentes compartidos UI)

```

---

## 🧠 Contribución y notas

Este proyecto está siendo desarrollado paso a paso por Wuicho, con enfoque en:
- Mobile First.
- UX/UI de alta calidad.
- SEO y rendimiento optimizados.
- Escalabilidad y organización de código.

