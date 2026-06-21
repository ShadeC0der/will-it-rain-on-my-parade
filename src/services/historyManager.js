/**
 * Gestor de Historial de Consultas
 * Almacena consultas en localStorage y permite gestionar el historial
 */

const HISTORY_KEY = 'weather_query_history'
const MAX_HISTORY_ITEMS = 10 // Máximo de consultas en el historial

/**
 * Obtener todo el historial
 */
export const getHistory = () => {
  try {
    const history = localStorage.getItem(HISTORY_KEY)
    return history ? JSON.parse(history) : []
  } catch (error) {
    console.error('Error al leer historial:', error)
    return []
  }
}

/**
 * Guardar una nueva consulta en el historial
 * Adaptado al formato real del backend Django
 */
export const saveToHistory = (queryData, result) => {
  try {
    const history = getHistory()
    
    // Determinar la condición dominante y nivel de riesgo basado en datos reales
    let dominantCondition = 'unknown'
    let riskLevel = 'low'
    
    if (result.predicted) {
      // Encontrar la probabilidad más alta
      const predictions = result.predicted
      const maxEntry = Object.entries(predictions).reduce((max, entry) => 
        entry[1] > max[1] ? entry : max
      )
      dominantCondition = maxEntry[0]
      const maxProb = maxEntry[1]
      
      // Calcular nivel de riesgo
      if (maxProb >= 0.7) riskLevel = 'high'
      else if (maxProb >= 0.4) riskLevel = 'medium'
      else riskLevel = 'low'
    }
    
    const newEntry = {
      id: Date.now(), // Timestamp como ID único
      timestamp: new Date().toISOString(),
      query: {
        location: queryData.location,
        date: queryData.date,
        time: queryData.time
      },
      result: result,  // Guardar resultado completo del backend
      // Crear un resumen para mostrar en la lista
      summary: {
        condition: dominantCondition,
        risk_level: riskLevel,
        location_name: result.query?.latitude && result.query?.longitude 
          ? `${result.query.latitude.toFixed(4)}, ${result.query.longitude.toFixed(4)}`
          : queryData.location
      }
    }
    
    // Agregar al inicio del array
    history.unshift(newEntry)
    
    // Mantener solo las últimas MAX_HISTORY_ITEMS consultas
    const trimmedHistory = history.slice(0, MAX_HISTORY_ITEMS)
    
    localStorage.setItem(HISTORY_KEY, JSON.stringify(trimmedHistory))
    
    console.log('✅ Consulta guardada en historial:', newEntry.id)
    console.log('📊 Resumen:', newEntry.summary)
    
    return trimmedHistory
  } catch (error) {
    console.error('❌ Error al guardar en historial:', error)
    return getHistory()
  }
}

/**
 * Obtener una consulta específica por ID
 */
export const getHistoryItemById = (id) => {
  const history = getHistory()
  return history.find(item => item.id === id)
}

/**
 * Eliminar una consulta del historial
 */
export const deleteHistoryItem = (id) => {
  try {
    const history = getHistory()
    const filtered = history.filter(item => item.id !== id)
    localStorage.setItem(HISTORY_KEY, JSON.stringify(filtered))
    console.log('🗑️ Consulta eliminada del historial:', id)
    return filtered
  } catch (error) {
    console.error('❌ Error al eliminar del historial:', error)
    return getHistory()
  }
}

/**
 * Limpiar todo el historial
 */
export const clearHistory = () => {
  try {
    localStorage.removeItem(HISTORY_KEY)
    console.log('🗑️ Historial limpiado')
    return []
  } catch (error) {
    console.error('❌ Error al limpiar historial:', error)
    return []
  }
}

/**
 * Descargar una consulta específica como JSON
 * Incluye el conjunto completo: request + response + metadata
 */
export const downloadQueryAsJSON = (historyItem) => {
  try {
    // Crear objeto completo con toda la información
    const completeData = {
      metadata: {
        id: historyItem.id,
        timestamp: historyItem.timestamp,
        downloadedAt: new Date().toISOString(),
        application: 'Will It Rain On My Parade?',
        version: '1.0.0'
      },
      request: {
        location: historyItem.query.location,
        date: historyItem.query.date,
        time: historyItem.query.time
      },
      response: historyItem.result,
      summary: historyItem.summary
    }
    
    const dataStr = JSON.stringify(completeData, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    
    // Nombre de archivo con fecha y ubicación
    const dateStr = historyItem.query.date.replace(/:/g, '-')
    const fileName = `consulta_${dateStr}_${historyItem.id}.json`
    
    const link = document.createElement('a')
    link.href = url
    link.download = fileName
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
    
    console.log('📥 Descargando consulta completa:', historyItem.id)
  } catch (error) {
    console.error('❌ Error al descargar JSON:', error)
  }
}

/**
 * Descargar todo el historial como JSON
 * Incluye todos los conjuntos completos de consultas
 */
export const downloadAllHistoryAsJSON = () => {
  try {
    const history = getHistory()
    
    // Formatear cada item del historial con estructura completa
    const completeHistory = {
      metadata: {
        application: 'Will It Rain On My Parade?',
        version: '1.0.0',
        exportedAt: new Date().toISOString(),
        totalQueries: history.length
      },
      queries: history.map(item => ({
        metadata: {
          id: item.id,
          timestamp: item.timestamp
        },
        request: {
          location: item.query.location,
          date: item.query.date,
          time: item.query.time
        },
        response: item.result,
        summary: item.summary
      }))
    }
    
    const dataStr = JSON.stringify(completeHistory, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
    const link = document.createElement('a')
    link.href = url
    link.download = `historial_completo_${timestamp}.json`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
    
    console.log('📥 Descargando historial completo:', completeHistory.queries.length, 'consultas')
  } catch (error) {
    console.error('❌ Error al descargar historial:', error)
  }
}

export default {
  getHistory,
  saveToHistory,
  getHistoryItemById,
  deleteHistoryItem,
  clearHistory,
  downloadQueryAsJSON,
  downloadAllHistoryAsJSON
}
