// API Service para comunicación con Django backend
import { getMockWeatherResponse } from './mockData'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

// 🔧 MODO DE DESARROLLO: Cambiar a false cuando el backend esté listo
const USE_MOCK_DATA = true

/**
 * Formato de petición al backend Django:
 * {
 *   "location": "Buenos Aires, Argentina" | "lat,lng",
 *   "date": "2025-10-04",
 *   "time": "14:30"
 * }
 * 
 * Django procesará:
 * 1. Convertir ciudad a lat/lon (si es necesario)
 * 2. Consultar NASA API con las coordenadas
 * 3. Retornar predicción de condiciones adversas
 */

export const submitWeatherQuery = async (queryData) => {
  // 🧪 MODO DE PRUEBA: Usar datos mock si está activado
  if (USE_MOCK_DATA) {
    console.log('🧪 USANDO DATOS DE PRUEBA (MOCK DATA)')
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.log('⚠️  El backend aún no está conectado')
    console.log('📊 Generando datos aleatorios para testing...')
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    
    try {
      const mockResponse = await getMockWeatherResponse(
        queryData.location,
        queryData.date,
        queryData.time
      )
      
      console.log('✅ Datos mock generados:')
      console.log('📍 Condición:', mockResponse.data.condition)
      console.log('🎲 Nivel de riesgo:', mockResponse.data.risk_level)
      console.log('📊 Predicciones:', mockResponse.data.predictions)
      
      return mockResponse
    } catch (error) {
      console.error('❌ Error generando datos mock:', error)
      throw error
    }
  }

  // 🔗 MODO PRODUCCIÓN: Llamar al backend real
  try {
    console.log('🔗 CONECTANDO CON BACKEND REAL')
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    
    const response = await fetch(`${API_BASE_URL}/api/weather/predict`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        location: queryData.location,
        date: queryData.date,
        time: queryData.time
      })
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    
    console.log('✅ Respuesta del backend recibida')
    console.log('📊 Datos:', data)
    
    return data
  } catch (error) {
    console.error('❌ Error conectando con backend:', error)
    console.log('💡 Tip: Verifica que el backend esté corriendo en', API_BASE_URL)
    throw error
  }
}

/**
 * Formato de respuesta esperado de Django:
 * {
 *   "status": "success",
 *   "data": {
 *     "location": {
 *       "name": "Buenos Aires, Argentina",
 *       "coordinates": {
 *         "lat": -34.6037,
 *         "lon": -58.3816
 *       }
 *     },
 *     "datetime": "2025-10-04T14:30:00",
 *     "predictions": {
 *       "hot": 0.75,        // Probabilidad 0-1
 *       "cold": 0.10,
 *       "windy": 0.45,
 *       "humid": 0.60,
 *       "uncomfortable": 0.55
 *     },
 *     "recommendation": "Se esperan condiciones calurosas y húmedas. Se recomienda posponer el evento.",
 *     "nasa_data": {
 *       "temperature": 32.5,
 *       "humidity": 75,
 *       "wind_speed": 15,
 *       "pressure": 1013
 *     }
 *   }
 * }
 */

// Ejemplo de uso:
// const result = await submitWeatherQuery({
//   location: "Buenos Aires, Argentina",
//   date: "2025-10-04",
//   time: "14:30"
// })
