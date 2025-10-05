// API Service para comunicación con Django backend
import { getMockWeatherResponse } from './mockData'

const API_BASE_URL = (import.meta.env.VITE_API_URL || 'http://localhost:8000').replace(/\/$/, '')

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

// Normaliza diferentes formatos de respuesta que pueda entregar el backend
const normalizeBackendResponse = (raw) => {
  if (!raw) return null
  // Si viene un array (por ejemplo lista con un solo elemento)
  if (Array.isArray(raw)) {
    raw = raw[0]
  }
  // Algunos posibles nombres alternativos
  const predicted = raw.predicted || raw.predictions || raw.probabilities || null
  const observed = raw.observed || raw.observations || null
  const meanBrierScore = raw.meanBrierScore || raw.mean_brier_score || null
  const query = raw.query || raw.request || null
  const externalErrors = raw.externalErrors || raw.external_errors || raw.error_external || null

  return {
    ...raw,
    predicted,
    observed,
    meanBrierScore,
    query,
    externalErrors
  }
}

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
    
    const payload = {
      location: queryData.location,
      date: queryData.date,
      time: queryData.time
    }

    // 1) Intento principal: POST
    let response
    let data
    try {
      response = await fetch(`${API_BASE_URL}/api/clima/?format=json`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      if (!response.ok) {
        throw new Error(`POST status ${response.status}`)
      }
      data = await response.json()
      console.log('✅ Respuesta POST recibida:', data)
    } catch (postError) {
      console.warn('⚠️ POST falló o no devolvió 2xx:', postError.message)
      console.warn('↪️ Reintentando con GET...')
      // 2) Fallback: GET con query params (por si el backend espera GET)
      const params = new URLSearchParams(payload).toString()
      const getResp = await fetch(`${API_BASE_URL}/api/clima/?format=json&${params}`)
      if (!getResp.ok) {
        throw new Error(`GET fallback status ${getResp.status}`)
      }
      data = await getResp.json()
      console.log('✅ Respuesta GET recibida:', data)
    }

    const normalized = normalizeBackendResponse(data)
    if (!normalized) {
      throw new Error('Formato de respuesta vacío o inválido')
    }
    // Validación mínima
    if (!normalized.predicted) {
      console.warn('⚠️ Respuesta sin campo predicted. Respuesta completa:', normalized)
    }
    console.log('🧪 Datos normalizados:', normalized)
    return normalized
  } catch (error) {
    console.error('❌ Error de conexión:', error.message)
    
    // Crear mensaje de error genérico
    const userError = new Error('No se pudo conectar o procesar la respuesta del servidor. Verifica la consola para más detalles.')
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
