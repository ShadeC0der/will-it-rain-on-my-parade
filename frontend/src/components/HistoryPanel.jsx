import { useState, useEffect } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { 
  getHistory, 
  deleteHistoryItem, 
  clearHistory, 
  downloadQueryAsJSON,
  downloadAllHistoryAsJSON 
} from '../services/historyManager'
import { 
  ClipboardList, 
  Download, 
  Trash2, 
  Eye, 
  AlertTriangle, 
  Zap, 
  CheckCircle,
  MapPin,
  Clock,
  Calendar,
  ChevronDown,
  ChevronRight
} from 'lucide-react'

function HistoryPanel({ onSelectHistory }) {
  const { t } = useLanguage()
  const [history, setHistory] = useState([])
  const [isExpanded, setIsExpanded] = useState(false)

  // Cargar historial al montar y actualizar cada vez que cambie
  useEffect(() => {
    loadHistory()
    
    // Listener para actualizaciones del localStorage
    const handleStorageChange = () => {
      loadHistory()
    }
    
    window.addEventListener('storage', handleStorageChange)
    
    // También actualizar periódicamente por si cambia en la misma pestaña
    const interval = setInterval(loadHistory, 1000)
    
    return () => {
      window.removeEventListener('storage', handleStorageChange)
      clearInterval(interval)
    }
  }, [])

  const loadHistory = () => {
    const loadedHistory = getHistory()
    setHistory(loadedHistory)
  }

  const handleDelete = (id, e) => {
    e.stopPropagation() // Evitar que se seleccione al eliminar
    deleteHistoryItem(id)
    loadHistory()
  }

  const handleClearAll = () => {
    if (confirm(t('historyConfirmClear'))) {
      clearHistory()
      loadHistory()
    }
  }

  const handleDownload = (item, e) => {
    e.stopPropagation()
    downloadQueryAsJSON(item)
  }

  const handleDownloadAll = () => {
    downloadAllHistoryAsJSON()
  }

  const getRiskColor = (risk_level) => {
    switch (risk_level) {
      case 'high':
        return 'text-red-400 border-red-500/50'
      case 'medium':
        return 'text-yellow-400 border-yellow-500/50'
      case 'low':
        return 'text-green-400 border-green-500/50'
      default:
        return 'text-gray-400 border-gray-500/50'
    }
  }

  const getRiskIcon = (risk_level) => {
    const iconClass = "w-5 h-5"
    switch (risk_level) {
      case 'high':
        return <AlertTriangle className={iconClass} />
      case 'medium':
        return <Zap className={iconClass} />
      case 'low':
        return <CheckCircle className={iconClass} />
      default:
        return <AlertTriangle className={iconClass} />
    }
  }

  const formatDateTime = (isoString) => {
    const date = new Date(isoString)
    return date.toLocaleString('es-AR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="relative border-2 border-orange-300 dark:border-cyan-500/30 bg-white dark:bg-gray-900/80 shadow-lg dark:shadow-none backdrop-blur-sm"
         style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%)' }}>
      <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-orange-500 dark:border-cyan-500"></div>
      <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-orange-500 dark:border-cyan-500"></div>

      {/* Header */}
      <div className="p-4 border-b-2 border-orange-300 dark:border-cyan-500/30">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <ClipboardList className="w-6 h-6 text-orange-600 dark:text-cyan-400" />
            <h3 className="text-lg font-bold text-orange-700 dark:text-cyan-400 uppercase tracking-wide font-mono">
              {t('historyTitle')}
            </h3>
            <span className="text-sm text-gray-700 dark:text-gray-300 font-mono font-semibold">
              ({history.length}/10)
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            {history.length > 0 && (
              <>
                <button
                  onClick={handleDownloadAll}
                  className="px-3 py-1 text-xs bg-orange-100 dark:bg-cyan-500/20 hover:bg-orange-200 dark:hover:bg-cyan-500/30 text-orange-700 dark:text-cyan-400 border-2 border-orange-400 dark:border-cyan-500/50 rounded font-mono transition-all flex items-center gap-1"
                  title={t('historyDownloadAll')}
                >
                  <Download className="w-3 h-3" />
                  {t('historyDownloadAll')}
                </button>
                <button
                  onClick={handleClearAll}
                  className="px-3 py-1 text-xs bg-red-100 dark:bg-red-500/20 hover:bg-red-200 dark:hover:bg-red-500/30 text-red-700 dark:text-red-400 border-2 border-red-500 dark:border-red-500/50 rounded font-mono transition-all flex items-center gap-1"
                  title={t('historyClear')}
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </>
            )}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="px-3 py-1 text-xs bg-orange-100 dark:bg-cyan-500/20 hover:bg-orange-200 dark:hover:bg-cyan-500/30 text-orange-700 dark:text-cyan-400 border-2 border-orange-400 dark:border-cyan-500/50 rounded font-mono transition-all flex items-center"
            >
              {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            </button>
          </div>
        </div>
        
        {history.length > 0 && isExpanded && (
          <p className="text-sm text-gray-700 dark:text-gray-300 font-mono italic">
            💡 {t('historyClickTip')}
          </p>
        )}
      </div>

      {/* Lista de consultas */}
      {isExpanded && (
        <div className="max-h-96 overflow-y-auto">
          {history.length === 0 ? (
            <div className="p-8 text-center">
              <span className="text-4xl block mb-2 opacity-50">📭</span>
              <p className="text-gray-700 dark:text-gray-300 font-mono text-base font-semibold">
                {t('historyEmpty')}
              </p>
            </div>
          ) : (
            <div className="divide-y divide-orange-300 dark:divide-cyan-500/10">
              {history.map((item) => (
                <div
                  key={item.id}
                  onClick={() => onSelectHistory(item)}
                  className="p-4 hover:bg-orange-50 dark:hover:bg-cyan-500/10 hover:border-l-4 hover:border-l-orange-500 dark:hover:border-l-cyan-400 hover:shadow-lg dark:hover:shadow-cyan-500/20 cursor-pointer transition-all group relative"
                >
                  {/* Indicador de clickeable */}
                  <div className="absolute top-4 right-4 transition-all">
                    <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-orange-600 dark:group-hover:text-cyan-400 font-mono group-hover:scale-110 inline-flex items-center gap-1 transition-all font-semibold">
                      <Eye className="w-4 h-4" />
                      <span className="opacity-0 group-hover:opacity-100">{t('historyView')}</span>
                    </span>
                  </div>
                  
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0 pr-12">
                      {/* Condición y riesgo */}
                      <div className="flex items-center gap-2 mb-2">
                        {getRiskIcon(item.summary.risk_level)}
                        <span className={`text-base font-bold font-mono uppercase ${getRiskColor(item.summary.risk_level)}`}>
                          {item.summary.condition}
                        </span>
                      </div>
                      
                      {/* Ubicación */}
                      <div className="text-sm text-gray-700 dark:text-gray-300 font-mono mb-1 break-words flex items-center gap-1">
                        <MapPin className="w-4 h-4 flex-shrink-0" />
                        {item.summary.location_name}
                      </div>
                      
                      {/* Fecha de consulta */}
                      <div className="text-sm text-gray-600 dark:text-gray-400 font-mono flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {formatDateTime(item.timestamp)}
                      </div>
                      
                      {/* Fecha del evento */}
                      <div className="text-sm text-orange-700 dark:text-cyan-400 font-mono mt-1 flex items-center gap-1 font-semibold">
                        <Calendar className="w-4 h-4" />
                        {t('historyEvent')}: {item.query.date} {t('historyAt')} {item.query.time}
                      </div>
                    </div>
                    
                    {/* Botones de acción */}
                    <div className="flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity absolute bottom-4 right-4">
                      <button
                        onClick={(e) => handleDownload(item, e)}
                        className="px-2 py-1 text-xs bg-orange-100 dark:bg-cyan-500/20 hover:bg-orange-200 dark:hover:bg-cyan-500/40 text-orange-700 dark:text-cyan-400 border-2 border-orange-400 dark:border-cyan-500/50 rounded font-mono hover:scale-110 transition-all shadow-sm dark:shadow-none"
                        title="JSON"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                      <button
                        onClick={(e) => handleDelete(item.id, e)}
                        className="px-2 py-1 text-xs bg-red-100 dark:bg-red-500/20 hover:bg-red-200 dark:hover:bg-red-500/40 text-red-700 dark:text-red-400 border-2 border-red-500 dark:border-red-500/50 rounded font-mono hover:scale-110 transition-all shadow-sm dark:shadow-none"
                        title={t('historyClear')}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default HistoryPanel
