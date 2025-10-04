import { useState } from 'react'
import { useLanguage } from '../context/LanguageContext'
import HistoryPanel from './HistoryPanel'
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
          <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-500 uppercase tracking-tight mb-2"
              style={{ textShadow: '0 0 20px rgba(0, 255, 255, 0.3)' }}>
            {t('analyzingData')}
          </h2>
          <div className="flex items-center justify-center gap-2 mt-4">
            <div className="h-px w-12 bg-cyan-400"></div>
            <p className="text-xs text-cyan-400 uppercase tracking-widest font-mono">
              {t('consultingNasa')}
            </p>
            <div className="h-px w-12 bg-cyan-400"></div>
          </div>
        </div>

        <div className="relative border border-purple-500/30 p-12 bg-gray-800/50 backdrop-blur-sm text-center"
             style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%)' }}>
          <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-purple-500"></div>
          <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-purple-500"></div>
          
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
          </div>
          <p className="text-cyan-400 font-mono text-lg">{t('processingQuery')}</p>
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

        <div className="relative border border-red-500/30 p-8 bg-red-900/10 backdrop-blur-sm"
             style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%)' }}>
          <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-red-500"></div>
          <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-red-500"></div>
          
          <div className="text-center">
            <span className="text-6xl mb-4 block">❌</span>
            <p className="text-red-400 font-mono text-lg">{error}</p>
            <p className="text-gray-400 font-mono text-sm mt-4">
              // Verifica que el backend esté corriendo en http://localhost:8000
            </p>
          </div>
        </div>
      </div>
    )
  }

  if (!result) {
    return (
      <div className="space-y-8">
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-500 uppercase tracking-tight mb-2"
              style={{ textShadow: '0 0 20px rgba(0, 255, 255, 0.3)' }}>
            {t('results')}
          </h2>
          <div className="flex items-center justify-center gap-2 mt-4">
            <div className="h-px w-12 bg-cyan-400"></div>
            <p className="text-xs text-cyan-400 uppercase tracking-widest font-mono">
              {t('waitingQuery')}
            </p>
            <div className="h-px w-12 bg-cyan-400"></div>
          </div>
        </div>

        {/* Historial de Consultas */}
        <HistoryPanel onSelectHistory={(item) => setSelectedHistoryItem(item.result)} />

        <div className="relative border border-gray-600/30 p-12 bg-gray-800/50 backdrop-blur-sm text-center"
             style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%)' }}>
          <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-gray-600"></div>
          <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-gray-600"></div>
          
          <span className="text-6xl mb-4 block opacity-30">📊</span>
          <p className="text-gray-400 font-mono">
            {t('resultsWillAppear')}
          </p>
        </div>
      </div>
    )
  }

  // Mostrar resultados
  const { data } = displayResult

  const scrollToDateSection = () => {
    const dateSection = document.getElementById('date-time-section')
    if (dateSection) {
      dateSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <div className="space-y-8">
      {/* Botón de Nueva Consulta */}
      {!isFromHistory && (
        <div className="flex justify-center">
          <button
            onClick={scrollToDateSection}
            className="relative border-2 border-cyan-400 bg-cyan-500/10 px-8 py-3 text-cyan-400 hover:bg-cyan-500/20 hover:shadow-[0_0_20px_rgba(0,255,255,0.3)] transition-all font-mono text-sm uppercase tracking-wide group flex items-center gap-2"
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
        <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-500 uppercase tracking-tight mb-2"
            style={{ textShadow: '0 0 20px rgba(0, 255, 255, 0.3)' }}>
          {t('weatherPrediction')}
        </h2>
        <div className="flex items-center justify-center gap-2">
          <div className="h-px w-12 bg-cyan-400"></div>
          <p className="text-sm text-cyan-400 uppercase tracking-widest font-mono">
            {data?.location?.name || 'Ubicación'}
          </p>
          <div className="h-px w-12 bg-cyan-400"></div>
        </div>
        
        {/* Weather Status Badge */}
        {data?.weather_status && (
          <div className="inline-block">
            <div className={`px-6 py-3 rounded-lg font-mono font-bold text-lg uppercase tracking-wider flex items-center gap-2 ${
              data.risk_level === 'high' 
                ? 'bg-red-500/20 text-red-400 border border-red-500/50' 
                : data.risk_level === 'medium'
                ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/50'
                : 'bg-green-500/20 text-green-400 border border-green-500/50'
            }`}>
              {data.weather_status}
              {data.risk_level === 'high' && <AlertTriangle className="w-6 h-6" />}
              {data.risk_level === 'medium' && <Zap className="w-6 h-6" />}
              {data.risk_level === 'low' && <CheckCircle className="w-6 h-6" />}
            </div>
          </div>
        )}
      </div>

      {/* Datos Formateados */}
      {data?.formatted_data && (
        <div className="relative border border-cyan-500/30 p-6 bg-gray-800/50 backdrop-blur-sm"
             style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%)' }}>
          <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-cyan-500"></div>
          <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-cyan-500"></div>
          
          <h3 className="text-xl font-bold text-cyan-400 mb-4 uppercase tracking-wide font-mono">
            // {t('weatherData')}
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 font-mono text-sm">
            {Object.entries(data.formatted_data).map(([key, value]) => (
              <div key={key} className="bg-gray-900/50 border border-cyan-500/20 p-3 rounded">
                <div className="text-gray-300 text-sm uppercase tracking-wider mb-1">
                  {key.replace(/_/g, ' ')}
                </div>
                <div className="text-white font-bold text-lg">{value}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recomendaciones */}
      {data?.recommendations && (
        <div className={`relative border p-6 backdrop-blur-sm ${
          data?.risk_level === 'high'
            ? 'border-red-500/30 bg-red-900/10' 
            : data?.risk_level === 'medium'
            ? 'border-yellow-500/30 bg-yellow-900/10'
            : 'border-green-500/30 bg-green-900/10'
        }`} style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%)' }}>
          <div className={`absolute top-0 right-0 w-3 h-3 border-t border-r ${
            data?.risk_level === 'high' ? 'border-red-500' : data?.risk_level === 'medium' ? 'border-yellow-500' : 'border-green-500'
          }`}></div>
          <div className={`absolute bottom-0 left-0 w-3 h-3 border-b border-l ${
            data?.risk_level === 'high' ? 'border-red-500' : data?.risk_level === 'medium' ? 'border-yellow-500' : 'border-green-500'
          }`}></div>
          
          <h3 className="text-2xl font-bold text-white mb-4 uppercase tracking-wide font-mono flex items-center gap-2">
            // {t('recommendations')}
            {data?.risk_level === 'high' && <AlertTriangle className="w-8 h-8" />}
            {data?.risk_level === 'medium' && <Zap className="w-8 h-8" />}
            {data?.risk_level === 'low' && <CheckCircle className="w-8 h-8" />}
          </h3>
          
          <ul className="space-y-3">
            {data.recommendations.map((recommendation, index) => (
              <li key={index} className={`flex items-start gap-3 font-mono text-base leading-relaxed ${
                data?.risk_level === 'high' ? 'text-red-300' : data?.risk_level === 'medium' ? 'text-yellow-300' : 'text-green-300'
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
            className="relative border-2 border-cyan-400 bg-cyan-500/10 px-8 py-3 text-cyan-400 hover:bg-cyan-500/20 hover:shadow-[0_0_20px_rgba(0,255,255,0.3)] transition-all font-mono text-sm uppercase tracking-wide group flex items-center gap-2"
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
