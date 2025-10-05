import { useState } from 'react'
import { useLanguage } from '../context/LanguageContext'
import MapComponent from './MapComponent'

function LocationSelector({ location, setLocation }) {
  const { t, language } = useLanguage()
  const [coordinates, setCoordinates] = useState(null)
  const [showMap, setShowMap] = useState(false)
  const [error, setError] = useState('')

  const handleMapLocationSelect = (coords) => {
    setCoordinates(coords)
    setLocation(`${coords.lat.toFixed(4)}, ${coords.lng.toFixed(4)}`)
  }

  const handleCoordinateInput = (e) => {
    const value = e.target.value
    // Solo permite números, puntos, comas, espacios y signo negativo
    const regex = /^[-0-9., ]*$/
    
    if (regex.test(value)) {
      setLocation(value)
      setError('')
      setCoordinates(null)
      
      // Si el valor está vacío, no validar
      if (!value.trim()) {
        return
      }
      
      // Validar formato: debe tener exactamente una coma
      const commaCount = (value.match(/,/g) || []).length
      
      if (commaCount === 0 && value.trim().length > 0) {
        setError('Formato inválido. Debe incluir una coma entre latitud y longitud')
        return
      }
      
      if (commaCount > 1) {
        setError('Formato inválido. Solo debe haber una coma')
        return
      }
      
      // Intentar parsear coordenadas si el formato es válido
      const parts = value.split(',')
      if (parts.length === 2) {
        const latStr = parts[0].trim()
        const lngStr = parts[1].trim()
        
        // Validar que ambas partes no estén vacías
        if (!latStr || !lngStr) {
          setError('Ingresa ambas coordenadas: latitud, longitud')
          return
        }
        
        const lat = parseFloat(latStr)
        const lng = parseFloat(lngStr)
        
        // Validar que sean números
        if (isNaN(lat) || isNaN(lng)) {
          setError('Las coordenadas deben ser números válidos')
          return
        }
        
        // Validar rangos de coordenadas
        if (lat < -90 || lat > 90) {
          setError('Latitud debe estar entre -90 y 90')
          return
        }
        
        if (lng < -180 || lng > 180) {
          setError('Longitud debe estar entre -180 y 180')
          return
        }
        
        // Si todo es válido, actualizar coordenadas
        setCoordinates({ lat, lng })
        setError('')
      }
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-700 to-red-700 dark:from-cyan-400 dark:to-pink-500 uppercase tracking-tight mb-2 drop-shadow-md"
            style={{ textShadow: '0 0 20px rgba(251, 146, 60, 0.2)' }}>
          {t('whereAreYou')}
        </h2>
        <div className="flex items-center justify-center gap-2 mt-4">
          <div className="h-px w-12 bg-orange-500 dark:bg-cyan-400"></div>
          <p className="text-xs text-orange-700 dark:text-cyan-400 uppercase tracking-widest font-mono">
            Location Input
          </p>
          <div className="h-px w-12 bg-orange-500 dark:bg-cyan-400"></div>
        </div>
      </div>

      <div className="space-y-6">
        {/* Coordinates Input */}
        <div className="relative border-2 border-orange-300 dark:border-cyan-400/30 p-6 bg-white dark:bg-gray-800/50 shadow-lg dark:shadow-none backdrop-blur-sm hover:border-orange-500 dark:hover:border-cyan-400 hover:shadow-xl transition-all"
             style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%)' }}>
          <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-orange-500 dark:border-cyan-400"></div>
          <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-orange-500 dark:border-cyan-400"></div>
          
          <div className="flex items-center gap-3 mb-4">
            <div className="text-3xl">📍</div>
            <h3 className="text-xl font-bold text-orange-700 dark:text-cyan-400 uppercase tracking-wide font-mono">
              {t('quickSearch')}
            </h3>
          </div>
          
          <input
            type="text"
            value={location}
            onChange={handleCoordinateInput}
            placeholder={t('coordinatesExample')}
            className={`w-full bg-orange-50 dark:bg-gray-900/80 border-2 rounded px-4 py-3 text-gray-900 dark:text-white text-lg font-mono placeholder-gray-500 dark:placeholder-gray-500 focus:outline-none transition-all ${
              error 
                ? 'border-red-500 focus:border-red-600 focus:shadow-lg dark:focus:shadow-[0_0_10px_rgba(239,68,68,0.3)]' 
                : 'border-orange-300 dark:border-cyan-400/30 focus:border-orange-500 dark:focus:border-cyan-400 focus:shadow-lg dark:focus:shadow-[0_0_10px_rgba(0,255,255,0.3)]'
            }`}
            pattern="^[-0-9., ]*$"
            title="Solo se permiten números, puntos, comas y signos negativos"
          />
          
          {error ? (
            <p className="mt-3 text-sm text-red-600 dark:text-red-400 font-mono flex items-center gap-2 font-semibold">
              <span>❌</span> {error}
            </p>
          ) : (
            <p className="mt-3 text-sm text-gray-600 dark:text-gray-300 font-mono">
              {t('coordinatesFormat')}
            </p>
          )}
        </div>

        {/* Coordinates Display */}
        {coordinates && (
          <div className="border-2 border-green-500 dark:border-green-500/30 rounded p-4 bg-green-100 dark:bg-green-900/10 shadow-md dark:shadow-none">
            <div className="flex items-center gap-2 text-green-700 dark:text-green-400 font-mono text-sm font-semibold">
              <span className="text-lg">✓</span>
              <div>
                <div>{t('latitude')}: <span className="text-gray-900 dark:text-white font-bold">{coordinates.lat.toFixed(6)}</span></div>
                <div>{t('longitude')}: <span className="text-gray-900 dark:text-white font-bold">{coordinates.lng.toFixed(6)}</span></div>
              </div>
            </div>
          </div>
        )}

        {/* Map Section */}
        <div className="relative border-2 border-amber-300 dark:border-pink-500/30 p-6 bg-white dark:bg-gray-800/50 shadow-lg dark:shadow-none backdrop-blur-sm"
             style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%)' }}>
          <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-amber-500 dark:border-pink-500"></div>
          <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-amber-500 dark:border-pink-500"></div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-amber-700 dark:text-pink-400 font-mono text-sm uppercase tracking-wide font-semibold">
                  // {t('interactiveMap')}
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-300 font-mono mt-1">
                  {t('mapDescription')}
                </p>
              </div>
              <button
                onClick={() => setShowMap(!showMap)}
                className="text-xs text-amber-700 dark:text-pink-400 hover:text-amber-800 dark:hover:text-pink-300 font-mono uppercase border-2 border-amber-400 dark:border-pink-500/30 px-3 py-1 rounded hover:border-amber-600 dark:hover:border-pink-500 transition-all"
              >
                {showMap ? (language === 'es' ? 'Ocultar Mapa' : 'Hide Map') : (language === 'es' ? 'Mostrar Mapa' : 'Show Map')}
              </button>
            </div>

            {showMap ? (
              <MapComponent 
                coordinates={coordinates} 
                onLocationSelect={handleMapLocationSelect}
              />
            ) : (
              <div className="text-center space-y-4 py-8">
                <div className="flex justify-center">
                  <div className="w-24 h-24 border-2 border-amber-400 dark:border-pink-500/50 rounded-full flex items-center justify-center bg-orange-100 dark:bg-gray-900/50 relative">
                    <span className="text-5xl">🌍</span>
                    <div className="absolute inset-0 border-2 border-amber-300 dark:border-pink-500/30 rounded-full animate-ping"></div>
                  </div>
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300 font-mono">
                  {t('mapInstructions')}
                </p>
              </div>
            )}
          </div>
        </div>

      </div>

      <div className="text-center">
        <p className="text-sm text-gray-700 dark:text-gray-300 font-mono">
          // {t('coordinatesSentToAPI')}
        </p>
      </div>
    </div>
  )
}

export default LocationSelector
