# Mucho Bueno Landing

Landing page oficial del **XIII Torneo Internacional de Marlín** en Tampico, Tamaulipas.

## 📋 Información del Evento

- **Nombre:** Tampico Mucho Bueno
- **Edición:** XIII Torneo Internacional de Marlín
- **Fechas:** 04 al 07 de junio 2026
- **Sede:** Club de Yates Tampico
- **Ubicación:** Tampico, Tamaulipas

## 🚀 Comandos

### Instalar dependencias
```bash
npm install
```

### Desarrollo
```bash
npm run dev
```
Abre http://localhost:3000

### Build para producción
```bash
npm run build
```

### Preview del build
```bash
npm run preview
```

### Lint
```bash
npm run lint
```

## 📁 Estructura del Proyecto

```
muchobueno-landing/
├── public/
│   └── logo.png              # Logo del torneo
├── mucho_bueno_landing_v_1.jsx  # Componente principal de la landing
├── main.jsx                  # Punto de entrada de React
├── index.html                # HTML base
├── index.css                 # Estilos globales (Tailwind)
├── package.json              # Dependencias y scripts
├── vite.config.js            # Configuración de Vite
├── tailwind.config.js        # Configuración de TailwindCSS
├── postcss.config.js         # Configuración de PostCSS
└── .gitignore                # Archivos ignorados por Git
```

## 🎨 Secciones de la Landing

1. **Header** - Navegación sticky con logo y links
2. **Hero** - Sección principal con información del torneo
3. **Live Preview** - Preview de la plataforma de Live Scoring
4. **About** - Información sobre el torneo
5. **Program** - Programa del evento 2026
6. **Categories** - Categorías de competencia
7. **Sponsors** - Patrocinadores por jerarquía
8. **Media** - Galería de fotos y videos
9. **Contact** - Formulario de contacto
10. **Footer** - Links y acceso administrativo

## 🛠️ Tecnologías

- **React 18** - Framework de UI
- **Vite** - Build tool y servidor de desarrollo
- **TailwindCSS** - Framework de CSS
- **PostCSS** - Procesador de CSS

## 📱 Integraciones

- **WhatsApp** - Contacto para participantes y patrocinadores
- **Instagram** - Red social oficial
- **Live Scoring** - Plataforma de resultados en vivo

## 🔧 Configuración

### Variables de entorno

No requiere variables de entorno para funcionamiento básico. Para producción:

```env
VITE_LIVE_SCORING_URL=/live
VITE_CONTACT_WHATSAPP=https://wa.me/528331234567
```

## 📝 Categorías del Torneo

1. **Marlín Azul Capturado** - Categoría principal en báscula
2. **Catch & Release** - Puntuación por especie y bono por tag
3. **Especies Varias** - Atún, Dorado y Wahoo

## 🤝 Patrocinadores

- **Principales:** BRAXEL, MAJA
- **Oficiales:** JASA Gasolineras, Beat Factory, Bustrain Global, Bahía Maja
- **Aliados:** Shimano, Club de Yates Tampico, Marina Tampico, Costa Norte

## 📄 Licencia

Proyecto privado para el comité organizador del Torneo Mucho Bueno.
