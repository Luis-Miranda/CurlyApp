# ✨ Curly Admin Pro

**Curly Admin Pro** es una plataforma interna para la gestión completa de citas, clientes, colaboradoras, ventas, reportes y control administrativo de la marca **Maravilla Curly**.  
Su enfoque es brindar una experiencia rápida, segura y organizada para el equipo de trabajo, con un panel intuitivo, responsivo y conectado en tiempo real con Firebase.

---

## 🧰 Tecnologías utilizadas

- [Next.js 14](https://nextjs.org/) (App Router)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Firebase](https://firebase.google.com/) (Auth, Firestore, Storage)
- [Shadcn/ui](https://ui.shadcn.com/)
- [React Hook Form](https://react-hook-form.com/)

---

## 🧪 Cómo correr el proyecto localmente

1. Clona el repositorio:
```bash
git clone https://github.com/TU_USUARIO/TU_REPO.git
cd TU_REPO
2. Instala dependencias
npm install
3. Configura tus variables de entorno en .env.local:
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...

4. Inicia el servidor local:
npm run dev

📁 Estructura actual
app/
├── admin/               → Panel administrativo
│   ├── appointments/    → Vista de citas por día y colaboradora
│   ├── calendar/        → Bloqueo de días no disponibles
│   └── layout.tsx       → Sidebar y navegación del admin
├── booking/             → Reservas públicas (cliente)
├── layout.tsx           → Layout base
lib/                     → Funciones utilitarias
components/              → Componentes compartidos

✅ Funcionalidades completadas

Reservas por parte del cliente (servicio, colaboradora, horario, datos personales)
Validación de límite de 4 citas por colaboradora/día
Asignación automática si no se elige colaboradora
Bloqueo de días desde panel admin (/admin/calendar)
Vista tipo panel de citas por día y colaboradora
Saludo personalizado en dashboard según hora
Sidebar administrativo responsivo
🚧 Próximas funcionalidades

Gestión de usuarios por roles (admin, recepcionista, colaboradora)
Subida de fotos al perfil del cliente (proceso)
Firma digital de políticas
Reporte de ventas (día, semana, mes, año)
CRUD de productos
Exportar información en CSV
Notificaciones por correo/WhatsApp
Protección de rutas con Auth
🧑‍💻 Desarrollado por

Luis Miranda – @bakerynomad
