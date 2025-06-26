# ConciencIA - Guía Creativa con IA

ConciencIA es tu guía creativa personal integrada en "Ideas para...". Utiliza GPT-4o mini de OpenAI para analizar tus ideas, encontrar patrones y ofrecerte orientación creativa empática.

## ✨ Características

- 🧠 **Análisis inteligente** de tus ideas y pensamientos
- 💝 **Guía empática** que se adapta a tu estilo emocional  
- 🔍 **Detección de patrones** en tu creatividad
- 🎨 **Perspectivas nuevas** sobre tus reflexiones
- 💪 **Soporte emocional** integrado
- 🔒 **100% privado** - tus datos no se comparten

## 🚀 Configuración Rápida

### 1. Obtener API Key de OpenAI

1. Ve a [platform.openai.com](https://platform.openai.com)
2. Crea una cuenta o inicia sesión
3. Ve a "API Keys" en tu dashboard
4. Crea una nueva API key
5. Cópiala (empieza con `sk-...`)

### 2. Configurar en la App

1. Ve a **Ajustes** en la app
2. Busca la sección **ConciencIA** 
3. Pega tu API key en el campo correspondiente
4. Elige tu personalidad preferida:
   - **Empática**: Comprensiva y validadora
   - **Creativa**: Innovadora e inspiradora  
   - **Apoyo**: Mentora y constructiva
5. Selecciona el estilo de respuesta:
   - **Concisa**: Respuestas breves y directas
   - **Detallada**: Análisis profundos y completos
   - **Creativa**: Lenguaje poético y metafórico

### 3. ¡Comenzar a Conversar!

1. Ve al menú **ConciencIA** 
2. Usa las preguntas sugeridas o escribe la tuya
3. ConciencIA analizará todas tus ideas guardadas para darte respuestas contextualizadas

## 🛠 Para Desarrolladores

### Ejecutar con Backend (Recomendado)

```bash
# Instalar dependencias del servidor
npm run server:install

# Ejecutar frontend + backend simultáneamente
npm run dev:full
```

### Solo Frontend (Menos seguro)

```bash
# Solo desarrollo frontend
npm run dev
```

### Backend por Separado

```bash
# En una terminal
npm run server:dev

# En otra terminal  
npm run dev
```

## 🔧 Arquitectura Técnica

### Frontend
- **React + TypeScript** - Interfaz de usuario
- **Framer Motion** - Animaciones fluidas
- **Zustand** - Gestión de estado
- **Tailwind CSS** - Estilos modernos

### Backend
- **Express.js** - API REST
- **OpenAI SDK** - Integración con GPT-4o mini
- **Rate Limiting** - Protección contra abuso
- **CORS** - Seguridad de origen cruzado

### Características de Seguridad
- ✅ API keys nunca enviadas al cliente
- ✅ Rate limiting por IP
- ✅ Validación de mensajes
- ✅ Manejo de errores robusto
- ✅ Fallback al cliente directo si backend falla

## 🎯 Uso Avanzado

### Embeddings y Búsqueda Semántica

ConciencIA usa embeddings para encontrar ideas similares:

```typescript
// Ejemplo de uso interno
const similarIdeas = await openaiService.findSimilarIdeas(
  "creatividad y emociones",
  userIdeas
);
```

### Personalización de Prompts

Los prompts se adaptan automáticamente según:
- Tu personalidad elegida
- Estilo de respuesta preferido  
- Historial de conversación
- Contexto de tus ideas

## 🚨 Solución de Problemas

### "API key inválida"
- Verifica que copiaste la key completa
- Asegúrate de que empiece con `sk-`
- Revisa que tengas créditos en OpenAI

### "Backend no disponible"
- La app funciona sin backend (menos seguro)
- Asegúrate de ejecutar `npm run dev:full`
- O ejecuta el backend por separado: `npm run server:dev`

### Respuestas lentas
- Normal en primera conversación (inicialización)
- Puede ser límite de rate de OpenAI
- Intenta en unos minutos

### Errores de CORS
- Asegúrate de ejecutar en `localhost:5173`
- Verifica configuración de CORS en `server/index.js`

## 💡 Tips de Uso

1. **Sé específico**: "Analiza mis ideas sobre creatividad" vs "¿Qué opinas?"
2. **Usa el contexto**: ConciencIA conoce todas tus ideas guardadas
3. **Experimenta personalidades**: Cada una ofrece perspectivas diferentes
4. **Combina estilos**: Cambia entre conciso y detallado según necesites
5. **Aprovecha el historial**: Las conversaciones mantienen contexto

## 🤝 Contribuir

ConciencIA está integrada en el ecosistema de "Ideas para...". Para contribuir:

1. Mantén la coherencia visual con el resto de la app
2. Prioriza la privacidad del usuario
3. Optimiza las llamadas a la API (costos)
4. Añade tests para nuevas características
5. Documenta cambios importantes

---

**Creado con ❤️ para potenciar tu creatividad** 