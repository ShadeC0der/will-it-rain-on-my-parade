# 🌤️ Will It Rain On My Parade? - Frontend

Sistema de predicción climática con análisis de datos satelitales (NASA + Open Data) para eventos al aire libre.

## Características

- **Interfaz moderna con estilo Cyberpunk**
- **Animaciones cinematográficas** con Lenis scroll suave
- **Selector de ubicación** con mapa interactivo (Leaflet)
- **Selector de fecha y hora** en formato 12h con AM/PM
- **Traducción dinámica** español/inglés con localStorage
- **Panel de resultados** con predicciones visuales
- **Lista para conectar con backend Django**

## Estructura del Proyecto

frontend/
├── src/
│   │   ├── IntroSection.jsx         # Problema y Solución
│   │   ├── CategoriesSection.jsx    # Matriz de detección
│   │   ├── DateTimeSelector.jsx     # Selector fecha/hora
│   │   ├── LocationSelector.jsx     # Búsqueda de coordenadas
│   │   ├── MapComponent.jsx         # Mapa Leaflet integrado
│   │   └── ResultsPanel.jsx         # Visualización de resultados
│   ├── context/
│   │   └── LanguageContext.jsx      # Sistema de traducción
│   ├── services/
│   │   └── api.js                   # Comunicación con backend
│   ├── App.jsx                      # Componente principal
│   └── main.jsx                     # Entry point
├── .env                             # Variables de entorno
└── package.json                     # Dependencias

## 🚀 Instalación

```bash
# Instalar dependencias
npm install

# Configurar variables de entorno
# Copiar .env.example a .env y configurar:
# - VITE_API_URL (opcional, default: http://localhost:8000)

# Iniciar servidor de desarrollo
npm run dev
```

## 🔌 Formato de API

### Petición al Backend (POST /api/weather/predict)
```json
{
  "location": "-34.6037, -58.3816",
  "date": "2025-10-15",
  "time": "14:30"
}
```

### Respuesta Esperada del Backend
```json
{
  "status": "success",
  "data": {
    "location": {
      "name": "Buenos Aires, Argentina",
      "coordinates": { "lat": -34.6037, "lon": -58.3816 }
    },
    "datetime": "2025-10-15T14:30:00",
    "predictions": {
      "hot": 0.75,
      "cold": 0.10,
      "windy": 0.45,
      "humid": 0.60,
      "uncomfortable": 0.55
    },
    "recommendation": "Se esperan condiciones calurosas y húmedas...",
    "nasa_data": {
      "temperature": 32.5,
      "humidity": 75,
      "wind_speed": 15,
      "pressure": 1013
    }
  }
}
```

## 🎨 Tecnologías

- **React 18** - Framework UI
- **Vite** - Build tool
- **TailwindCSS** - Estilos
- **Lenis** - Smooth scroll
- **Leaflet** - Mapas interactivos
- **Context API** - Estado global (traducciones)

## 📦 Dependencias Principales

```json
{
  "react": "^18.3.1",
  "lenis": "^1.1.17",
  "leaflet": "^1.9.4",
  "react-leaflet": "^4.2.1",
  "tailwindcss": "^3.4.17"
}
```

## 🌐 Flujo de Datos

1. Usuario selecciona **fecha, hora y ubicación**
2. Frontend valida datos y muestra resumen
3. Al hacer clic en "Enviar Consulta":
   - Se envía POST a `/api/weather/predict`
   - Panel muestra estado "Analizando Datos..."
4. Backend responde con predicción
5. ResultsPanel visualiza resultados

## 🔧 Estado Actual

✅ **Listo para usar:**
- Interfaz completa funcional
- Validaciones de formulario
- Animaciones y traducciones
- Logs detallados en consola
- Panel de resultados esperando backend

⏳ **Pendiente:**
- Conexión con backend Django (esperando endpoint)

## 📝 Notas de Desarrollo

### Logs de Consola
Al enviar una consulta, verás logs detallados:
```
═══════════════════════════════════════
📤 ENVIANDO CONSULTA AL BACKEND
═══════════════════════════════════════
📍 Ubicación: -34.6037, -58.3816
📅 Fecha: 2025-10-15
⏰ Hora: 14:30
🔗 Endpoint: http://localhost:8000/api/weather/predict
```

### Variables de Entorno
```bash
VITE_API_URL=http://localhost:8000
```

## 🎯 Próximos Pasos

1. **Backend:** Implementar endpoint `/api/weather/predict` en Django
2. **Testing:** Conectar con backend y probar flujo completo
3. **Deployment:** Configurar variables de entorno de producción
