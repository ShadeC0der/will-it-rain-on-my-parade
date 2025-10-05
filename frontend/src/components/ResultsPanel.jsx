import { useState } from 'react'
import { useLanguage } from '../context/LanguageContext'
import HistoryPanel from './HistoryPanel'
import { generateRecommendations } from '../services/recommendationEngine'
import { 
  RefreshCw, 
  AlertTriangle, 
  Zap, 
  CheckCircle,
  Thermometer,
  Droplets,
  Wind,
  Gauge
} from 'lucide-react'

function ResultsPanel({ result, isLoading, error }) {
  const { t } = useLanguage()
  const [selectedHistoryItem, setSelectedHistoryItem] = useState(null)
  
  // Determinar qué resultado mostrar: el actual o uno del historial
  const displayResult = selectedHistoryItem || result
  const isFromHistory = !!selectedHistoryItem

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-700 to-red-700 dark:from-cyan-400 dark:to-pink-500 uppercase tracking-tight mb-2 drop-shadow-md"
              style={{ textShadow: '0 0 20px rgba(251, 146, 60, 0.2)' }}>
            {t('analyzingData')}
          </h2>
          <div className="flex items-center justify-center gap-2 mt-4">
            <div className="h-px w-12 bg-orange-500 dark:bg-cyan-400"></div>
            <p className="text-xs text-orange-700 dark:text-cyan-400 uppercase tracking-widest font-mono">
              {t('consultingNasa')}
            </p>
            <div className="h-px w-12 bg-orange-500 dark:bg-cyan-400"></div>
          </div>
        </div>

        <div className="relative border-2 border-purple-300 dark:border-purple-500/30 p-12 bg-white dark:bg-gray-800/50 shadow-lg dark:shadow-none backdrop-blur-sm text-center"
             style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%)' }}>
          <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-purple-500 dark:border-purple-500"></div>
          <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-purple-500 dark:border-purple-500"></div>
          
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 border-4 border-orange-500 dark:border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
          </div>
          <p className="text-orange-700 dark:text-cyan-400 font-mono text-lg font-semibold">{t('processingQuery')}</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="space-y-8">
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-pink-500 uppercase tracking-tight mb-2">
            {t('error')}
          </h2>
        </div>

        <div className="relative border-2 border-red-500 dark:border-red-500/30 p-8 bg-red-100 dark:bg-red-900/10 shadow-lg dark:shadow-none backdrop-blur-sm"
             style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%)' }}>
          <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-red-500"></div>
          <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-red-500"></div>
          
          <div className="text-center">
            <span className="text-6xl mb-4 block">❌</span>
            <p className="text-red-700 dark:text-red-400 font-mono text-lg font-semibold">{error}</p>
          </div>
        </div>
      </div>
    )
  }

  if (!result) {
    return (
      <div className="space-y-8">
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-700 to-red-700 dark:from-cyan-400 dark:to-pink-500 uppercase tracking-tight mb-2 drop-shadow-md"
              style={{ textShadow: '0 0 20px rgba(251, 146, 60, 0.2)' }}>
            {t('results')}
          </h2>
          <div className="flex items-center justify-center gap-2 mt-4">
            <div className="h-px w-12 bg-orange-500 dark:bg-cyan-400"></div>
            <p className="text-xs text-orange-700 dark:text-cyan-400 uppercase tracking-widest font-mono">
              {t('waitingQuery')}
            </p>
            <div className="h-px w-12 bg-orange-500 dark:bg-cyan-400"></div>
          </div>
        </div>

        {/* Historial de Consultas */}
        <HistoryPanel onSelectHistory={(item) => setSelectedHistoryItem(item.result)} />

        <div className="relative border-2 border-gray-400 dark:border-gray-600/30 p-12 bg-white dark:bg-gray-800/50 shadow-lg dark:shadow-none backdrop-blur-sm text-center"
             style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%)' }}>
          <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-gray-500 dark:border-gray-600"></div>
          <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-gray-500 dark:border-gray-600"></div>
          
          <span className="text-6xl mb-4 block opacity-40 dark:opacity-30">📊</span>
          <p className="text-gray-600 dark:text-gray-400 font-mono font-semibold">
            {t('resultsWillAppear')}
          </p>
        </div>
      </div>
    )
  }

  // Mostrar resultados - Adaptado al formato real del backend
  const data = displayResult
  const hasPredicted = !!data?.predicted
  const debugKeys = data ? Object.keys(data) : []

  const scrollToDateSection = () => {
    const dateSection = document.getElementById('date-time-section')
    if (dateSection) {
      dateSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  // Mapear las categorías a nombres legibles
  const categoryNames = {
    veryHot: { es: 'Muy Caluroso', en: 'Very Hot', icon: '🔥', color: 'red' },
    veryCold: { es: 'Muy Frío', en: 'Very Cold', icon: '❄️', color: 'blue' },
    veryWindy: { es: 'Muy Ventoso', en: 'Very Windy', icon: '💨', color: 'cyan' },
    veryWet: { es: 'Muy Húmedo', en: 'Very Wet', icon: '💧', color: 'blue' },
    veryUncomfortable: { es: 'Muy Incómodo', en: 'Very Uncomfortable', icon: '😰', color: 'orange' }
  }

  // Validar que predicted tenga valores válidos
  const validatePredicted = (predicted) => {
    if (!predicted || typeof predicted !== 'object') return false
    
    const values = [
      predicted.veryHot,
      predicted.veryCold,
      predicted.veryWindy,
      predicted.veryWet,
      predicted.veryUncomfortable
    ]
    
    // Verificar que al menos un valor sea válido
    return values.some(val => {
      const num = parseFloat(val)
      return !isNaN(num) && num !== null && num !== undefined
    })
  }

  const hasPredictedData = data?.predicted && validatePredicted(data.predicted)

  // Generar recomendaciones basadas en los datos reales del backend
  const analysisResult = hasPredictedData
    ? generateRecommendations(data.predicted, data.query)
    : { riskLevel: 'low', recommendations: [], summary: '' }

  const riskLevel = analysisResult.riskLevel

  // Determinar la condición más probable
  const getDominantCondition = (predictions) => {
    if (!predictions) return null
    const entries = Object.entries(predictions)
    
    // Filtrar solo valores numéricos válidos
    const validEntries = entries.filter(([_, value]) => {
      const num = parseFloat(value)
      return !isNaN(num) && num !== null && num !== undefined
    })
    
    if (validEntries.length === 0) return null
    
    const [category, probability] = validEntries.reduce((max, entry) => 
      entry[1] > max[1] ? entry : max
    )
    return { category, probability }
  }

  const dominantCondition = hasPredictedData ? getDominantCondition(data.predicted) : null

  return (
    <div className="space-y-8">
      {/* Botón de Nueva Consulta */}
      {!isFromHistory && (
        <div className="flex justify-center">
          <button
            onClick={scrollToDateSection}
            className="relative border-2 border-orange-500 dark:border-cyan-400 bg-orange-100 dark:bg-cyan-500/10 px-8 py-3 text-orange-700 dark:text-cyan-400 hover:bg-orange-200 dark:hover:bg-cyan-500/20 hover:shadow-xl dark:hover:shadow-[0_0_20px_rgba(0,255,255,0.3)] transition-all font-mono text-sm uppercase tracking-wide group flex items-center gap-2"
            style={{ clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 0 100%)' }}
          >
            <RefreshCw className="w-4 h-4" />
            {t('newQuery')}
            <span className="group-hover:animate-bounce">↑</span>
          </button>
        </div>
      )}
      
      {/* Banner si es del historial */}
      {isFromHistory && (
        <div className="relative border border-purple-500/50 bg-purple-900/20 p-4 text-center"
             style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%)' }}>
          <div className="flex items-center justify-center gap-3">
            <span className="text-2xl">📜</span>
            <p className="text-purple-400 font-mono text-sm">
              {t('historyShowingPast')}
            </p>
            <button
              onClick={() => setSelectedHistoryItem(null)}
              className="px-3 py-1 text-xs bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 border border-purple-500/50 rounded font-mono transition-all"
            >
              ✕ {t('historyClose')}
            </button>
          </div>
        </div>
      )}
      
      {/* Historial de Consultas */}
      <HistoryPanel onSelectHistory={(item) => setSelectedHistoryItem(item.result)} />
      
      <div className="text-center space-y-4">
        <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-700 to-red-700 dark:from-cyan-400 dark:to-pink-500 uppercase tracking-tight mb-2 drop-shadow-md"
            style={{ textShadow: '0 0 20px rgba(251, 146, 60, 0.2)' }}>
          {t('weatherPrediction')}
        </h2>
        <div className="flex items-center justify-center gap-2">
          <div className="h-px w-12 bg-orange-500 dark:bg-cyan-400"></div>
          <p className="text-sm text-orange-700 dark:text-cyan-400 uppercase tracking-widest font-mono">
            {data?.query?.latitude && data?.query?.longitude 
              ? `${data.query.latitude.toFixed(4)}, ${data.query.longitude.toFixed(4)}`
              : 'Ubicación'}
          </p>
          <div className="h-px w-12 bg-orange-500 dark:bg-cyan-400"></div>
        </div>
        
        {/* Risk Level Badge */}
        {dominantCondition && (
          <div className="inline-block">
            <div className={`px-6 py-3 rounded-lg font-mono font-bold text-lg uppercase tracking-wider flex items-center gap-2 ${
              riskLevel === 'high' 
                ? 'bg-red-500/20 text-red-400 border border-red-500/50' 
                : riskLevel === 'medium'
                ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/50'
                : 'bg-green-500/20 text-green-400 border border-green-500/50'
            }`}>
              {categoryNames[dominantCondition.category]?.icon} 
              {(dominantCondition.probability * 100).toFixed(1)}% {categoryNames[dominantCondition.category]?.es}
              {riskLevel === 'high' && <AlertTriangle className="w-6 h-6" />}
              {riskLevel === 'medium' && <Zap className="w-6 h-6" />}
              {riskLevel === 'low' && <CheckCircle className="w-6 h-6" />}
            </div>
          </div>
        )}
      </div>

      {/* Predicciones - Probabilidades */}
      {data?.predicted && (
        <div className="relative border-2 border-orange-300 dark:border-cyan-500/30 p-6 bg-white dark:bg-gray-800/50 shadow-lg dark:shadow-none backdrop-blur-sm"
             style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%)' }}>
          <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-orange-500 dark:border-cyan-500"></div>
          <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-orange-500 dark:border-cyan-500"></div>
          
          <h3 className="text-xl font-bold text-orange-700 dark:text-cyan-400 mb-4 uppercase tracking-wide font-mono">
            // Probabilidades de Condiciones Adversas
          </h3>
          
          {/* Advertencia si hay datos inválidos */}
          {!hasPredictedData && data?.predicted && (
            <div className="mb-4 p-3 bg-yellow-100 dark:bg-yellow-900/20 border-2 border-yellow-500/50 rounded">
              <p className="text-yellow-800 dark:text-yellow-400 text-sm font-mono">
                ⚠️ Advertencia: Algunos valores de predicción no están disponibles o son inválidos. Mostrando datos parciales.
              </p>
            </div>
          )}
          
          <div className="space-y-4">
            {Object.entries(data.predicted).map(([category, probability]) => {
              // Sanitizar el valor para visualización
              const sanitizedProb = parseFloat(probability)
              const displayProb = isNaN(sanitizedProb) ? 0 : Math.max(0, Math.min(1, sanitizedProb))
              
              return (
                <div key={category} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-mono text-sm text-gray-700 dark:text-gray-300 font-semibold flex items-center gap-2">
                      <span className="text-2xl">{categoryNames[category]?.icon}</span>
                      {categoryNames[category]?.es}
                    </span>
                    <span className={`font-mono font-bold ${
                      displayProb >= 0.7 ? 'text-red-600 dark:text-red-400' :
                      displayProb >= 0.4 ? 'text-yellow-600 dark:text-yellow-400' :
                      'text-green-600 dark:text-green-400'
                    }`}>
                      {(displayProb * 100).toFixed(1)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-500 ${
                        displayProb >= 0.7 ? 'bg-red-500' :
                        displayProb >= 0.4 ? 'bg-yellow-500' :
                        'bg-green-500'
                      }`}
                      style={{ width: `${displayProb * 100}%` }}
                    ></div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Bloque de Depuración si falta predicted */}
      {!hasPredicted && (
        <div className="relative border-2 border-yellow-400 dark:border-yellow-500/40 p-6 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-300 font-mono text-sm" style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%)' }}>
          <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-yellow-500"></div>
          <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-yellow-500"></div>
          <p className="font-bold mb-2">⚠️ Depuración: Falta el campo predicted</p>
          <p className="mb-2">Claves recibidas: {debugKeys.join(', ') || 'ninguna'}</p>
          <pre className="overflow-auto max-h-60 p-3 bg-yellow-100 dark:bg-yellow-800/30 border border-yellow-500/30 rounded">{JSON.stringify(data, null, 2)}</pre>
          <p className="mt-2 italic">Verifica que el backend devuelva un objeto con 'predicted' o renombra en el normalizador.</p>
        </div>
      )}

      {/* Información de Consulta */}
      {data?.query && (
        <div className="relative border-2 border-purple-300 dark:border-purple-500/30 p-6 bg-white dark:bg-gray-800/50 shadow-lg dark:shadow-none backdrop-blur-sm"
             style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%)' }}>
          <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-purple-500 dark:border-purple-500"></div>
          <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-purple-500 dark:border-purple-500"></div>
          
          <h3 className="text-xl font-bold text-purple-700 dark:text-purple-400 mb-4 uppercase tracking-wide font-mono">
            // Detalles de la Consulta
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-sm">
            <div className="bg-orange-50 dark:bg-gray-900/50 border-2 border-orange-300 dark:border-cyan-500/20 p-3 rounded shadow-sm dark:shadow-none">
              <div className="text-gray-700 dark:text-gray-300 text-xs uppercase tracking-wider mb-1 font-semibold">
                📅 Fecha Objetivo
              </div>
              <div className="text-gray-900 dark:text-white font-bold text-lg">{data.query.targetDate}</div>
            </div>
            <div className="bg-orange-50 dark:bg-gray-900/50 border-2 border-orange-300 dark:border-cyan-500/20 p-3 rounded shadow-sm dark:shadow-none">
              <div className="text-gray-700 dark:text-gray-300 text-xs uppercase tracking-wider mb-1 font-semibold">
                📊 Brier Score Promedio
              </div>
              <div className="text-gray-900 dark:text-white font-bold text-lg">
                {data.meanBrierScore !== null && data.meanBrierScore !== undefined 
                  ? data.meanBrierScore.toFixed(4) 
                  : 'N/A'}
              </div>
            </div>
          </div>

          {/* Advertencia de errores externos si existen */}
        </div>
      )}

      {/* Recomendaciones Basadas en Datos Reales */}
      {analysisResult.recommendations && analysisResult.recommendations.length > 0 && (
        <div className={`relative border-2 p-6 backdrop-blur-sm ${
          riskLevel === 'high'
            ? 'border-red-500 dark:border-red-500/50 bg-red-50 dark:bg-red-900/20' 
            : riskLevel === 'medium'
            ? 'border-yellow-500 dark:border-yellow-500/50 bg-yellow-50 dark:bg-yellow-900/20'
            : 'border-green-500 dark:border-green-500/50 bg-green-50 dark:bg-green-900/20'
        } shadow-lg dark:shadow-none`} style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%)' }}>
          <div className={`absolute top-0 right-0 w-3 h-3 border-t border-r ${
            riskLevel === 'high' ? 'border-red-500' : riskLevel === 'medium' ? 'border-yellow-500' : 'border-green-500'
          }`}></div>
          <div className={`absolute bottom-0 left-0 w-3 h-3 border-b border-l ${
            riskLevel === 'high' ? 'border-red-500' : riskLevel === 'medium' ? 'border-yellow-500' : 'border-green-500'
          }`}></div>
          
          <h3 className={`text-2xl font-bold mb-4 uppercase tracking-wide font-mono flex items-center gap-2 ${
            riskLevel === 'high' ? 'text-red-700 dark:text-red-400' : 
            riskLevel === 'medium' ? 'text-yellow-700 dark:text-yellow-400' : 
            'text-green-700 dark:text-green-400'
          }`}>
            // {t('recommendations')}
            {riskLevel === 'high' && <AlertTriangle className="w-8 h-8" />}
            {riskLevel === 'medium' && <Zap className="w-8 h-8" />}
            {riskLevel === 'low' && <CheckCircle className="w-8 h-8" />}
          </h3>
          
          {/* Resumen del Riesgo */}
          <div className={`p-4 mb-4 rounded border-2 ${
            riskLevel === 'high' ? 'bg-red-100 dark:bg-red-900/30 border-red-500' :
            riskLevel === 'medium' ? 'bg-yellow-100 dark:bg-yellow-900/30 border-yellow-500' :
            'bg-green-100 dark:bg-green-900/30 border-green-500'
          }`}>
            <p className={`font-mono font-bold text-lg ${
              riskLevel === 'high' ? 'text-red-800 dark:text-red-300' :
              riskLevel === 'medium' ? 'text-yellow-800 dark:text-yellow-300' :
              'text-green-800 dark:text-green-300'
            }`}>
              {analysisResult.summary}
            </p>
          </div>

          {/* Lista de Recomendaciones */}
          <ul className="space-y-3">
            {analysisResult.recommendations.map((recommendation, index) => (
              <li key={index} className={`flex items-start gap-3 font-mono text-base leading-relaxed ${
                riskLevel === 'high' ? 'text-red-800 dark:text-red-300' : 
                riskLevel === 'medium' ? 'text-yellow-800 dark:text-yellow-300' : 
                'text-green-800 dark:text-green-300'
              }`}>
                <span className="text-lg mt-0.5">•</span>
                <span>{recommendation}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Botón de Nueva Consulta al final */}
      {!isFromHistory && (
        <div className="flex justify-center pt-4">
          <button
            onClick={scrollToDateSection}
            className="relative border-2 border-orange-500 dark:border-cyan-400 bg-orange-100 dark:bg-cyan-500/10 px-8 py-3 text-orange-700 dark:text-cyan-400 hover:bg-orange-200 dark:hover:bg-cyan-500/20 hover:shadow-xl dark:hover:shadow-[0_0_20px_rgba(0,255,255,0.3)] transition-all font-mono text-sm uppercase tracking-wide group flex items-center gap-2"
            style={{ clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 0 100%)' }}
          >
            <RefreshCw className="w-4 h-4" />
            {t('newQuery')}
            <span className="group-hover:animate-bounce">↑</span>
          </button>
        </div>
      )}
    </div>
  )
}

export default ResultsPanel
