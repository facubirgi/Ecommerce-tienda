# Contexto Completo del Proyecto Store by Pauli

> Documentación generada el 2025-12-04
> Arquitectura headless e-commerce con Medusa.js + Next.js

---

## Tabla de Contenidos

1. [Resumen Ejecutivo](#resumen-ejecutivo)
2. [Arquitectura General](#arquitectura-general)
3. [Proyecto: tienda (Backend)](#proyecto-tienda-backend)
4. [Proyecto: tienda-storefront (Frontend)](#proyecto-tienda-storefront-frontend)
5. [Comunicación entre Proyectos](#comunicación-entre-proyectos)
6. [Stack Tecnológico Completo](#stack-tecnológico-completo)
7. [Guía de Desarrollo](#guía-de-desarrollo)
8. [Variables de Entorno](#variables-de-entorno)
9. [Estructura de Datos](#estructura-de-datos)

---

## Resumen Ejecutivo

**Store by Pauli** es una plataforma de comercio electrónico completa construida con arquitectura **headless**:

- **Backend**: Medusa.js 2.12.0 (API REST + Admin Dashboard)
- **Frontend**: Next.js 15.3.1 (Storefront)
- **Base de Datos**: PostgreSQL (Neon Cloud)
- **Pagos**: Stripe
- **Región Principal**: Europa (7 países)

---

## Arquitectura General

```
┌─────────────────────────────────────────────────────────┐
│                    USUARIO FINAL                         │
└─────────────────────────────────────────────────────────┘
                            │
                            ↓
┌─────────────────────────────────────────────────────────┐
│          FRONTEND (tienda-storefront)                    │
│          Next.js 15 + React 19                           │
│          Puerto: 8000                                    │
│          - Catálogo de productos                         │
│          - Carrito de compras                            │
│          - Checkout con Stripe                           │
│          - Gestión de cuenta                             │
└─────────────────────────────────────────────────────────┘
                            │
                            ↓ (HTTP/REST API)
┌─────────────────────────────────────────────────────────┐
│          BACKEND (tienda)                                │
│          Medusa.js 2.12.0                                │
│          Puerto: 9000                                    │
│          - API REST completa                             │
│          - Admin Dashboard                               │
│          - Lógica de negocio                             │
└─────────────────────────────────────────────────────────┘
                            │
                            ↓
┌─────────────────────────────────────────────────────────┐
│          BASE DE DATOS                                   │
│          PostgreSQL (Neon)                               │
│          - Productos, pedidos, inventario                │
│          - Clientes, regiones, envíos                    │
└─────────────────────────────────────────────────────────┘

                     ┌──────┴──────┐
                     ↓             ↓
            ┌────────────┐  ┌─────────────┐
            │   STRIPE   │  │   REDIS     │
            │   Pagos    │  │   Cache     │
            └────────────┘  └─────────────┘
```

---

## Proyecto: tienda (Backend)

### Información General

- **Tipo**: Backend de E-commerce
- **Framework**: Medusa.js v2.12.0
- **Lenguaje**: TypeScript 5.6.2
- **Runtime**: Node.js >= 20
- **Package Manager**: Yarn (node-modules linker)
- **Base de Datos**: PostgreSQL (Neon)
- **Puerto**: 9000
- **Testing**: Jest 29.7.0

### Estructura de Directorios

```
tienda/
├── src/
│   ├── admin/                    # Personalizaciones del dashboard admin
│   │   ├── i18n/                # Traducciones (react-i18next)
│   │   └── widgets/             # Componentes React para la admin
│   │
│   ├── api/                     # Rutas API REST personalizadas
│   │   ├── admin/               # Rutas privadas para admin
│   │   │   └── custom/
│   │   └── store/               # Rutas públicas para la tienda
│   │       └── custom/
│   │
│   ├── modules/                 # Módulos personalizados de negocio
│   ├── jobs/                    # Trabajos programados (cron)
│   ├── subscribers/             # Escuchadores de eventos
│   ├── workflows/               # Flujos de trabajo automatizados
│   ├── scripts/                 # Scripts ejecutables (seed, setup)
│   └── links/                   # Enlaces entre modelos
│
├── integration-tests/           # Tests de integración
├── .medusa/                     # Archivos generados
│   ├── client/
│   └── types/                  # Tipos TypeScript generados
│
├── static/                      # Archivos estáticos
├── .env                         # Variables de entorno
├── .env.template                # Template de variables
├── medusa-config.ts             # Configuración principal
├── tsconfig.json                # Configuración TypeScript
├── jest.config.js               # Configuración de pruebas
├── package.json                 # Dependencias y scripts
└── instrumentation.ts           # OpenTelemetry
```

### Características Principales

#### Funcionalidades Core

1. **Gestión de Productos**
   - Catálogo completo con categorías
   - Variantes (talla, color)
   - Precios por moneda (EUR, USD)
   - Imágenes y descripciones

2. **Sistema de Pedidos**
   - Carrito de compras
   - Proceso de checkout
   - Procesamiento de órdenes
   - Historial de compras

3. **Gestión de Inventario**
   - Niveles de stock en tiempo real
   - Ubicaciones de almacén múltiples
   - Reservas de inventario

4. **Regiones y Envíos**
   - Soporte multi-región (Europa)
   - 7 países: GB, DE, DK, SE, FR, ES, IT
   - Múltiples opciones de envío
   - Cálculo de costos por región

5. **Canales de Venta**
   - Sales channels múltiples
   - Punto de venta
   - Tienda web
   - Otros canales personalizables

6. **Sistema de Pagos**
   - Integración con Stripe
   - Proveedores de pago por defecto
   - Soporte multi-moneda

7. **Impuestos**
   - Configuración por región
   - Tasas impositivas por país

8. **APIs REST**
   - Endpoints públicos (store)
   - Endpoints privados (admin)
   - Autenticación JWT

9. **Dashboard Admin**
   - Interfaz web de gestión
   - Extensible con widgets personalizados
   - Multiidioma

### Dependencias Principales

```json
{
  "dependencies": {
    "@medusajs/admin-sdk": "2.12.0",
    "@medusajs/cli": "2.12.0",
    "@medusajs/framework": "2.12.0",
    "@medusajs/medusa": "2.12.0"
  },
  "devDependencies": {
    "@medusajs/test-utils": "2.12.0",
    "@swc/core": "^1.7.28",
    "@swc/jest": "^0.2.36",
    "jest": "^29.7.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "typescript": "^5.6.2",
    "vite": "^5.4.14"
  }
}
```

### Scripts Disponibles

```bash
# Compilación y ejecución
npm run build              # Construir proyecto
npm run start              # Iniciar servidor producción
npm run dev                # Iniciar en modo desarrollo (hot reload)

# Datos
npm run seed               # Ejecutar script de seed (datos de prueba)

# Testing
npm run test:integration:http     # Tests de integración HTTP
npm run test:integration:modules  # Tests de integración de módulos
npm run test:unit                 # Tests unitarios
```

### Configuración (medusa-config.ts)

```typescript
{
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL,
    http: {
      storeCors: "http://localhost:8000,https://docs.medusajs.com",
      adminCors: "http://localhost:5173,http://localhost:9000",
      authCors: "http://localhost:5173,http://localhost:9000",
      jwtSecret: "supersecret",
      cookieSecret: "supersecret"
    }
  },
  modules: [
    // Product, Order, Cart, Fulfillment, Tax, Stock Location,
    // Sales Channel, Store, API Key, y más...
  ]
}
```

### Datos de Prueba (Seed)

El script `seed.ts` genera automáticamente:

**Configuración Base:**
- 1 Store (tienda)
- 1 Sales Channel
- Monedas: EUR (predeterminada), USD

**Regiones:**
- Europa (EUR)
- 7 países: GB, DE, DK, SE, FR, ES, IT

**Impuestos:**
- Configurados para los 7 países

**Almacenes:**
- European Warehouse (Copenhague, Dinamarca)

**Opciones de Envío:**
- Standard Shipping (2-3 días, €10/USD10)
- Express Shipping (24 horas, €10/USD10)

**Productos (4 categorías):**
1. **Camisetas** - 8 variantes (S-XL, Negro/Blanco)
2. **Sudaderas** - 4 variantes (S-XL)
3. **Pantalones** - 4 variantes (S-XL)
4. **Shorts** - 4 variantes (S-XL)

**Inventario:**
- 1,000,000 unidades por SKU

---

## Proyecto: tienda-storefront (Frontend)

### Información General

- **Tipo**: E-commerce Storefront
- **Framework**: Next.js 15.3.1
- **Lenguaje**: TypeScript 5.3.2
- **UI Library**: React 19.0.0-rc
- **Estilos**: Tailwind CSS 3.0.23
- **Componentes**: Radix UI + Medusa UI
- **Package Manager**: Yarn 4.6.0
- **Puerto**: 8000

### Estructura de Directorios

```
tienda-storefront/
├── src/
│   ├── app/                              # App Router de Next.js 15
│   │   └── [countryCode]/               # Rutas dinámicas por país
│   │       ├── (checkout)/              # Grupo de rutas checkout
│   │       │   └── checkout/            # Página de pago
│   │       └── (main)/                  # Grupo de rutas principales
│   │           ├── account/             # Gestión de cuenta
│   │           │   ├── addresses/       # Direcciones
│   │           │   ├── orders/          # Historial de pedidos
│   │           │   └── profile/         # Perfil de usuario
│   │           ├── cart/                # Carrito de compras
│   │           ├── categories/          # Navegación por categorías
│   │           │   └── [category]/      # Categoría específica
│   │           ├── collections/         # Colecciones de productos
│   │           │   └── [handle]/        # Colección específica
│   │           ├── order/               # Detalles de órdenes
│   │           │   ├── confirmed/       # Confirmación
│   │           │   └── details/         # Detalles
│   │           ├── products/            # Páginas de productos
│   │           │   └── [handle]/        # Producto específico
│   │           ├── results/             # Resultados de búsqueda
│   │           ├── search/              # Búsqueda
│   │           └── store/               # Tienda general
│   │
│   ├── lib/                             # Lógica reutilizable
│   │   ├── config.ts                   # Configuración SDK Medusa
│   │   ├── constants.tsx               # Constantes (pagos, divisas)
│   │   ├── context/                    # React Context providers
│   │   │   ├── cart-context.tsx
│   │   │   └── region-context.tsx
│   │   ├── data/                       # Funciones de fetch de datos
│   │   │   ├── cart.ts                # Operaciones del carrito
│   │   │   ├── categories.ts          # Fetch de categorías
│   │   │   ├── collections.ts         # Fetch de colecciones
│   │   │   ├── cookies.ts             # Gestión de cookies
│   │   │   ├── customer.ts            # Operaciones del cliente
│   │   │   ├── fulfillment.ts         # Gestión de entregas
│   │   │   ├── orders.ts              # Operaciones de órdenes
│   │   │   ├── products.ts            # Fetch de productos
│   │   │   ├── regions.ts             # Datos de regiones
│   │   │   └── variants.ts            # Variantes de productos
│   │   ├── hooks/                     # React Hooks personalizados
│   │   │   ├── use-countdown.tsx
│   │   │   ├── use-preview-price.tsx
│   │   │   └── use-toggle-state.tsx
│   │   └── util/                      # Funciones auxiliares
│   │       ├── format.ts              # Formateo de datos
│   │       ├── get-checkout-step.ts
│   │       ├── money.ts               # Conversiones monetarias
│   │       └── prices.ts              # Cálculos de precios
│   │
│   ├── modules/                        # Componentes por feature
│   │   ├── account/                   # Módulo de cuenta
│   │   │   ├── components/
│   │   │   └── templates/
│   │   ├── cart/                      # Módulo de carrito
│   │   │   ├── components/
│   │   │   └── templates/
│   │   ├── categories/                # Módulo de categorías
│   │   ├── checkout/                  # Módulo de checkout
│   │   │   ├── components/
│   │   │   ├── templates/
│   │   │   └── payment/              # Proveedores de pago
│   │   ├── collections/               # Módulo de colecciones
│   │   ├── common/                    # Componentes comunes
│   │   │   ├── components/
│   │   │   └── icons/
│   │   ├── home/                      # Módulo de inicio
│   │   │   └── components/
│   │   │       ├── brand-logos/      # Logos de marcas
│   │   │       ├── featured-products/
│   │   │       └── hero/             # Hero section
│   │   ├── layout/                    # Componentes de layout
│   │   │   ├── components/
│   │   │   └── templates/
│   │   ├── order/                     # Módulo de órdenes
│   │   ├── products/                  # Módulo de productos
│   │   │   ├── components/
│   │   │   └── templates/
│   │   ├── shipping/                  # Módulo de envío
│   │   ├── skeletons/                 # Componentes de carga
│   │   └── store/                     # Módulo de tienda
│   │
│   ├── styles/                         # Estilos CSS globales
│   │   └── globals.css
│   ├── types/                          # Tipos TypeScript
│   │   └── global.ts
│   └── middleware.ts                  # Middleware Next.js (regiones)
│
├── public/                             # Archivos estáticos
│   ├── banner.png
│   ├── favicon.ico
│   └── brand-logos/                   # Logos (Zara, Coach, etc.)
│
├── next.config.js                     # Configuración Next.js
├── tsconfig.json                      # Configuración TypeScript
├── tailwind.config.js                 # Temas y personalización
├── postcss.config.js                  # Procesamiento CSS
├── .eslintrc.js                       # Reglas de linting
├── .prettierrc                        # Configuración de formato
├── check-env-variables.js             # Validación de variables
├── next-sitemap.js                    # Generación de sitemap
├── package.json                       # Dependencias
└── README.md                          # Documentación
```

### Características Principales

1. **Gestión de Productos**
   - Catálogo dinámico
   - Páginas de producto detalladas
   - Navegación por categorías
   - Colecciones temáticas
   - Búsqueda de productos

2. **Carrito de Compras**
   - Añadir/eliminar productos
   - Actualizar cantidades
   - Cálculo de totales en tiempo real
   - Sincronización con backend
   - Persistencia con cookies

3. **Checkout**
   - Flujo de pago paso a paso
   - Información de envío
   - Métodos de pago (Stripe)
   - Resumen de orden
   - Confirmación de compra

4. **Autenticación de Usuarios**
   - Registro de usuarios
   - Login/Logout
   - Recuperación de contraseña
   - Gestión de perfil

5. **Gestión de Cuenta**
   - Perfil de usuario
   - Direcciones guardadas
   - Historial de pedidos
   - Detalles de órdenes

6. **Multi-región**
   - Soporte para múltiples países
   - Precios por moneda
   - Opciones de envío por región
   - Impuestos localizados

7. **Responsive Design**
   - Mobile-first
   - Tablet optimizado
   - Desktop completo

### Dependencias Principales

```json
{
  "dependencies": {
    "@headlessui/react": "^2.2.0",
    "@medusajs/js-sdk": "latest",
    "@medusajs/types": "latest",
    "@medusajs/ui": "latest",
    "@medusajs/ui-preset": "latest",
    "@radix-ui/react-accordion": "^1.2.1",
    "@radix-ui/react-dialog": "^1.1.2",
    "@radix-ui/react-popover": "^1.1.2",
    "@radix-ui/react-select": "^2.1.2",
    "@stripe/react-stripe-js": "^5.3.0",
    "@stripe/stripe-js": "^5.6.0",
    "lodash": "^4.17.21",
    "next": "^15.3.1",
    "pg": "^8.11.3",
    "qs": "^6.12.1",
    "react": "19.0.0-rc",
    "react-country-flag": "^3.1.0",
    "react-dom": "19.0.0-rc",
    "tailwindcss": "^3.0.23",
    "tailwindcss-radix": "^2.8.0"
  },
  "devDependencies": {
    "@types/node": "^20.10.6",
    "@types/react": "^18.2.46",
    "@types/react-dom": "^18.2.18",
    "autoprefixer": "^10.4.2",
    "eslint": "8.10.0",
    "eslint-config-next": "15.3.1",
    "postcss": "^8.4.8",
    "prettier": "^2.8.8",
    "typescript": "^5.3.2"
  }
}
```

### Scripts Disponibles

```bash
# Desarrollo
yarn dev                # Inicia servidor en puerto 8000 con Turbopack

# Producción
yarn build              # Compila el proyecto
yarn start              # Inicia servidor de producción (puerto 8000)

# Utilidades
yarn lint               # Ejecuta ESLint
yarn analyze            # Analiza el bundle
```

### Configuración de Tailwind

```javascript
// tailwind.config.js
module.exports = {
  presets: [require("@medusajs/ui-preset")],
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/modules/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@medusajs/ui/dist/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        grey: {...},
        cream: {...}
      },
      borderRadius: {...},
      screens: {
        xs: "320px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px"
      }
    }
  },
  plugins: [require("tailwindcss-radix")()]
}
```

### Configuración de Next.js

```javascript
// next.config.js
module.exports = {
  reactStrictMode: true,
  logging: {
    fetches: {
      fullUrl: true
    }
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost"
      },
      {
        protocol: "https",
        hostname: "medusa-public-images.s3.eu-west-1.amazonaws.com"
      },
      // ... otros dominios
    ]
  },
  eslint: {
    ignoreDuringBuilds: true
  }
}
```

### Middleware

```typescript
// src/middleware.ts
// Gestiona regiones y países dinámicamente
// Cachea el mapa de regiones por 1 hora
// Sincroniza desde el backend Medusa en cada request
```

---

## Comunicación entre Proyectos

### Flujo de Datos

```
Usuario → Frontend (Next.js) → Backend (Medusa) → PostgreSQL
                    ↓
                  Stripe
```

### Endpoints Principales

**Backend API (Puerto 9000):**
- `GET /store/products` - Lista de productos
- `GET /store/products/:id` - Detalle de producto
- `POST /store/cart` - Crear carrito
- `POST /store/cart/:id/line-items` - Añadir al carrito
- `POST /store/customers` - Registro de cliente
- `POST /store/auth` - Login
- `POST /store/carts/:id/payment-sessions` - Iniciar pago
- `POST /store/carts/:id/complete` - Completar pedido

**Admin API (Puerto 9000):**
- `GET /admin/products` - Gestión de productos
- `GET /admin/orders` - Gestión de pedidos
- `GET /admin/customers` - Gestión de clientes
- `POST /admin/uploads` - Subir imágenes

### Autenticación

**JWT Tokens:**
- Backend genera tokens JWT
- Frontend los almacena en cookies
- Se envían en cada request al backend
- Expiración configurable

**Cookies:**
- `_medusa_jwt` - Token de autenticación
- `_medusa_cart_id` - ID del carrito

### CORS

**Backend permite:**
- Frontend: `http://localhost:8000`
- Admin: `http://localhost:5173`, `http://localhost:9000`
- Documentación: `https://docs.medusajs.com`

---

## Stack Tecnológico Completo

### Frontend

| Tecnología | Versión | Propósito |
|-----------|---------|-----------|
| **Next.js** | 15.3.1 | Framework React SSR |
| **React** | 19.0.0-rc | UI Library |
| **TypeScript** | 5.3.2 | Tipado estático |
| **Tailwind CSS** | 3.0.23 | Estilos utility-first |
| **Radix UI** | Latest | Componentes accesibles |
| **Medusa UI** | Latest | Componentes Medusa |
| **Stripe Elements** | 5.3.0 | Integración de pagos |
| **React Hook Form** | - | Gestión de formularios |
| **Lodash** | 4.17.21 | Utilidades JavaScript |

### Backend

| Tecnología | Versión | Propósito |
|-----------|---------|-----------|
| **Medusa.js** | 2.12.0 | Framework de e-commerce |
| **Node.js** | >= 20 | Runtime JavaScript |
| **TypeScript** | 5.6.2 | Tipado estático |
| **Jest** | 29.7.0 | Testing framework |
| **SWC** | 1.7.28 | Compilador rápido |
| **Vite** | 5.4.14 | Build tool para admin |
| **React** | 18.3.1 | UI del admin |

### Base de Datos y Cache

| Tecnología | Propósito |
|-----------|-----------|
| **PostgreSQL** | Base de datos principal (Neon) |
| **Redis** | Cache y colas (opcional) |

### Pagos y Servicios

| Servicio | Propósito |
|---------|-----------|
| **Stripe** | Procesamiento de pagos |
| **Neon** | PostgreSQL cloud hosting |

### Herramientas de Desarrollo

| Herramienta | Propósito |
|------------|-----------|
| **Yarn** | Package manager |
| **ESLint** | Linting de código |
| **Prettier** | Formateo de código |
| **Turbopack** | Bundler rápido (dev) |

---

## Guía de Desarrollo

### Configuración Inicial

#### 1. Clonar Repositorio

```bash
cd c:\Users\lenovo\Desktop\storebypauli
```

#### 2. Instalar Dependencias Backend

```bash
cd tienda
yarn install
# o
npm install
```

#### 3. Instalar Dependencias Frontend

```bash
cd ../tienda-storefront
yarn install
```

#### 4. Configurar Variables de Entorno

Ver sección [Variables de Entorno](#variables-de-entorno)

#### 5. Inicializar Base de Datos

```bash
cd ../tienda
npm run seed
```

### Desarrollo Diario

#### Iniciar Ambos Proyectos

**Terminal 1 - Backend:**
```bash
cd tienda
npm run dev
# Servidor en http://localhost:9000
# Admin en http://localhost:9000/app
```

**Terminal 2 - Frontend:**
```bash
cd tienda-storefront
yarn dev
# Servidor en http://localhost:8000
```

### Comandos Útiles

#### Backend

```bash
# Desarrollo
npm run dev                              # Modo desarrollo

# Base de datos
npm run seed                             # Insertar datos de prueba

# Testing
npm run test:unit                        # Tests unitarios
npm run test:integration:http            # Tests HTTP
npm run test:integration:modules         # Tests de módulos

# Producción
npm run build                            # Compilar
npm run start                            # Iniciar producción
```

#### Frontend

```bash
# Desarrollo
yarn dev                                 # Modo desarrollo con Turbopack

# Producción
yarn build                               # Compilar
yarn start                               # Iniciar producción

# Calidad de código
yarn lint                                # Verificar código
yarn analyze                             # Analizar bundle
```

### Estructura de URLs

| Servicio | URL | Descripción |
|---------|-----|-------------|
| **Frontend** | http://localhost:8000 | Storefront público |
| **Backend API** | http://localhost:9000 | API REST |
| **Admin Dashboard** | http://localhost:9000/app | Panel de administración |
| **Docs Medusa** | https://docs.medusajs.com | Documentación oficial |

### Flujo de Trabajo Típico

#### 1. Añadir un Nuevo Producto (Backend)

```typescript
// Opción A: Usar Admin Dashboard
// 1. Ir a http://localhost:9000/app
// 2. Login con credenciales admin
// 3. Productos > Crear Producto

// Opción B: Usar API directamente
POST /admin/products
{
  "title": "Nueva Camiseta",
  "handle": "nueva-camiseta",
  "description": "Descripción del producto",
  "variants": [
    {
      "title": "S",
      "prices": [
        { "amount": 2000, "currency_code": "eur" }
      ]
    }
  ]
}
```

#### 2. Mostrar Productos en Frontend

```typescript
// Frontend automáticamente sincroniza con backend
// src/lib/data/products.ts contiene las funciones de fetch
import { listProducts } from "@lib/data/products"

const products = await listProducts({
  limit: 12,
  region_id: "reg_01..."
})
```

#### 3. Procesar un Pedido

```typescript
// 1. Usuario añade productos al carrito (Frontend)
// 2. Usuario completa checkout (Frontend)
// 3. Stripe procesa el pago
// 4. Backend crea la orden
// 5. Frontend muestra confirmación
```

---

## Variables de Entorno

### Backend (tienda/.env)

```env
# Base de Datos
DATABASE_URL=postgresql://usuario:tu_password@tu-host.neon.tech/tu_database?sslmode=require

# Redis (Opcional)
REDIS_URL=redis://localhost:6379

# CORS
STORE_CORS=http://localhost:8000,https://docs.medusajs.com
ADMIN_CORS=http://localhost:5173,http://localhost:9000
AUTH_CORS=http://localhost:5173,http://localhost:9000

# Seguridad (CAMBIAR EN PRODUCCIÓN)
JWT_SECRET=tu_jwt_secret_aqui
COOKIE_SECRET=tu_cookie_secret_aqui

# Configuración Admin
MEDUSA_ADMIN_ONBOARDING_TYPE=nextjs
MEDUSA_ADMIN_ONBOARDING_NEXTJS_DIRECTORY=tienda-storefront

# Opcional: S3 para imágenes
# S3_URL=...
# S3_BUCKET=...
# S3_REGION=...
# S3_ACCESS_KEY_ID=...
# S3_SECRET_ACCESS_KEY=...
```

### Frontend (tienda-storefront/.env.local)

```env
# Backend Medusa
MEDUSA_BACKEND_URL=http://localhost:9000
NEXT_PUBLIC_MEDUSA_BACKEND_URL=http://127.0.0.1:9000

# Medusa API
NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=pk_tu_publishable_key_aqui

# URL Base de la Tienda
NEXT_PUBLIC_BASE_URL=http://localhost:8000

# Región por Defecto
NEXT_PUBLIC_DEFAULT_REGION=us

# Stripe
NEXT_PUBLIC_STRIPE_KEY=pk_test_XXX...

# Revalidación
REVALIDATE_SECRET=tu_revalidate_secret_aqui

# Opcional: CDN S3
# MEDUSA_CLOUD_S3_HOSTNAME=...
# MEDUSA_CLOUD_S3_PATHNAME=...
```

### Notas de Seguridad

- **NUNCA** commitear archivos `.env` al repositorio
- Usar `.env.template` como referencia
- Rotar secrets en producción
- Usar variables de entorno del sistema en producción

---

## Estructura de Datos

### Modelo de Productos

```typescript
interface Product {
  id: string
  title: string
  handle: string
  description: string | null
  thumbnail: string | null
  collection_id: string | null
  type_id: string | null
  weight: number | null
  length: number | null
  height: number | null
  width: number | null
  origin_country: string | null
  hs_code: string | null
  mid_code: string | null
  material: string | null

  // Relaciones
  variants: ProductVariant[]
  options: ProductOption[]
  images: Image[]
  tags: Tag[]
  categories: ProductCategory[]

  // Timestamps
  created_at: Date
  updated_at: Date
}

interface ProductVariant {
  id: string
  title: string
  product_id: string
  sku: string | null
  barcode: string | null
  ean: string | null
  upc: string | null
  inventory_quantity: number
  allow_backorder: boolean
  manage_inventory: boolean

  // Relaciones
  prices: MoneyAmount[]
  options: ProductOptionValue[]

  // Timestamps
  created_at: Date
  updated_at: Date
}
```

### Modelo de Carrito

```typescript
interface Cart {
  id: string
  email: string | null
  billing_address_id: string | null
  shipping_address_id: string | null
  region_id: string
  customer_id: string | null
  payment_id: string | null
  type: CartType
  completed_at: Date | null
  payment_authorized_at: Date | null

  // Relaciones
  items: LineItem[]
  region: Region
  discounts: Discount[]
  gift_cards: GiftCard[]
  shipping_methods: ShippingMethod[]
  payment_sessions: PaymentSession[]

  // Cálculos
  subtotal: number
  discount_total: number
  shipping_total: number
  tax_total: number
  total: number

  // Timestamps
  created_at: Date
  updated_at: Date
}

interface LineItem {
  id: string
  cart_id: string
  order_id: string | null
  variant_id: string
  title: string
  description: string | null
  thumbnail: string | null
  quantity: number
  unit_price: number

  // Relaciones
  variant: ProductVariant
  adjustments: LineItemAdjustment[]

  // Cálculos
  subtotal: number
  total: number
  discount_total: number
  tax_total: number

  // Timestamps
  created_at: Date
  updated_at: Date
}
```

### Modelo de Pedidos

```typescript
interface Order {
  id: string
  status: OrderStatus
  fulfillment_status: FulfillmentStatus
  payment_status: PaymentStatus
  display_id: number
  cart_id: string
  customer_id: string
  email: string
  billing_address_id: string
  shipping_address_id: string
  region_id: string
  currency_code: string
  tax_rate: number | null

  // Relaciones
  items: LineItem[]
  customer: Customer
  region: Region
  discounts: Discount[]
  gift_cards: GiftCard[]
  shipping_methods: ShippingMethod[]
  payments: Payment[]
  fulfillments: Fulfillment[]

  // Cálculos
  subtotal: number
  discount_total: number
  shipping_total: number
  tax_total: number
  total: number
  paid_total: number
  refunded_total: number

  // Timestamps
  created_at: Date
  updated_at: Date
  canceled_at: Date | null
}
```

### Modelo de Clientes

```typescript
interface Customer {
  id: string
  email: string
  first_name: string
  last_name: string
  billing_address_id: string | null
  phone: string | null
  has_account: boolean

  // Relaciones
  orders: Order[]
  shipping_addresses: Address[]
  billing_address: Address | null
  groups: CustomerGroup[]

  // Timestamps
  created_at: Date
  updated_at: Date
}

interface Address {
  id: string
  customer_id: string | null
  company: string | null
  first_name: string | null
  last_name: string | null
  address_1: string | null
  address_2: string | null
  city: string | null
  country_code: string | null
  province: string | null
  postal_code: string | null
  phone: string | null

  // Relaciones
  country: Country

  // Timestamps
  created_at: Date
  updated_at: Date
}
```

### Modelo de Regiones

```typescript
interface Region {
  id: string
  name: string
  currency_code: string
  tax_rate: number
  tax_code: string | null
  gift_cards_taxable: boolean
  automatic_taxes: boolean

  // Relaciones
  countries: Country[]
  payment_providers: PaymentProvider[]
  fulfillment_providers: FulfillmentProvider[]
  tax_rates: TaxRate[]

  // Timestamps
  created_at: Date
  updated_at: Date
}

interface Country {
  id: number
  iso_2: string
  iso_3: string
  num_code: number
  name: string
  display_name: string
  region_id: string

  // Relaciones
  region: Region
}
```

### Enums Importantes

```typescript
enum OrderStatus {
  PENDING = "pending",
  COMPLETED = "completed",
  ARCHIVED = "archived",
  CANCELED = "canceled",
  REQUIRES_ACTION = "requires_action"
}

enum FulfillmentStatus {
  NOT_FULFILLED = "not_fulfilled",
  PARTIALLY_FULFILLED = "partially_fulfilled",
  FULFILLED = "fulfilled",
  PARTIALLY_SHIPPED = "partially_shipped",
  SHIPPED = "shipped",
  PARTIALLY_RETURNED = "partially_returned",
  RETURNED = "returned",
  CANCELED = "canceled",
  REQUIRES_ACTION = "requires_action"
}

enum PaymentStatus {
  NOT_PAID = "not_paid",
  AWAITING = "awaiting",
  CAPTURED = "captured",
  PARTIALLY_REFUNDED = "partially_refunded",
  REFUNDED = "refunded",
  CANCELED = "canceled",
  REQUIRES_ACTION = "requires_action"
}

enum CartType {
  DEFAULT = "default",
  SWAP = "swap",
  DRAFT_ORDER = "draft_order",
  PAYMENT_LINK = "payment_link",
  CLAIM = "claim"
}
```

---

## Datos de Seed Actuales

### Productos Disponibles

#### 1. Camisetas (T-shirts)
- **Variantes**: 8
  - Tallas: S, M, L, XL
  - Colores: Negro, Blanco
- **Precio**: €19.50 / $22
- **Stock**: 1,000,000 unidades por variante

#### 2. Sudaderas (Sweatshirts)
- **Variantes**: 4
  - Tallas: S, M, L, XL
- **Precio**: €29.99 / $33.99
- **Stock**: 1,000,000 unidades por variante

#### 3. Pantalones (Pants)
- **Variantes**: 4
  - Tallas: S, M, L, XL
- **Precio**: €35.00 / $40
- **Stock**: 1,000,000 unidades por variante

#### 4. Shorts
- **Variantes**: 4
  - Tallas: S, M, L, XL
- **Precio**: €20.00 / $25
- **Stock**: 1,000,000 unidades por variante

### Regiones Configuradas

- **Europa (EUR)**
  - Reino Unido (GB)
  - Alemania (DE)
  - Dinamarca (DK)
  - Suecia (SE)
  - Francia (FR)
  - España (ES)
  - Italia (IT)

### Opciones de Envío

1. **Standard Shipping**
   - Tiempo: 2-3 días
   - Precio: €10 / $10

2. **Express Shipping**
   - Tiempo: 24 horas
   - Precio: €10 / $10

---

## Troubleshooting

### Problemas Comunes

#### 1. Error de Conexión a Base de Datos

```
Error: Connection refused to PostgreSQL
```

**Solución:**
- Verificar que la URL de base de datos en `.env` sea correcta
- Comprobar conectividad a Neon
- Verificar que el firewall permita conexiones

#### 2. Frontend no se Conecta al Backend

```
Error: Failed to fetch from http://localhost:9000
```

**Solución:**
- Verificar que el backend esté corriendo en puerto 9000
- Comprobar configuración CORS en `medusa-config.ts`
- Verificar variables de entorno en `.env.local`

#### 3. Stripe no Funciona

```
Error: Invalid Stripe key
```

**Solución:**
- Verificar `NEXT_PUBLIC_STRIPE_KEY` en `.env.local`
- Asegurarse de usar test keys en desarrollo
- Verificar que Stripe esté configurado en backend

#### 4. Productos no Aparecen en Frontend

**Solución:**
- Ejecutar `npm run seed` en el backend
- Verificar que los productos tengan precios para la región
- Comprobar que los productos estén publicados

#### 5. Error de Compilación TypeScript

```
Error: Type 'X' is not assignable to type 'Y'
```

**Solución:**
- Verificar que las versiones de `@medusajs/types` coincidan
- Limpiar cache: `rm -rf .next node_modules && yarn install`
- Actualizar tipos: `yarn add -D @medusajs/types@latest`

---

## Recursos y Documentación

### Oficial

- **Medusa Docs**: https://docs.medusajs.com
- **Medusa GitHub**: https://github.com/medusajs/medusa
- **Next.js Docs**: https://nextjs.org/docs
- **Stripe Docs**: https://stripe.com/docs

### Guías Útiles

- [Crear Módulos Personalizados](https://docs.medusajs.com/development/modules)
- [Añadir Workflows](https://docs.medusajs.com/development/workflows)
- [Extender Admin](https://docs.medusajs.com/admin/customize)
- [API Reference](https://docs.medusajs.com/api)

### Comunidad

- **Discord**: https://discord.gg/medusajs
- **GitHub Discussions**: https://github.com/medusajs/medusa/discussions
- **Twitter**: @medusajs

---

## Notas Finales

### Estado Actual del Proyecto

- ✅ Backend configurado y funcionando
- ✅ Frontend configurado y funcionando
- ✅ Base de datos PostgreSQL conectada
- ✅ Datos de prueba insertados
- ✅ Integración Stripe configurada
- ✅ Regiones europeas configuradas
- ⚠️ Redis opcional (no configurado)
- ⚠️ S3 para imágenes (no configurado)

### Próximos Pasos Recomendados

1. **Personalización de Productos**
   - Añadir productos reales
   - Subir imágenes propias
   - Configurar categorías personalizadas

2. **Configuración de Pagos**
   - Activar cuenta Stripe de producción
   - Configurar webhooks de Stripe
   - Añadir otros métodos de pago

3. **Optimización**
   - Configurar Redis para cache
   - Configurar S3 para almacenamiento de imágenes
   - Optimizar performance del frontend

4. **SEO y Marketing**
   - Configurar sitemap
   - Añadir meta tags
   - Implementar analytics

5. **Despliegue**
   - Configurar CI/CD
   - Desplegar backend (Railway, Heroku, AWS)
   - Desplegar frontend (Vercel, Netlify)

### Mantenimiento

- Actualizar dependencias regularmente
- Hacer backups de la base de datos
- Monitorear logs de errores
- Revisar métricas de performance
- Actualizar documentación

---

**Última actualización**: 2025-12-04
**Versión del documento**: 1.0.0
**Autor**: Claude Code AI Assistant
