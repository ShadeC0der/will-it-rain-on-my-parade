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
 */
export const saveToHistory = (queryData, result) => {
  try {
    const history = getHistory()
    
    const newEntry = {
      id: Date.now(), // Timestamp como ID único
      timestamp: new Date().toISOString(),
      query: {
        location: queryData.location,
        date: queryData.date,
        time: queryData.time
      },
      result: result,
      // Crear un resumen para mostrar en la lista
      summary: {
        condition: result.data?.weather_status || 'unknown',
        risk_level: result.data?.risk_level || 'unknown',
        location_name: result.data?.location?.name || queryData.location
      }
    }
    
    // Agregar al inicio del array
    history.unshift(newEntry)
    
    // Mantener solo las últimas MAX_HISTORY_ITEMS consultas
    const trimmedHistory = history.slice(0, MAX_HISTORY_ITEMS)
    
    localStorage.setItem(HISTORY_KEY, JSON.stringify(trimmedHistory))
    
    console.log('✅ Consulta guardada en historial:', newEntry.id)
    
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
 */
export const downloadQueryAsJSON = (historyItem) => {
  try {
    const dataStr = JSON.stringify(historyItem, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    
    const link = document.createElement('a')
    link.href = url
    link.download = `consulta_${historyItem.id}.json`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
    
    console.log('📥 Descargando consulta:', historyItem.id)
  } catch (error) {
    console.error('❌ Error al descargar JSON:', error)
  }
}

/**
 * Descargar todo el historial como JSON
 */
export const downloadAllHistoryAsJSON = () => {
  try {
    const history = getHistory()
    const dataStr = JSON.stringify(history, null, 2)
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
    
    console.log('📥 Descargando historial completo')
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
