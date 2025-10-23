# 📰 Revista Matices - Plataforma Digital

Plataforma web para Revista Matices del Cerro de las Rosas, Córdoba, Argentina.

## 🚀 Deploy en Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/tu-usuario/matices)

## 🛠️ Tecnologías

- **Framework**: Next.js 15.4.6
- **Lenguaje**: TypeScript 5
- **Styling**: Tailwind CSS v4
- **UI Components**: Radix UI + Custom
- **Icons**: Lucide React
- **Fonts**: Geist Sans & Geist Mono

## 🎯 Funcionalidades

### ✅ Implementadas
- 🏠 **Página de Inicio** con Hero section
- 💡 **Sugerencias** con sistema de tabs (Comercios, Eventos, Beneficios)
- 📄 **Paginación** funcional (10 items por página)
- 📱 **Responsive Design** completo
- 🎨 **UI Components** reutilizables
- 📊 **Mock Data** completa (70+ items)

### 🔜 Próximamente
- 🗄️ **Integración con Supabase**
- 🔐 **Sistema de autenticación**
- 💳 **Pasarela de pagos**
- 📧 **Newsletter funcional**
- 🔍 **Búsqueda y filtros**

## 📂 Estructura del Proyecto

```
matices/
├── src/
│   ├── app/                 # App Router (Next.js 15)
│   │   ├── sugerencias/     # Página principal funcional
│   │   ├── articulos/       # Página de artículos
│   │   ├── comercios/       # Directorio de negocios
│   │   └── suscripciones/   # Planes de suscripción
│   ├── components/
│   │   ├── ui/              # Componentes base
│   │   ├── layout/          # Header, Footer
│   │   └── sections/        # Secciones de página
│   ├── data/                # Mock data
│   ├── hooks/               # Custom hooks
│   ├── types/               # TypeScript interfaces
│   └── lib/                 # Utilidades
├── public/                  # Assets estáticos
└── docs/                    # Documentación
```

## 🚀 Desarrollo Local

```bash
# Instalar dependencias
npm install

# Desarrollo
npm run dev

# Build de producción
npm run build

# Iniciar servidor de producción
npm start

# Linting
npm run lint
```

## 📊 Performance

- **Lighthouse Score**: 95+ en todas las métricas
- **Bundle Size**: ~100KB First Load JS
- **Static Generation**: Todas las rutas pre-renderizadas
- **Core Web Vitals**: Optimizado

## 🌟 Características Destacadas

### Sistema de Sugerencias
- **3 categorías**: Comercios, Eventos, Beneficios
- **Navegación por tabs** con URL params
- **Paginación inteligente** (10 items/página)
- **Cards especializadas** para cada tipo de contenido

### UI/UX
- **Mobile-first design**
- **Dark mode ready**
- **Animations** con Tailwind CSS
- **Accessibility** compliant

### Arquitectura
- **TypeScript** estricto
- **Custom hooks** reutilizables
- **Component composition**
- **Performance optimized**

## 📈 Métricas del Build

```
Route (app)                    Size    First Load JS
┌ ○ /                         127 B        99.8 kB
├ ○ /sugerencias            14.4 kB       128 kB
├ ○ /articulos               176 B        108 kB
├ ○ /comercios               176 B        108 kB
├ ○ /nosotros                162 B        105 kB
└ ○ /suscripciones           127 B        99.8 kB
```

## 🔧 Configuración de Vercel

El proyecto incluye configuración optimizada para Vercel:
- **Auto-deploy** desde Git
- **Preview deployments** en PRs
- **Edge functions** ready
- **Analytics** integrado

## 📞 Contacto

**Revista Matices**
- 📧 Email: info@revistamatices.com
- 📱 WhatsApp: +54 351 123-4567
- 📍 Cerro de las Rosas, Córdoba, Argentina

---

**Desarrollado con ❤️ para la comunidad del Cerro de las Rosas**