/**
 * Motor de Recomendaciones Basado en Datos Reales
 * Genera recomendaciones inteligentes según las probabilidades del backend
 */

/**
 * Traducciones de recomendaciones
 */
const translations = {
  es: {
    // Calor
    extremeHeatHigh: (prob) => `⚠️ ALTA probabilidad de calor extremo (${prob}%). Se recomienda POSPONER el evento o realizarlo en horarios más frescos.`,
    extremeHeatCondition: 'calor extremo',
    highTempsCondition: 'temperaturas altas',
    ensureHydration: 'Asegurar hidratación constante para todos los asistentes.',
    provideShade: 'Proporcionar áreas con sombra y ventilación.',
    medicalTeam: 'Tener equipo médico disponible para casos de insolación.',
    moderateHeat: (prob) => `⚠️ Probabilidad moderada de calor (${prob}%). Tomar precauciones.`,
    prepareShade: 'Preparar áreas con sombra.',
    freshWater: 'Asegurar disponibilidad de agua fresca.',
    lowHeat: (prob) => `Baja probabilidad de calor extremo (${prob}%), pero mantener hidratación disponible.`,
    
    // Frío
    extremeColdHigh: (prob) => `⚠️ ALTA probabilidad de frío extremo (${prob}%). Se recomienda POSPONER el evento.`,
    extremeColdCondition: 'frío extremo',
    lowTempsCondition: 'temperaturas bajas',
    warmClothing: 'Si es indispensable, asegurar abrigo adecuado para todos los asistentes.',
    hotDrinks: 'Proporcionar bebidas calientes y refugios climatizados.',
    reduceExposure: 'Reducir el tiempo de exposición al aire libre.',
    moderateCold: (prob) => `⚠️ Probabilidad moderada de frío (${prob}%). Preparar ropa de abrigo.`,
    heatedSpaces: 'Considerar espacios cerrados o calefaccionados.',
    lowCold: (prob) => `Baja probabilidad de frío extremo (${prob}%), pero llevar abrigo ligero.`,
    
    // Viento
    strongWindsHigh: (prob) => `⚠️ ALTA probabilidad de vientos fuertes (${prob}%). CANCELAR o mover a espacio cerrado.`,
    strongWindsCondition: 'vientos fuertes',
    moderateWindsCondition: 'vientos moderados',
    noTents: 'NO instalar carpas, toldos o estructuras livianas.',
    flyingObjects: 'Riesgo alto de objetos volando. Asegurar o remover todos los objetos sueltos.',
    moderateWinds: (prob) => `⚠️ Probabilidad moderada de vientos (${prob}%). Asegurar estructuras.`,
    reinforceTents: 'Reforzar carpas y decoraciones.',
    contingencyPlan: 'Tener plan de contingencia.',
    lowWinds: (prob) => `Baja probabilidad de vientos fuertes (${prob}%), pero asegurar objetos livianos.`,
    
    // Húmedo
    heavyRainHigh: (prob) => `⚠️ ALTA probabilidad de lluvia intensa (${prob}%). POSPONER el evento.`,
    heavyRainCondition: 'lluvia intensa',
    moderateRainCondition: 'lluvia moderada',
    waterproofTents: 'Si es indispensable, asegurar carpas 100% impermeables.',
    drainage: 'Preparar sistema de drenaje adecuado.',
    wetFloors: 'Proteger equipos eléctricos y preparar suelos antideslizantes.',
    moderateRain: (prob) => `⚠️ Probabilidad moderada de lluvia (${prob}%). Preparar refugios.`,
    umbrellas: 'Tener paraguas y ponchos disponibles.',
    coverEquipment: 'Proteger equipos sensibles al agua.',
    lowRain: (prob) => `Baja probabilidad de lluvia (${prob}%), pero tener paraguas disponibles.`,
    
    // Incómodo
    veryUncomfortableHigh: (prob) => `⚠️ ALTA probabilidad de condiciones incómodas (${prob}%). Considerar posponer.`,
    uncomfortableCondition: 'condiciones incómodas',
    moderateDiscomfort: (prob) => `⚠️ Probabilidad moderada de incomodidad (${prob}%). Tomar medidas de confort.`,
    comfortMeasures: 'Preparar medidas de confort (ventilación, calefacción, etc.).',
    lowDiscomfort: (prob) => `Baja probabilidad de incomodidad (${prob}%).`,
    
    // Resúmenes
    highRisk: 'ALTO riesgo - Se recomienda posponer',
    mediumRisk: 'RIESGO MODERADO - Tomar precauciones',
    lowRisk: 'Condiciones favorables',
    multipleConditions: 'múltiples condiciones adversas',
    safeConditions: 'Las condiciones son generalmente favorables para el evento.'
  },
  en: {
    // Heat
    extremeHeatHigh: (prob) => `⚠️ HIGH probability of extreme heat (${prob}%). It is recommended to POSTPONE the event or hold it during cooler hours.`,
    extremeHeatCondition: 'extreme heat',
    highTempsCondition: 'high temperatures',
    ensureHydration: 'Ensure constant hydration for all attendees.',
    provideShade: 'Provide shaded and ventilated areas.',
    medicalTeam: 'Have medical team available for heat stroke cases.',
    moderateHeat: (prob) => `⚠️ Moderate probability of heat (${prob}%). Take precautions.`,
    prepareShade: 'Prepare shaded areas.',
    freshWater: 'Ensure fresh water availability.',
    lowHeat: (prob) => `Low probability of extreme heat (${prob}%), but keep hydration available.`,
    
    // Cold
    extremeColdHigh: (prob) => `⚠️ HIGH probability of extreme cold (${prob}%). It is recommended to POSTPONE the event.`,
    extremeColdCondition: 'extreme cold',
    lowTempsCondition: 'low temperatures',
    warmClothing: 'If essential, ensure adequate warm clothing for all attendees.',
    hotDrinks: 'Provide hot drinks and heated shelters.',
    reduceExposure: 'Reduce outdoor exposure time.',
    moderateCold: (prob) => `⚠️ Moderate probability of cold (${prob}%). Prepare warm clothing.`,
    heatedSpaces: 'Consider enclosed or heated spaces.',
    lowCold: (prob) => `Low probability of extreme cold (${prob}%), but bring light jacket.`,
    
    // Wind
    strongWindsHigh: (prob) => `⚠️ HIGH probability of strong winds (${prob}%). CANCEL or move to enclosed space.`,
    strongWindsCondition: 'strong winds',
    moderateWindsCondition: 'moderate winds',
    noTents: 'DO NOT install tents, awnings, or light structures.',
    flyingObjects: 'High risk of flying objects. Secure or remove all loose items.',
    moderateWinds: (prob) => `⚠️ Moderate probability of winds (${prob}%). Secure structures.`,
    reinforceTents: 'Reinforce tents and decorations.',
    contingencyPlan: 'Have contingency plan.',
    lowWinds: (prob) => `Low probability of strong winds (${prob}%), but secure light objects.`,
    
    // Wet
    heavyRainHigh: (prob) => `⚠️ HIGH probability of heavy rain (${prob}%). POSTPONE the event.`,
    heavyRainCondition: 'heavy rain',
    moderateRainCondition: 'moderate rain',
    waterproofTents: 'If essential, ensure 100% waterproof tents.',
    drainage: 'Prepare adequate drainage system.',
    wetFloors: 'Protect electrical equipment and prepare non-slip floors.',
    moderateRain: (prob) => `⚠️ Moderate probability of rain (${prob}%). Prepare shelters.`,
    umbrellas: 'Have umbrellas and ponchos available.',
    coverEquipment: 'Protect water-sensitive equipment.',
    lowRain: (prob) => `Low probability of rain (${prob}%), but have umbrellas available.`,
    
    // Uncomfortable
    veryUncomfortableHigh: (prob) => `⚠️ HIGH probability of uncomfortable conditions (${prob}%). Consider postponing.`,
    uncomfortableCondition: 'uncomfortable conditions',
    moderateDiscomfort: (prob) => `⚠️ Moderate probability of discomfort (${prob}%). Take comfort measures.`,
    comfortMeasures: 'Prepare comfort measures (ventilation, heating, etc.).',
    lowDiscomfort: (prob) => `Low probability of discomfort (${prob}%).`,
    
    // Summaries
    highRisk: 'HIGH risk - Postponement recommended',
    mediumRisk: 'MODERATE RISK - Take precautions',
    lowRisk: 'Favorable conditions',
    multipleConditions: 'multiple adverse conditions',
    safeConditions: 'Conditions are generally favorable for the event.'
  }
}

