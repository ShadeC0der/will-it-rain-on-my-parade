/**
 * Mock Data para testing del frontend
 * Simula respuestas del backend mientras se desarrolla
 */

// Escenarios climáticos predefinidos
const weatherScenarios = [
  {
    id: 'very_hot',
    status: 'very hot',
    risk_level: 'high',
    data: {
      temperature: '38.5°C',
      humidity: '70%',
      wind_speed: '12 km/h',
      pressure: '1010 hPa',
      feels_like: '45°C',
      uv_index: 'Extreme (11)'
    },
    recommendations: [
      'POSPONER el evento o realizarlo en horarios más frescos',
      'Asegurar hidratación constante para todos los asistentes',
      'Proporcionar áreas con sombra',
      'Tener equipo médico disponible para casos de insolación',
      'Considerar posponer si hay personas vulnerables (niños, ancianos)'
    ]
  },
  {
    id: 'very_cold',
    status: 'very cold',
    risk_level: 'high',
    data: {
      temperature: '2.5°C',
      humidity: '40%',
      wind_speed: '25 km/h',
      pressure: '1020 hPa',
      feels_like: '-5°C',
      wind_chill: 'Severe'
    },
    recommendations: [
      'POSPONER el evento debido a temperaturas extremas',
      'Si es indispensable, asegurar abrigo adecuado para todos',
      'Proporcionar bebidas calientes',
      'Tener refugios climatizados disponibles',
      'Reducir el tiempo de exposición al aire libre'
    ]
  },
  {
    id: 'very_windy',
    status: 'very windy',
    risk_level: 'high',
    data: {
      temperature: '18°C',
      humidity: '35%',
      wind_speed: '55 km/h',
      pressure: '1005 hPa',
      wind_gusts: '75 km/h',
      wind_direction: 'Southwest'
    },
    recommendations: [
      'CANCELAR el evento o moverlo a espacio cerrado',
      'Vientos peligrosos para estructuras temporales',
      'Riesgo alto de objetos volando',
      'No instalar carpas, toldos o estructuras livianas',
      'Asegurar o remover todos los objetos sueltos'
    ]
  },
  {
    id: 'very_wet',
    status: 'very wet',
    risk_level: 'high',
    data: {
      temperature: '16.5°C',
      humidity: '95%',
      wind_speed: '20 km/h',
      pressure: '995 hPa',
      precipitation: '85%',
      rain_intensity: 'Heavy'
    },
    recommendations: [
      'POSPONER el evento debido a alta probabilidad de lluvia',
      'Si se realiza, asegurar carpas 100% impermeables',
      'Instalar suelos antideslizantes',
      'Preparar plan de evacuación en caso de tormenta',
      'Proteger equipos electrónicos y sonido'
    ]
  },
  {
    id: 'very_uncomfortable',
    status: 'very uncomfortable',
    risk_level: 'high',
    data: {
      temperature: '34°C',
      humidity: '85%',
      wind_speed: '18 km/h',
      pressure: '1008 hPa',
      feels_like: '42°C',
      heat_index: 'Dangerous'
    },
    recommendations: [
      'POSPONER el evento por condiciones insalubres',
      'Combinación peligrosa de calor y humedad',
      'Alto riesgo de golpes de calor',
      'Riesgo de deshidratación severa',
      'No recomendado para actividades al aire libre'
    ]
  },
  {
    id: 'favorable',
    status: 'favorable',
    risk_level: 'low',
    data: {
      temperature: '22.5°C',
      humidity: '35%',
      wind_speed: '8 km/h',
      pressure: '1015 hPa',
      feels_like: '23°C',
      conditions: 'Clear sky'
    },
    recommendations: [
      'Condiciones IDEALES para realizar el evento',
      'Temperatura agradable y estable',
      'Baja probabilidad de lluvia',
      'Vientos moderados, sin riesgo',
      'Mantener hidratación básica disponible'
    ]
  },
  {
    id: 'moderate',
    status: 'moderate',
    risk_level: 'medium',
    data: {
      temperature: '27°C',
      humidity: '50%',
      wind_speed: '15 km/h',
      pressure: '1012 hPa',
      feels_like: '29°C',
      conditions: 'Partly cloudy'
    },
    recommendations: [
      'Evento puede realizarse con PRECAUCIONES',
      'Preparar áreas con sombra',
      'Asegurar hidratación constante',
      'Tener plan B en caso de cambios climáticos',
      'Monitorear el clima el día previo al evento'
    ]
  }
]

/**
 * Obtiene un escenario climático aleatorio
 */
export const getRandomWeatherScenario = () => {
  const randomIndex = Math.floor(Math.random() * weatherScenarios.length)
  return weatherScenarios[randomIndex]
}

/**
 * Obtiene un escenario específico por ID
 */
export const getScenarioById = (id) => {
  return weatherScenarios.find(scenario => scenario.id === id) || weatherScenarios[0]
}

/**
 * Simula respuesta del backend con datos mock
 * Datos realistas y coherentes basados en ubicación y fecha
 */
