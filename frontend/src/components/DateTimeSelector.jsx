import { useState, useEffect } from 'react'
import { useLanguage } from '../context/LanguageContext'

function DateTimeSelector({ selectedDate, setSelectedDate, selectedHour, setSelectedHour }) {
  const { t } = useLanguage()
  
  // State para el selector de 12 horas
  const [hour12, setHour12] = useState('10')
  const [minutes, setMinutes] = useState('00')
  const [period, setPeriod] = useState('AM')
  
  // Convertir de 24h a 12h cuando selectedHour cambia
  useEffect(() => {
    if (selectedHour) {
      const [h, m] = selectedHour.split(':')
      const hour24 = parseInt(h)
      setMinutes(m)
      setPeriod(hour24 >= 12 ? 'PM' : 'AM')
      setHour12(String(hour24 % 12 || 12))
    }
  }, [selectedHour])
  
  // Convertir de 12h a 24h y actualizar
  const handleTimeChange = (newHour12, newMinutes, newPeriod) => {
    let hour24 = parseInt(newHour12)
    if (newPeriod === 'PM' && hour24 !== 12) hour24 += 12
    if (newPeriod === 'AM' && hour24 === 12) hour24 = 0
    setSelectedHour(`${String(hour24).padStart(2, '0')}:${newMinutes}`)
  }
  
  // Inicializar con un valor por defecto
  useEffect(() => {
    if (!selectedHour) {
      handleTimeChange(hour12, minutes, period)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  return (
    <div id="date-time-section" className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-500 uppercase tracking-tight mb-2"
            style={{ textShadow: '0 0 20px rgba(0, 255, 255, 0.3)' }}>
          {t('selectDateTime')}
        </h2>
        <div className="flex items-center justify-center gap-2 mt-4">
          <div className="h-px w-12 bg-cyan-400"></div>
          <p className="text-xs text-cyan-400 uppercase tracking-widest font-mono">
            {t('dateTimeText')}
          </p>
          <div className="h-px w-12 bg-cyan-400"></div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Date Picker */}
        <div className="relative border border-cyan-400/30 p-6 bg-gray-800/50 backdrop-blur-sm hover:border-cyan-400 transition-all group"
             style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%)' }}>
          <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-cyan-400"></div>
          <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-cyan-400"></div>
          
          <div className="flex items-center gap-3 mb-4">
            <div className="text-3xl">📅</div>
            <h3 className="text-xl font-bold text-cyan-400 uppercase tracking-wide font-mono">
              {t('defineDate')}
            </h3>
          </div>
          
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full bg-gray-900/80 border border-cyan-400/30 rounded px-4 py-3 text-white text-lg font-mono focus:border-cyan-400 focus:outline-none focus:shadow-[0_0_10px_rgba(0,255,255,0.3)] transition-all"
          />
          
          {selectedDate && (
            <div className="mt-3 text-base text-cyan-300 font-mono">
              ✓ {new Date(selectedDate + 'T00:00:00').toLocaleDateString('es-ES', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </div>
          )}
        </div>

        {/* Time Picker */}
        <div className="relative border border-pink-500/30 p-6 bg-gray-800/50 backdrop-blur-sm hover:border-pink-500 transition-all group"
             style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%)' }}>
          <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-pink-500"></div>
          <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-pink-500"></div>
          
          <div className="flex items-center gap-3 mb-4">
            <div className="text-3xl">⏰</div>
            <h3 className="text-xl font-bold text-pink-500 uppercase tracking-wide font-mono">
              {t('defineTime')}
            </h3>
          </div>
          
          <div className="flex items-center gap-3 justify-center">
            {/* Hour selector */}
            <select
              value={hour12}
              onChange={(e) => {
                setHour12(e.target.value)
                handleTimeChange(e.target.value, minutes, period)
              }}
              className="bg-gray-900/80 border border-pink-500/30 rounded px-6 py-4 text-white text-2xl font-mono focus:border-pink-500 focus:outline-none focus:shadow-[0_0_10px_rgba(255,0,255,0.3)] transition-all cursor-pointer"
            >
              {[...Array(12)].map((_, i) => {
                const h = i + 1
                return <option key={h} value={h}>{String(h).padStart(2, '0')}</option>
              })}
            </select>
            
            <span className="text-3xl text-pink-400 font-mono">:</span>
            
            {/* Minutes selector */}
            <select
              value={minutes}
              onChange={(e) => {
                setMinutes(e.target.value)
                handleTimeChange(hour12, e.target.value, period)
              }}
              className="bg-gray-900/80 border border-pink-500/30 rounded px-6 py-4 text-white text-2xl font-mono focus:border-pink-500 focus:outline-none focus:shadow-[0_0_10px_rgba(255,0,255,0.3)] transition-all cursor-pointer"
            >
              {['00', '05', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55'].map(min => (
                <option key={min} value={min}>{min}</option>
              ))}
            </select>
            
            {/* AM/PM selector */}
            <select
              value={period}
              onChange={(e) => {
                setPeriod(e.target.value)
                handleTimeChange(hour12, minutes, e.target.value)
              }}
              className="bg-gray-900/80 border border-pink-500/30 rounded px-6 py-4 text-white text-2xl font-mono focus:border-pink-500 focus:outline-none focus:shadow-[0_0_10px_rgba(255,0,255,0.3)] transition-all cursor-pointer"
            >
              <option value="AM">AM</option>
              <option value="PM">PM</option>
            </select>
          </div>
          
          {selectedHour && (
            <div className="mt-4 text-center text-pink-300 font-mono text-base">
              <span className="text-lg">✓</span> Hora seleccionada: <span className="text-white font-bold text-xl">{hour12}:{minutes} {period}</span>
            </div>
          )}
        </div>
      </div>

      {/* Info message */}
      {selectedDate && selectedHour && (
        <div className="border border-purple-500/30 rounded p-4 bg-purple-900/10 text-center">
          <p className="text-purple-300 font-mono text-base">
            <span className="text-lg mr-2">✨</span>
            Consulta programada para: <span className="text-white font-bold">{selectedDate}</span> a las <span className="text-white font-bold">{hour12}:{minutes} {period}</span>
          </p>
        </div>
      )}

      <div className="text-center">
        <p className="text-sm text-cyan-300 uppercase tracking-widest font-mono animate-pulse">
          {t('scroll')}
        </p>
      </div>
    </div>
  )
}

export default DateTimeSelector