/**
 * Valida y sanitiza un valor de probabilidad
 * @param {*} value - Valor a validar
 * @returns {number} - Valor sanitizado entre 0 y 1
 */
const sanitizeProbability = (value) => {
  // Convertir a número
  const num = parseFloat(value)
  
  // Si no es un número válido, retornar 0
  if (isNaN(num) || num === null || num === undefined) {
    return 0
  }
  
  // Asegurar que esté entre 0 y 1
  return Math.max(0, Math.min(1, num))
}

/**
 * Valida y sanitiza el objeto de predicciones
 * @param {Object} predicted - Probabilidades del backend
 * @returns {Object} - Objeto sanitizado con todos los valores válidos
 */
const sanitizePredictions = (predicted) => {
  if (!predicted || typeof predicted !== 'object') {
    return {
      veryHot: 0,
      veryCold: 0,
      veryWindy: 0,
      veryWet: 0,
      veryUncomfortable: 0
    }
  }
  
  return {
    veryHot: sanitizeProbability(predicted.veryHot),
    veryCold: sanitizeProbability(predicted.veryCold),
    veryWindy: sanitizeProbability(predicted.veryWindy),
    veryWet: sanitizeProbability(predicted.veryWet),
    veryUncomfortable: sanitizeProbability(predicted.veryUncomfortable)
  }
}

