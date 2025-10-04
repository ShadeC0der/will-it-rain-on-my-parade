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
        <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-500 uppercase tracking-tight mb-2"
            style={{ textShadow: '0 0 20px rgba(0, 255, 255, 0.3)' }}>
          {t('whereAreYou')}
        </h2>
        <div className="flex items-center justify-center gap-2 mt-4">
          <div className="h-px w-12 bg-cyan-400"></div>
          <p className="text-xs text-cyan-400 uppercase tracking-widest font-mono">
            Location Input
          </p>
          <div className="h-px w-12 bg-cyan-400"></div>
        </div>
      </div>

      <div className="space-y-6">
        {/* Coordinates Input */}
        <div className="relative border border-cyan-400/30 p-6 bg-gray-800/50 backdrop-blur-sm hover:border-cyan-400 transition-all"
             style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%)' }}>
          <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-cyan-400"></div>
          <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-cyan-400"></div>
          
          <div className="flex items-center gap-3 mb-4">
            <div className="text-3xl">📍</div>
            <h3 className="text-xl font-bold text-cyan-400 uppercase tracking-wide font-mono">
              {t('quickSearch')}
            </h3>
          </div>
          
          <input
            type="text"
            value={location}
            onChange={handleCoordinateInput}
            placeholder={t('coordinatesExample')}
            className={`w-full bg-gray-900/80 border rounded px-4 py-3 text-white text-lg font-mono placeholder-gray-500 focus:outline-none transition-all ${
              error 
                ? 'border-red-500/50 focus:border-red-500 focus:shadow-[0_0_10px_rgba(239,68,68,0.3)]' 
                : 'border-cyan-400/30 focus:border-cyan-400 focus:shadow-[0_0_10px_rgba(0,255,255,0.3)]'
            }`}
            pattern="^[-0-9., ]*$"
            title="Solo se permiten números, puntos, comas y signos negativos"
          />
          
          {error ? (
            <p className="mt-3 text-sm text-red-400 font-mono flex items-center gap-2">
              <span>❌</span> {error}
            </p>
          ) : (
            <p className="mt-3 text-sm text-gray-300 font-mono">
              {t('coordinatesFormat')}
            </p>
          )}
        </div>

        {/* Coordinates Display */}
        {coordinates && (
          <div className="border border-green-500/30 rounded p-4 bg-green-900/10">
            <div className="flex items-center gap-2 text-green-400 font-mono text-sm">
              <span className="text-lg">✓</span>
              <div>
                <div>{t('latitude')}: <span className="text-white font-bold">{coordinates.lat.toFixed(6)}</span></div>
                <div>{t('longitude')}: <span className="text-white font-bold">{coordinates.lng.toFixed(6)}</span></div>
              </div>
            </div>
          </div>
        )}

        {/* Map Section */}
        <div className="relative border border-pink-500/30 p-6 bg-gray-800/50 backdrop-blur-sm"
             style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%)' }}>
          <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-pink-500"></div>
          <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-pink-500"></div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-pink-400 font-mono text-sm uppercase tracking-wide">
                  // {t('interactiveMap')}
                </p>
                <p className="text-sm text-gray-300 font-mono mt-1">
                  {t('mapDescription')}
                </p>
              </div>
              <button
                onClick={() => setShowMap(!showMap)}
                className="text-xs text-pink-400 hover:text-pink-300 font-mono uppercase border border-pink-500/30 px-3 py-1 rounded hover:border-pink-500 transition-all"
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
                  <div className="w-24 h-24 border-2 border-pink-500/50 rounded-full flex items-center justify-center bg-gray-900/50 relative">
                    <span className="text-5xl">🌍</span>
                    <div className="absolute inset-0 border-2 border-pink-500/30 rounded-full animate-ping"></div>
                  </div>
                </div>
                <p className="text-sm text-gray-300 font-mono">
                  {t('mapInstructions')}
                </p>
              </div>
            )}
          </div>
        </div>

      </div>

      <div className="text-center">
        <p className="text-sm text-gray-300 font-mono">
          // {t('coordinatesSentToAPI')}
        </p>
      </div>
    </div>
  )
}

export default LocationSelector
