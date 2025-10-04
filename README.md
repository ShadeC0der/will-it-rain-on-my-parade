# 🌤️ Will It Rain On My Parade?

**Sistema de Predicción Climática para Eventos al Aire Libre**

Utiliza datos satelitales de NASA y Open Data para predecir condiciones climáticas adversas y ayudar en la planificación de eventos.

---

## 📖 Descripción

¿Vas a organizar un evento al aire libre? ¿Te preocupa el clima? **Will It Rain On My Parade** analiza datos meteorológicos satelitales para predecir la probabilidad de condiciones adversas en una fecha y ubicación específicas.

### 🎯 Condiciones que Detecta

- ☀️ **Hot** - Temperaturas extremadamente altas
- ❄️ **Cold** - Temperaturas extremadamente bajas  
- 💨 **Windy** - Vientos fuertes
- 💧 **Humid** - Humedad excesiva
- 😓 **Uncomfortable** - Combinación de factores incómodos

### 🔬 Fuentes de Datos

- **NASA POWER API** - Datos meteorológicos satelitales
- **Open Data** - Información climática complementaria

---

## 🏗️ Estructura del Proyecto

```
will-it-rain-on-my-parade/
├── frontend/              # React + Vite
│   ├── src/
│   │   ├── components/   # Componentes UI
│   │   ├── context/      # Sistema de traducción
│   │   └── services/     # API client
│   └── README.md         # Documentación frontend
│
├── backend/              # Django (TODO)
│   └── (pendiente)
│
├── PROJECT_STATUS.md     # Estado actual del proyecto
└── README.md            # Este archivo
```

---

## 🚀 Quick Start

### Frontend

```bash
cd frontend
npm install
npm run dev
```

**Configuración:**
1. Copiar `frontend/.env.example` a `frontend/.env`
2. Configurar variables de entorno (si es necesario)
3. El frontend estará en: http://localhost:5173

### Backend (Pendiente)

El backend está pendiente de implementación. Ver [PROJECT_STATUS.md](./PROJECT_STATUS.md) para detalles.

---

## 💻 Tecnologías

### Frontend ✅
- React 18
- Vite
- TailwindCSS
- Lenis (smooth scroll)
- Leaflet (mapas interactivos)
- Context API (traducciones)

### Backend ⏳
- Django (planeado)
- NASA POWER API
- Python

---

## 📡 API Integration

### Endpoint Esperado

**POST** `/api/weather/predict`

**Request:**
```json
{
  "location": "-34.6037, -58.3816",
  "date": "2025-10-15",
  "time": "14:30"
}
```

**Response:**
```json
{
  "status": "success",
  "data": {
    "predictions": {
      "hot": 0.75,
      "cold": 0.10,
      "windy": 0.45,
      "humid": 0.60,
      "uncomfortable": 0.55
    },
    "recommendation": "Se esperan condiciones calurosas...",
    "nasa_data": { ... }
  }
}
```

Ver [PROJECT_STATUS.md](./PROJECT_STATUS.md) para formato completo.

---

## 📋 Estado Actual

| Componente | Estado | Descripción |
|------------|--------|-------------|
| Frontend UI | ✅ Completo | Interfaz completa funcional |
| Animaciones | ✅ Completo | Lenis + animaciones cinematográficas |
| Traducciones | ✅ Completo | ES/EN con localStorage |
| Formularios | ✅ Completo | Fecha, hora, ubicación |
| Mapa | ✅ Completo | Leaflet integrado |
| Panel Resultados | ✅ Completo | Funcional con mock data |
| **Mock Data** | ✅ **Activo** | **7 escenarios de prueba** |
| Backend | ⏳ Pendiente | Endpoint por implementar |
| NASA API | ⏳ Pendiente | Integración pendiente |

### 🧪 Probando Ahora con Datos de Prueba

El frontend está **100% funcional** con datos simulados. Puedes:
- ✅ Completar formularios
- ✅ Enviar consultas
- ✅ Ver resultados con diferentes condiciones climáticas
- ✅ Probar toda la UX end-to-end

Ver [frontend/MOCK_DATA_INFO.md](./frontend/MOCK_DATA_INFO.md) para más detalles.

---

## 📚 Documentación

- **[Frontend README](./frontend/README.md)** - Documentación completa del frontend
- **[PROJECT_STATUS.md](./PROJECT_STATUS.md)** - Estado detallado del proyecto
- **[MOCK_DATA_INFO.md](./frontend/MOCK_DATA_INFO.md)** - Guía de datos de prueba
- **[BACKEND_RESPONSE_EXAMPLE.json](./BACKEND_RESPONSE_EXAMPLE.json)** - Formato de respuesta para backend
- **[EJEMPLOS_PETICIONES.md](./EJEMPLOS_PETICIONES.md)** - Ejemplos de requests

---

## 🎨 Screenshots

### Interfaz Principal
- Diseño cyberpunk moderno
- Animaciones suaves con Lenis
- Cada sección con animación única (lateral, zoom, 3D)

### Selector de Ubicación
- Input manual de coordenadas
- Mapa interactivo de Google Maps
- Validación en tiempo real

### Selector de Hora
- Formato 12h con AM/PM
- Dropdowns grandes y cómodos
- Conversión automática a 24h para backend

### Panel de Resultados
- Estados: vacío, loading, error, success
- Visualización de probabilidades
- Recomendación con código de colores

---

## 🤝 Contribuir

### Próximos Pasos

1. **Implementar Backend Django**
   - Endpoint `/api/weather/predict`
   - Integración con NASA API
   - Lógica de predicción

2. **Testing**
   - Conectar frontend con backend
   - Probar flujo completo
   - Testing de casos extremos

3. **Deployment**
   - Configurar variables de producción
   - Deploy frontend (Vercel/Netlify)
   - Deploy backend (Railway/Render)

---

## 📄 Licencia

Este proyecto fue creado para el **Hackathon 2025**.

---

## 👥 Equipo

Desarrollado con ❤️ para mejorar la planificación de eventos al aire libre.

---

## 📞 Contacto

Para más información, consultar [PROJECT_STATUS.md](./PROJECT_STATUS.md).
