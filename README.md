# IdeasParaApp ✨

Una aplicación web moderna para explorar y organizar ideas creativas, desarrollada con React, TypeScript y Tailwind CSS.

## 🚀 Características

- **Explorar Ideas**: Navega por categorías y encuentra inspiración
- **Diario Personal**: Registra tus pensamientos y emociones
- **ConciencIA**: Asistente de IA powered by OpenAI para análisis y orientación
- **Modo Liberación**: Espacio para expresión libre y catártica
- **Comunidad**: Comparte y descubre contenido de otros usuarios
- **Fanzine**: Colección curada de contenido inspiracional
- **Diseño Responsive**: Optimizado para móvil y escritorio

## 🛠️ Tecnologías

- **Frontend**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS 4.x
- **Animaciones**: Framer Motion
- **Estado**: Zustand
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **AI**: OpenAI API Integration

## 🚀 Instalación y Desarrollo

### Prerrequisitos
- Node.js 18+
- npm o yarn

### Instalación
```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/ideasparaapp.git
cd ideasparaapp

# Instalar dependencias
npm install

# Instalar dependencias del servidor (opcional)
npm run server:install
```

### Desarrollo
```bash
# Iniciar modo desarrollo (solo frontend)
npm run dev

# Iniciar frontend y backend simultáneamente
npm run dev:full
```

La app estará disponible en `http://localhost:5173`

## 🔧 Configuración

### Variables de Entorno
Crea un archivo `.env.local` con:

```env
# OpenAI API Key (opcional - solo para ConciencIA)
VITE_OPENAI_API_KEY=tu_api_key_aqui
```

### Configuración de ConciencIA
1. Ve a Ajustes en la aplicación
2. Ingresa tu OpenAI API Key
3. Personaliza la personalidad y estilo de respuesta

## 📱 Uso

### Navegación Principal
- **Inicio**: Dashboard con acceso rápido a todas las funciones
- **Explorar**: Categorías de prompts e inspiración
- **Inspiración**: Citas y contenido motivacional
- **Mis Ideas**: Diario personal con filtros y búsqueda
- **Fanzine**: Contenido curado y destacado
- **Comunidad**: Espacio social para compartir
- **Liberación**: Escritura libre y expresión
- **ConciencIA**: Chat con IA para análisis y orientación
- **Ajustes**: Configuración y personalización

### Funciones Clave
- **Búsqueda inteligente** en todas las secciones
- **Filtros por categoría** y emoción
- **Modo oscuro/claro** automático
- **Sincronización local** con localStorage
- **Exportación** de contenido (próximamente)

## 🌐 Deployment

### Vercel (Recomendado)
1. Conecta tu repositorio de GitHub con Vercel
2. Configura las variables de entorno en el dashboard de Vercel
3. Deploy automático en cada push

### Build Manual
```bash
npm run build
npm run preview
```

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

## 🙏 Reconocimientos

- Iconos por [Lucide](https://lucide.dev/)
- Animaciones por [Framer Motion](https://www.framer.com/motion/)
- Diseño inspirado en principios de Material Design y Apple Human Interface Guidelines

---

⭐ Si te gusta este proyecto, ¡dale una estrella en GitHub!
