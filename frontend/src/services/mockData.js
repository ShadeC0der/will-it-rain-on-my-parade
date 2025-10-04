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
 */
export const getMockWeatherResponse = (location, date, time) => {
  // Esperar 1-2 segundos para simular llamada a API
  return new Promise((resolve) => {
    setTimeout(() => {
      const scenario = getRandomWeatherScenario()
      
      const response = {
        status: 'success',
        data: {
          location: {
            name: `Ubicación (${location.trim()})`,
            coordinates: {
              lat: parseFloat(location.split(',')[0]),
              lon: parseFloat(location.split(',')[1])
            }
          },
          datetime: `${date}T${time}:00`,
          weather_status: scenario.status,
          risk_level: scenario.risk_level,
          formatted_data: scenario.data,
          recommendations: scenario.recommendations
        }
      }
      
      resolve(response)
    }, 1500) // 1.5 segundos de delay
  })
}

export default weatherScenarios
