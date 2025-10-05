/**
 * Will It Rain On My Parade? - Frontend
 * 
 * Aplicación principal que orquesta todos los componentes para predecir
 * condiciones climáticas adversas usando datos satelitales.
 * 
 * Estado actual: ✅ Frontend completo | ⏳ Esperando backend
 */

import { useState, useEffect, useRef } from 'react'
import Lenis from 'lenis'
import { useLanguage } from './context/LanguageContext'
import { submitWeatherQuery } from './services/api'
import { saveToHistory } from './services/historyManager'
import IntroSection from './components/IntroSection'
import CategoriesSection from './components/CategoriesSection'
import DateTimeSelector from './components/DateTimeSelector'
import LocationSelector from './components/LocationSelector'
import ResultsPanel from './components/ResultsPanel'
import ScrollToTopButton from './components/ScrollToTopButton'
import FontSizeControl from './components/FontSizeControl'
import ProjectInfo from './components/ProjectInfo'
import Footer from './components/Footer'
import ThemeToggle from './components/ThemeToggle'

function App() {
  const { language, toggleLanguage, t } = useLanguage()
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedHour, setSelectedHour] = useState('')
  const [location, setLocation] = useState('')
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)
  
  const introRef = useRef(null)
  const categoriesRef = useRef(null)
  const dateTimeRef = useRef(null)
  const locationRef = useRef(null)
  const submitRef = useRef(null)
  const resultsRef = useRef(null)
  const autoScrollDoneRef = useRef(false)

  useEffect(() => {
    // Configurar Lenis con scroll suave cinematográfico
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
      smoothTouch: false,
      touchMultiplier: 2,
    })

    let rafId
    function raf(time) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = (scrollTop / docHeight) * 100
      setScrollProgress(progress)
    }

    lenis.on('scroll', handleScroll)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
    }
  }, [])

  // Intersection Observer para animaciones cinematográficas variadas
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '-50px'
    }

    // Diferentes animaciones para cada sección
    const animations = [
      { ref: introRef, initial: 'translateY(60px) scale(0.95)', final: 'translateY(0) scale(1)', delay: '0s' },
      { ref: categoriesRef, initial: 'translateX(-80px) rotateY(-8deg)', final: 'translateX(0) rotateY(0deg)', delay: '0.1s' },
      { ref: dateTimeRef, initial: 'translateX(80px) rotateY(8deg)', final: 'translateX(0) rotateY(0deg)', delay: '0.1s' },
      { ref: locationRef, initial: 'translateX(-80px) translateY(30px)', final: 'translateX(0) translateY(0)', delay: '0.1s' },
      { ref: submitRef, initial: 'translateY(50px) scale(0.9)', final: 'translateY(0) scale(1)', delay: '0.15s' },
      { ref: resultsRef, initial: 'translateY(60px) scale(0.92)', final: 'translateY(0) scale(1)', delay: '0.2s' }
    ]

    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Aparece cuando entra al viewport
          entry.target.style.opacity = '1'
          entry.target.style.transform = entry.target.dataset.finalTransform
        } else {
          // Se oculta cuando sale del viewport (funciona en ambas direcciones)
          entry.target.style.opacity = '0'
          entry.target.style.transform = entry.target.dataset.initialTransform
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)

    animations.forEach(({ ref, initial, final, delay }) => {
      if (ref.current) {
        // Set initial state
        ref.current.style.opacity = '0'
        ref.current.style.transform = initial
        ref.current.style.transition = `opacity 1s cubic-bezier(0.16, 1, 0.3, 1) ${delay}, transform 1s cubic-bezier(0.16, 1, 0.3, 1) ${delay}`
        ref.current.style.perspective = '1000px'
        ref.current.dataset.initialTransform = initial
        ref.current.dataset.finalTransform = final
        observer.observe(ref.current)
      }
    })

    return () => {
      animations.forEach(({ ref }) => {
        if (ref.current) {
          observer.unobserve(ref.current)
        }
      })
    }
  }, [selectedDate, selectedHour, location])

  const handleSubmitQuery = async () => {
    if (!selectedDate || !selectedHour || !location) {
      alert(t('pleaseCompleteAllFields'))
      return
    }

    setIsSubmitting(true)
    setError(null)

    try {
      const queryData = {
        location: location,
        date: selectedDate,
        time: selectedHour
      }

      console.log('═══════════════════════════════════════')
      console.log('📤 Enviando consulta...')
      console.log('📍 Ubicación:', queryData.location)
      console.log('📅 Fecha:', queryData.date)
      console.log('⏰ Hora:', queryData.time)
      console.log('═══════════════════════════════════════')

  const response = await submitWeatherQuery(queryData)
  console.log('✅ Respuesta recibida (normalizada) ->', response)
  setResult(response)
  autoScrollDoneRef.current = false // permitir scroll nuevamente
      
      // Guardar en historial
      saveToHistory(queryData, response)
    } catch (err) {
      console.error('❌ Error en la consulta:', err.message)
      
      setError(err.message)
      // No mostrar alert automáticamente - el error ya se muestra en la UI
    } finally {
      setIsSubmitting(false)
    }
  }

  // Autoscroll suave hacia panel de resultados cuando llegan los datos
  useEffect(() => {
    if (result && resultsRef.current && !autoScrollDoneRef.current) {
      // pequeño delay para asegurar layout
      setTimeout(() => {
        resultsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
        autoScrollDoneRef.current = true
      }, 150)
    }
  }, [result])

  // Debug: loggear cambios de error
  useEffect(() => {
    if (error) {
      console.log('🚫 Error actualizado:', error)
    }
  }, [error])

  return (
    <div className="bg-orange-50 dark:bg-gray-900 text-gray-900 dark:text-white relative overflow-hidden transition-colors duration-300">
      
      {/* Controls Bar - Top Right */}
      <div className="fixed top-4 right-4 z-50 flex gap-3">
        {/* Theme Toggle */}
        <ThemeToggle />
        
        {/* Font Size Control */}
        <FontSizeControl />
        
        {/* Language Toggle Button */}
        <button
          onClick={toggleLanguage}
          className="px-4 py-2 border-2 border-amber-500 dark:border-cyan-400 bg-amber-100 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg text-amber-700 dark:text-cyan-400 font-mono text-sm hover:bg-amber-200 dark:hover:bg-cyan-400/20 hover:shadow-lg dark:hover:shadow-[0_0_15px_rgba(0,255,255,0.4)] transition-all uppercase font-bold"
        >
          {language === 'es' ? 'EN' : 'ES'}
        </button>
      </div>

      {/* Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-0.5 bg-orange-200 dark:bg-gray-800 z-50">
        <div 
          className="h-full bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 dark:from-cyan-400 dark:via-purple-500 dark:to-pink-500 shadow-lg dark:shadow-[0_0_10px_rgba(0,255,255,0.8)]"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Animated gradient overlay */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-5 dark:opacity-10"
        style={{
          background: `radial-gradient(circle at 50% ${scrollProgress}%, rgba(251, 146, 60, 0.2) 0%, transparent 70%)`
        }}
      />

      {/* Decorative elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Decorative shapes */}
        <div className="absolute top-20 left-10 w-64 h-64 border-2 border-orange-300/20 dark:border-cyan-400/20" 
             style={{ transform: `rotate(${scrollProgress * 0.5}deg)` }}>
          <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-orange-400/50 dark:via-cyan-400/50 to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-red-400/50 dark:via-pink-500/50 to-transparent"></div>
        </div>
        
        {/* Weather icons - Cloud */}
        <div className="absolute top-40 right-20 opacity-30" style={{ transform: `translateY(${scrollProgress * 0.3}px)` }}>
          <svg width="120" height="80" viewBox="0 0 100 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 40C20 31.7157 26.7157 25 35 25C38.3551 25 41.4816 26.0447 44.0615 27.8293C46.2793 21.3211 52.3211 16.6667 59.4444 16.6667C68.5294 16.6667 75.8889 24.0262 75.8889 33.1111C75.8889 33.7778 75.8444 34.4333 75.7578 35.0756C81.0222 36.4 85 41.2 85 47C85 53.6274 79.6274 59 73 59H27C22.5817 59 19 55.4183 19 51C19 46.5817 22.5817 43 27 43H27.5C27.1667 41.7 27 40.3667 27 39" 
                  stroke="#00ffff" strokeWidth="2" opacity="0.4"/>
          </svg>
        </div>

        {/* Data nodes */}
        <div className="absolute bottom-40 left-1/4 w-32 h-32">
          <div className="absolute top-0 left-0 w-3 h-3 bg-cyan-400 rounded-full animate-pulse shadow-[0_0_10px_rgba(0,255,255,0.8)]"></div>
          <div className="absolute top-0 right-0 w-3 h-3 bg-pink-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(255,0,255,0.8)]" style={{ animationDelay: '0.5s' }}></div>
          <div className="absolute bottom-0 left-0 w-3 h-3 bg-purple-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(157,0,255,0.8)]" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-0 right-0 w-3 h-3 bg-cyan-400 rounded-full animate-pulse shadow-[0_0_10px_rgba(0,255,255,0.8)]" style={{ animationDelay: '1.5s' }}></div>
          <svg className="absolute inset-0" width="128" height="128">
            <line x1="6" y1="6" x2="122" y2="6" stroke="rgba(0,255,255,0.4)" strokeWidth="1.5"/>
            <line x1="122" y1="6" x2="122" y2="122" stroke="rgba(255,0,255,0.4)" strokeWidth="1.5"/>
            <line x1="122" y1="122" x2="6" y2="122" stroke="rgba(168,85,247,0.4)" strokeWidth="1.5"/>
            <line x1="6" y1="122" x2="6" y2="6" stroke="rgba(0,255,255,0.4)" strokeWidth="1.5"/>
          </svg>
        </div>

        {/* Satellite icon */}
        <div className="absolute top-1/3 right-1/4 opacity-30" style={{ transform: `rotate(${scrollProgress * -0.2}deg)` }}>
          <svg width="100" height="100" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="30" y="30" width="20" height="20" stroke="#00ffff" strokeWidth="2.5"/>
            <line x1="40" y1="20" x2="40" y2="30" stroke="#ff00ff" strokeWidth="2.5"/>
            <line x1="40" y1="50" x2="40" y2="60" stroke="#ff00ff" strokeWidth="2.5"/>
            <line x1="20" y1="40" x2="30" y2="40" stroke="#00ffff" strokeWidth="2.5"/>
            <line x1="50" y1="40" x2="60" y2="40" stroke="#00ffff" strokeWidth="2.5"/>
            <circle cx="40" cy="40" r="4" fill="#9d00ff"/>
          </svg>
        </div>

        {/* Additional hexagons */}
        <div className="absolute bottom-20 right-10 opacity-20">
          <svg width="150" height="150" viewBox="0 0 100 100" fill="none">
            <polygon points="50,5 90,25 90,75 50,95 10,75 10,25" stroke="#ff00ff" strokeWidth="2" opacity="0.5"/>
            <polygon points="50,15 80,30 80,70 50,85 20,70 20,30" stroke="#00ffff" strokeWidth="1.5" opacity="0.3"/>
          </svg>
        </div>
      </div>
      
      {/* Main Content - Single Page with Scroll */}
      <section className="p-8 relative z-10">
        <div className="max-w-6xl mx-auto space-y-16 py-16">
          
          {/* Intro */}
          <div ref={introRef}>
            <IntroSection />
          </div>

          {/* Categories */}
          <div ref={categoriesRef}>
            <CategoriesSection />
          </div>

          {/* Date & Time */}
          <div ref={dateTimeRef}>
            <DateTimeSelector 
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              selectedHour={selectedHour}
              setSelectedHour={setSelectedHour}
            />
          </div>

          {/* Location */}
          <div ref={locationRef}>
            <LocationSelector 
              location={location}
              setLocation={setLocation}
            />
          </div>

          {/* Submit Button Section */}
          <div ref={submitRef} className="space-y-8">
            {selectedDate && selectedHour && location && (
              <>
                {/* Summary Card */}
                <div className="relative border-2 border-purple-300 dark:border-purple-500/30 p-8 bg-white dark:bg-gray-800/50 shadow-lg dark:shadow-none backdrop-blur-sm"
                     style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%)' }}>
                  <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-purple-500 dark:border-purple-500"></div>
                  <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-purple-500 dark:border-purple-500"></div>
                  
                  <h3 className="text-2xl font-bold text-purple-700 dark:text-purple-400 mb-6 uppercase tracking-wide font-mono">
                    // {t('querySummary')}
                  </h3>
                  
                  <div className="space-y-4 font-mono">
                    <div className="flex items-center gap-3">
                      <span className="text-orange-700 dark:text-cyan-400">📅 {t('date')}:</span>
                      <span className="text-gray-900 dark:text-white font-bold">{selectedDate}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-red-700 dark:text-pink-500">⏰ {t('time')}:</span>
                      <span className="text-gray-900 dark:text-white font-bold">{selectedHour}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-purple-700 dark:text-purple-400">📍 {t('location')}:</span>
                      <span className="text-gray-900 dark:text-white font-bold">{location}</span>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Submit Button - Siempre visible */}
            <button
              onClick={handleSubmitQuery}
              disabled={isSubmitting || !selectedDate || !selectedHour || !location}
              className="w-full relative border-2 border-orange-500 dark:border-cyan-400 bg-gradient-to-r from-orange-200 to-red-200 dark:from-cyan-500/20 dark:to-pink-500/20 py-6 text-orange-800 dark:text-cyan-400 hover:from-orange-300 hover:to-red-300 dark:hover:from-cyan-500/30 dark:hover:to-pink-500/30 hover:shadow-xl dark:hover:shadow-[0_0_30px_rgba(0,255,255,0.5)] transition-all font-mono text-2xl uppercase tracking-wide disabled:opacity-50 disabled:cursor-not-allowed font-bold"
              style={{ clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 0 100%)' }}
            >
              {isSubmitting ? (
                <>
                  <span className="mr-3">⏳</span>
                  {t('sendingQuery')}
                </>
              ) : !selectedDate || !selectedHour || !location ? (
                <>
                  <span className="mr-3">⚠️</span>
                  {t('completeAllFields')}
                </>
              ) : (
                <>
                  <span className="mr-3">🚀</span>
                  {t('submitQuery')}
                </>
              )}
            </button>
          </div>

          {/* Results Panel */}
          <div ref={resultsRef}>
            <ResultsPanel 
              result={result}
              isLoading={isSubmitting}
              error={error}
            />
          </div>

        </div>
      </section>

      {/* Project Info Section */}
      <ProjectInfo />

      {/* Footer */}
      <Footer />

      {/* Botón flotante para volver arriba */}
      <ScrollToTopButton />

    </div>
  )
}

export default App
