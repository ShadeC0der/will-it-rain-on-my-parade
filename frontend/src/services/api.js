// API Service para comunicación con Django backend
import { getMockWeatherResponse } from './mockData'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

// 🔧 MODO DE DESARROLLO: Cambiar a false cuando el backend esté listo
const USE_MOCK_DATA = false

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
    console.log('🧪 Modo de prueba activado - Usando datos simulados')
    
    try {
      const mockResponse = await getMockWeatherResponse(
        queryData.location,
        queryData.date,
        queryData.time
      )
      
      return mockResponse
    } catch (error) {
      console.error('❌ Error generando datos de prueba:', error)
      throw new Error('Error al generar datos de prueba')
    }
  }

  // 🔗 MODO PRODUCCIÓN: Llamar al backend real
  try {
    console.log('🔗 Conectando con el servidor...')
    console.log('📍 URL:', API_BASE_URL)
    
    const response = await fetch(`${API_BASE_URL}/api/clima/`, {
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
      const errorMessage = `Error del servidor (${response.status})`
      throw new Error(errorMessage)
    }

    const data = await response.json()
    
    console.log('✅ Respuesta recibida correctamente')
    
    return data
  } catch (error) {
    console.error('❌ Error de conexión:', error.message)
    
    // Crear mensaje de error genérico
    const userError = new Error('No se pudo conectar con el servidor. Por favor, verifica tu conexión a internet e intenta nuevamente.')
    userError.originalError = error
    
    throw userError
  }
}

/**
 * Formato de respuesta real del backend Django:
 * {
 *   "predicted": {
 *     "veryHot": 0,
 *     "veryCold": 0,
 *     "veryWindy": 0,
 *     "veryWet": 0.129,
 *     "veryUncomfortable": 0
 *   },
 *   "observed": {
 *     "veryHot": { "actualOutcome": 0, "brierScore": 0 },
 *     "veryCold": { "actualOutcome": 1, "brierScore": 1 },
 *     "veryWindy": { "actualOutcome": 0, "brierScore": 0 },
 *     "veryWet": { "actualOutcome": 0, "brierScore": 0.0166 },
 *     "veryUncomfortable": { "actualOutcome": 0, "brierScore": 0 }
 *   },
 *   "meanBrierScore": 0.203,
 *   "query": {
 *     "latitude": -38.7359,
 *     "longitude": -72.5904,
 *     "targetDate": "2021-10-15",
 *     "thresholds": { ... }
 *   },
 *   "externalErrors": "GESDISC token rejected by server." | null
 * }
 */

// Ejemplo de uso:
// const result = await submitWeatherQuery({
//   location: "Buenos Aires, Argentina",
//   date: "2025-10-04",
//   time: "14:30"
// })