export const getMockWeatherResponse = (location, date, time) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const coords = location.split(',').map(coord => parseFloat(coord.trim()))
      const lat = coords[0] || -38.7359
      const lon = coords[1] || -72.5904
      
      // Determinar hemisferio y estación del año
      const isNorthernHemisphere = lat > 0
      const month = new Date(date).getMonth() + 1 // 1-12
      
      // Determinar estación (simplificado)
      let season
      if (isNorthernHemisphere) {
        season = (month >= 6 && month <= 8) ? 'summer' : 
                 (month >= 12 || month <= 2) ? 'winter' : 
                 (month >= 3 && month <= 5) ? 'spring' : 'fall'
      } else {
        season = (month >= 6 && month <= 8) ? 'winter' : 
                 (month >= 12 || month <= 2) ? 'summer' : 
                 (month >= 3 && month <= 5) ? 'fall' : 'spring'
      }
      
      // Generar probabilidades realistas según estación y latitud
      const generateRealisticProbabilities = () => {
        let probabilities = {
          veryHot: 0,
          veryCold: 0,
          veryWindy: 0,
          veryWet: 0,
          veryUncomfortable: 0
        }
        
        // Latitudes altas (más de 40°) -> más frío
        const isHighLatitude = Math.abs(lat) > 40
        
        if (season === 'summer') {
          probabilities.veryHot = isHighLatitude ? 0.1 + Math.random() * 0.2 : 0.3 + Math.random() * 0.4
          probabilities.veryCold = 0.01 + Math.random() * 0.05
          probabilities.veryWindy = 0.1 + Math.random() * 0.2
          probabilities.veryWet = 0.15 + Math.random() * 0.25
          probabilities.veryUncomfortable = probabilities.veryHot * 0.7 + Math.random() * 0.15
        } else if (season === 'winter') {
          probabilities.veryHot = 0.01 + Math.random() * 0.05
          probabilities.veryCold = isHighLatitude ? 0.4 + Math.random() * 0.4 : 0.1 + Math.random() * 0.2
          probabilities.veryWindy = 0.2 + Math.random() * 0.3
          probabilities.veryWet = 0.2 + Math.random() * 0.3
          probabilities.veryUncomfortable = 0.05 + Math.random() * 0.1
        } else if (season === 'spring') {
          probabilities.veryHot = 0.05 + Math.random() * 0.15
          probabilities.veryCold = 0.1 + Math.random() * 0.15
          probabilities.veryWindy = 0.2 + Math.random() * 0.3
          probabilities.veryWet = 0.25 + Math.random() * 0.35
          probabilities.veryUncomfortable = 0.08 + Math.random() * 0.12
        } else { // fall
          probabilities.veryHot = 0.08 + Math.random() * 0.15
          probabilities.veryCold = 0.12 + Math.random() * 0.18
          probabilities.veryWindy = 0.25 + Math.random() * 0.35
          probabilities.veryWet = 0.2 + Math.random() * 0.3
          probabilities.veryUncomfortable = 0.06 + Math.random() * 0.1
        }
        
        return probabilities
      }
      
      // Calcular Brier Score realista
      // Brier Score = (predicción - resultado)²
      const calculateBrierScore = (prediction, actualOutcome) => {
        return Math.pow(prediction - actualOutcome, 2)
      }
      
      // Generar resultado observado basado en la probabilidad
      // Mayor probabilidad = mayor chance de que ocurra
      const generateObservedOutcome = (probability) => {
        // Agregar algo de ruido pero mantener coherencia
        const threshold = 0.3 + Math.random() * 0.4 // 0.3 - 0.7
        return probability > threshold ? 1 : 0
      }
      
      const predictions = generateRealisticProbabilities()
      
      // Generar observaciones coherentes
      const observations = {}
      const categories = ['veryHot', 'veryCold', 'veryWindy', 'veryWet', 'veryUncomfortable']
      
      categories.forEach(category => {
        const prediction = predictions[category]
        const actualOutcome = generateObservedOutcome(prediction)
        const brierScore = calculateBrierScore(prediction, actualOutcome)
        
        observations[category] = {
          actualOutcome,
          brierScore
        }
      })
      
      // Calcular mean Brier Score
      const brierScores = categories.map(cat => observations[cat].brierScore)
      const meanBrierScore = brierScores.reduce((a, b) => a + b, 0) / brierScores.length
      
      const response = {
        predicted: predictions,
        observed: observations,
        meanBrierScore,
        query: {
          latitude: lat,
          longitude: lon,
          targetDate: date,
          thresholds: {
            veryHot: { temperatureC: 32 },
            veryCold: { temperatureC: 0 },
            veryWindy: { windSpeedMs: 10 },
            veryWet: { precipitationMm: 10 },
            veryUncomfortable: { heatIndexC: 30, humidityPct: 70 }
          }
        },
        externalErrors: Math.random() > 0.9 ? "GESDISC token rejected by server." : null
      }
      
      console.log('🧪 Mock Data Generado:')
      console.log('📍 Ubicación:', `${lat}, ${lon}`)
      console.log('📅 Fecha:', date, '| Estación:', season)
      console.log('🎯 Predicciones:', predictions)
      console.log('📊 Mean Brier Score:', meanBrierScore.toFixed(4))
      
      resolve(response)
    }, 1500) // 1.5 segundos de delay
  })
}

export default weatherScenarios
