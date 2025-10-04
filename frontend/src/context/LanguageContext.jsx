import { createContext, useContext, useState } from 'react'

const translations = {
  es: {
    title: 'Will It Rain On My Parade?',
    subtitle: 'Sistema de Predicción Climática',
    problem: 'PROBLEMA',
    solution: 'SOLUCIÓN',
    problemText: 'Planificar eventos sin datos climáticos precisos',
    problemDetail: '> ¿Temperatura extrema? ¿Viento fuerte? ¿Condiciones adversas?',
    solutionText: 'Análisis de datos satelitales (NASA + Open Data) para predecir',
    solutionDetail: 'probabilidades de condiciones adversas',
    scroll: '↓ CONTINUAR ↓',
    detectionMatrix: 'Matriz de Detección',
    conditionCategories: 'Categorías de Condiciones',
    hot: 'Calurosas',
    cold: 'Frías',
    wind: 'Ventosas',
    humid: 'Húmedas',
    bad: 'Incómodas',
    nasa: 'Fuente de Datos',
    defineDate: 'Define una Fecha',
    defineTime: 'Define una Hora',
    selectDateTime: '📅 Selecciona Fecha y Hora',
    dateTimeText: 'Primero definamos una fecha que quieras consultar',
    whereAreYou: '📍 ¿Dónde estás?',
    quickSearch: 'Búsqueda Rápida de Coordenadas',
    enterLocation: 'Ingresa tu ubicación',
    coordinatesFormat: '// Formato: latitud, longitud (separados por coma)',
    coordinatesExample: 'Ej: -34.6037, -58.3816',
    interactiveMap: 'Mapa Interactivo',
    mapDescription: 'Busca tu ciudad y haz click para seleccionar',
    mapInstructions: 'Navega por el mapa, busca tu ciudad y haz click para obtener coordenadas',
    confirmLocation: 'Confirmar Ubicación',
    latitude: 'Latitud',
    longitude: 'Longitud',
    analyzingData: 'Analizando Datos...',
    consultingNasa: 'Consultando NASA API',
    processingQuery: 'Procesando consulta...',
    error: 'Error',
    results: 'Resultados',
    waitingQuery: 'Esperando consulta',
    resultsWillAppear: 'Los resultados aparecerán aquí después de enviar la consulta',
    weatherPrediction: 'Predicción Climática',
    recommendation: 'Recomendación',
    recommendations: 'Recomendaciones',
    analyzingConditions: 'Analizando condiciones...',
    weatherData: 'Datos Meteorológicos',
    nasaData: 'Datos NASA',
    temperature: 'Temperatura',
    humidity: 'Humedad',
    wind: 'Viento',
    pressure: 'Presión',
    historyTitle: 'Historial de Consultas',
    historyClickTip: 'Haz click en cualquier registro para ver sus resultados',
    historyEmpty: 'No hay consultas en el historial',
    historyView: 'Ver',
    historyDownloadAll: 'Todo',
    historyClear: 'Limpiar historial',
    historyConfirmClear: '¿Estás seguro de eliminar todo el historial?',
    historyEvent: 'Evento',
    historyAt: 'a las',
    historyShowingPast: 'Mostrando consulta del historial',
    historyClose: 'Cerrar',
    newQuery: 'Nueva Consulta',
    backToForm: 'Volver al Formulario',
    editQuery: 'Editar Consulta',
    coordinatesSentToAPI: 'Coordenadas serán enviadas a NASA API',
    fontSizeSmall: 'Texto Pequeño',
    fontSizeMedium: 'Texto Normal',
    fontSizeLarge: 'Texto Grande',
    fontSizeXLarge: 'Texto Muy Grande',
    aboutProject: 'Sobre el Proyecto',
    satelliteData: 'Datos Satelitales',
    satelliteDataDesc: 'Utilizamos datos de satélites NASA y otras fuentes de Open Data para obtener información meteorológica en tiempo real y predecir condiciones adversas.',
    smartAnalysis: 'Análisis Inteligente',
    smartAnalysisDesc: 'Nuestro sistema procesa y analiza grandes volúmenes de datos meteorológicos para generar predicciones precisas sobre condiciones climáticas extremas.',
    openData: 'Datos Abiertos',
    openDataDesc: 'Aprovechamos el poder de los datos abiertos de NASA y otras instituciones científicas para democratizar el acceso a información meteorológica de calidad.',
    prevention: 'Prevención',
    preventionDesc: 'Ayudamos a planificar eventos al aire libre con anticipación, minimizando riesgos y optimizando la toma de decisiones basadas en datos confiables.',
    projectDescription: 'Este proyecto fue desarrollado para el NASA Space Apps Challenge 2025, con el objetivo de prevenir problemas en eventos al aire libre mediante el análisis predictivo de condiciones meteorológicas adversas.',
    teamMembers: 'Equipo',
    teamName: 'The Bugs Busters',
    footerTagline: 'Predicción meteorológica inteligente para eventos al aire libre'
  },
  en: {
    title: 'Will It Rain On My Parade?',
    subtitle: 'Weather Prediction System',
    problem: 'PROBLEM',
    solution: 'SOLUTION',
    problemText: 'Planning events without accurate weather data',
    problemDetail: '> Extreme temperature? Strong wind? Adverse conditions?',
    solutionText: 'Satellite data analysis (NASA + Open Data) to predict',
    solutionDetail: 'probabilities of adverse conditions',
    scroll: '↓ SCROLL TO CONTINUE ↓',
    detectionMatrix: 'Detection Matrix',
    conditionCategories: 'Condition Categories',
    hot: 'Hot',
    cold: 'Cold',
    wind: 'Windy',
    humid: 'Humid',
    bad: 'Uncomfortable',
    nasa: 'Data Source',
    defineDate: 'Define a Date',
    defineTime: 'Define a Time',
    selectDateTime: '📅 Select Date and Time',
    dateTimeText: 'First let\'s define a date you want to check',
    whereAreYou: '📍 Where are you?',
    quickSearch: 'Quick Coordinates Search',
    enterLocation: 'Enter your location',
    coordinatesFormat: '// Format: latitude, longitude (comma separated)',
    coordinatesExample: 'Ex: -34.6037, -58.3816',
    interactiveMap: 'Interactive Map',
    mapDescription: 'Find your city and click to select',
    mapInstructions: 'Navigate the map, find your city and click to get coordinates',
    confirmLocation: 'Confirm Location',
    latitude: 'Latitude',
    longitude: 'Longitude',
    analyzingData: 'Analyzing Data...',
    consultingNasa: 'Consulting NASA API',
    processingQuery: 'Processing query...',
    error: 'Error',
    results: 'Results',
    waitingQuery: 'Waiting for query',
    resultsWillAppear: 'Results will appear here after submitting the query',
    weatherPrediction: 'Weather Prediction',
    recommendation: 'Recommendation',
    recommendations: 'Recommendations',
    analyzingConditions: 'Analyzing conditions...',
    weatherData: 'Weather Data',
    nasaData: 'NASA Data',
    temperature: 'Temperature',
    humidity: 'Humidity',
    wind: 'Wind',
    pressure: 'Pressure',
    historyTitle: 'Query History',
    historyClickTip: 'Click on any record to view its results',
    historyEmpty: 'No queries in history',
    historyView: 'View',
    historyDownloadAll: 'All',
    historyClear: 'Clear history',
    historyConfirmClear: 'Are you sure you want to delete all history?',
    historyEvent: 'Event',
    historyAt: 'at',
    historyShowingPast: 'Showing query from history',
    historyClose: 'Close',
    newQuery: 'New Query',
    backToForm: 'Back to Form',
    editQuery: 'Edit Query',
    coordinatesSentToAPI: 'Coordinates will be sent to NASA API',
    fontSizeSmall: 'Small Text',
    fontSizeMedium: 'Normal Text',
    fontSizeLarge: 'Large Text',
    fontSizeXLarge: 'Extra Large Text',
    aboutProject: 'About the Project',
    satelliteData: 'Satellite Data',
    satelliteDataDesc: 'We use NASA satellite data and other Open Data sources to obtain real-time weather information and predict adverse conditions.',
    smartAnalysis: 'Smart Analysis',
    smartAnalysisDesc: 'Our system processes and analyzes large volumes of meteorological data to generate accurate predictions about extreme weather conditions.',
    openData: 'Open Data',
    openDataDesc: 'We harness the power of open data from NASA and other scientific institutions to democratize access to quality weather information.',
    prevention: 'Prevention',
    preventionDesc: 'We help plan outdoor events in advance, minimizing risks and optimizing decision-making based on reliable data.',
    projectDescription: 'This project was developed for the NASA Space Apps Challenge 2025, with the goal of preventing problems in outdoor events through predictive analysis of adverse weather conditions.',
    teamMembers: 'Team',
    teamName: 'The Bugs Busters',
    footerTagline: 'Smart weather prediction for outdoor events'
  }
}

const LanguageContext = createContext()

export function LanguageProvider({ children }) {
  // Obtener idioma guardado del localStorage o usar español por defecto
  const [language, setLanguage] = useState(() => {
    const savedLanguage = localStorage.getItem('preferredLanguage')
    return savedLanguage || 'es'
  })

  const t = (key) => translations[language][key] || key

  const toggleLanguage = () => {
    setLanguage(prev => {
      const newLang = prev === 'es' ? 'en' : 'es'
      // Guardar preferencia en localStorage
      localStorage.setItem('preferredLanguage', newLang)
      return newLang
    })
  }

  return (
    <LanguageContext.Provider value={{ language, t, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider')
  }
  return context
}