/**
 * Genera recomendaciones basadas en las predicciones reales
 * @param {Object} predicted - Probabilidades de condiciones adversas
 * @param {Object} query - Información de la consulta (ubicación, fecha, umbrales)
 * @param {string} language - Idioma de las recomendaciones ('es' o 'en')
 * @returns {Object} - Recomendaciones y nivel de riesgo
 */
export const generateRecommendations = (predicted, query, language = 'es') => {
  if (!predicted) {
    return {
      riskLevel: 'unknown',
      recommendations: [
        language === 'es' 
          ? 'No se pudieron generar recomendaciones sin datos de predicción.'
          : 'Could not generate recommendations without prediction data.'
      ],
      summary: language === 'es' ? 'Datos insuficientes' : 'Insufficient data'
    }
  }

  // Sanitizar y validar todas las probabilidades
  const sanitized = sanitizePredictions(predicted)
  
  const recommendations = []
  const conditions = []
  
  // Obtener traducciones para el idioma seleccionado
  const t = translations[language] || translations.es
  
  // Analizar cada condición con valores sanitizados
  const { veryHot, veryCold, veryWindy, veryWet, veryUncomfortable } = sanitized

  // 🔥 MUY CALUROSO
  if (veryHot >= 0.7) {
    conditions.push(t.extremeHeatCondition)
    recommendations.push(t.extremeHeatHigh((veryHot * 100).toFixed(0)))
    recommendations.push(t.ensureHydration)
    recommendations.push(t.provideShade)
    recommendations.push(t.medicalTeam)
  } else if (veryHot >= 0.4) {
    conditions.push(t.highTempsCondition)
    recommendations.push(t.moderateHeat((veryHot * 100).toFixed(0)))
    recommendations.push(t.prepareShade)
    recommendations.push(t.freshWater)
  } else if (veryHot >= 0.2) {
    recommendations.push(t.lowHeat((veryHot * 100).toFixed(0)))
  }

  // ❄️ MUY FRÍO
  if (veryCold >= 0.7) {
    conditions.push(t.extremeColdCondition)
    recommendations.push(t.extremeColdHigh((veryCold * 100).toFixed(0)))
    recommendations.push(t.warmClothing)
    recommendations.push(t.hotDrinks)
    recommendations.push(t.reduceExposure)
  } else if (veryCold >= 0.4) {
    conditions.push(t.lowTempsCondition)
    recommendations.push(t.moderateCold((veryCold * 100).toFixed(0)))
    recommendations.push(t.heatedSpaces)
  } else if (veryCold >= 0.2) {
    recommendations.push(t.lowCold((veryCold * 100).toFixed(0)))
  }

  // 💨 MUY VENTOSO
  if (veryWindy >= 0.7) {
    conditions.push(t.strongWindsCondition)
    recommendations.push(t.strongWindsHigh((veryWindy * 100).toFixed(0)))
    recommendations.push(t.noTents)
    recommendations.push(t.flyingObjects)
  } else if (veryWindy >= 0.4) {
    conditions.push(t.moderateWindsCondition)
    recommendations.push(t.moderateWinds((veryWindy * 100).toFixed(0)))
    recommendations.push(t.reinforceTents)
    recommendations.push(t.contingencyPlan)
  } else if (veryWindy >= 0.2) {
    recommendations.push(t.lowWinds((veryWindy * 100).toFixed(0)))
  }

  // 💧 MUY HÚMEDO
  if (veryWet >= 0.7) {
    conditions.push(t.heavyRainCondition)
    recommendations.push(t.heavyRainHigh((veryWet * 100).toFixed(0)))
    recommendations.push(t.waterproofTents)
    recommendations.push(t.drainage)
    recommendations.push(t.wetFloors)
  } else if (veryWet >= 0.4) {
    conditions.push(t.moderateRainCondition)
    recommendations.push(t.moderateRain((veryWet * 100).toFixed(0)))
    recommendations.push(t.umbrellas)
    recommendations.push(t.coverEquipment)
  } else if (veryWet >= 0.2) {
    recommendations.push(t.lowRain((veryWet * 100).toFixed(0)))
  }

  // 😰 MUY INCÓMODO
  if (veryUncomfortable >= 0.7) {
    conditions.push(t.uncomfortableCondition)
    recommendations.push(t.veryUncomfortableHigh((veryUncomfortable * 100).toFixed(0)))
    recommendations.push(t.comfortMeasures)
  } else if (veryUncomfortable >= 0.4) {
    recommendations.push(t.moderateDiscomfort((veryUncomfortable * 100).toFixed(0)))
    recommendations.push(t.comfortMeasures)
  } else if (veryUncomfortable >= 0.2) {
    recommendations.push(t.lowDiscomfort((veryUncomfortable * 100).toFixed(0)))
  }

  // Determinar nivel de riesgo general
  const maxProb = Math.max(veryHot, veryCold, veryWindy, veryWet, veryUncomfortable)
  let riskLevel = 'low'
  let riskSummary = t.lowRisk
  
  if (maxProb >= 0.7) {
    riskLevel = 'high'
    riskSummary = conditions.length > 1 ? `${t.highRisk}: ${conditions.join(', ')}` : `${t.highRisk}: ${conditions[0]}`
  } else if (maxProb >= 0.4) {
    riskLevel = 'medium'
    riskSummary = conditions.length > 1 ? `${t.mediumRisk}: ${conditions.join(', ')}` : `${t.mediumRisk}: ${conditions[0]}`
  } else {
    riskLevel = 'low'
    riskSummary = t.lowRisk
    if (recommendations.length === 0) {
      recommendations.push(t.safeConditions)
    }
  }

  // Si no hay recomendaciones específicas, agregar mensaje por defecto
  if (recommendations.length === 0) {
    recommendations.push(t.safeConditions)
  }

  return {
    riskLevel,
    summary: riskSummary,
    recommendations,
    conditions,
    maxProbability: maxProb
  }
}

/**
 * Obtiene el nombre de la condición dominante
 */
export const getDominantConditionName = (category, language = 'es') => {
  const names = {
    veryHot: { es: 'Muy Caluroso', en: 'Very Hot' },
    veryCold: { es: 'Muy Frío', en: 'Very Cold' },
    veryWindy: { es: 'Muy Ventoso', en: 'Very Windy' },
    veryWet: { es: 'Muy Húmedo', en: 'Very Wet' },
    veryUncomfortable: { es: 'Muy Incómodo', en: 'Very Uncomfortable' }
  }
  
  return names[category]?.[language] || category
}

export default {
  generateRecommendations,
  getDominantConditionName
}
