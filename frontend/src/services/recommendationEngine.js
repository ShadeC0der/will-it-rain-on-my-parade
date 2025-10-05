/**
 * Motor de Recomendaciones Basado en Datos Reales
 * Genera recomendaciones inteligentes según las probabilidades del backend
 */

/**
 * Genera recomendaciones basadas en las predicciones reales
 * @param {Object} predicted - Probabilidades de condiciones adversas
 * @param {Object} query - Información de la consulta (ubicación, fecha, umbrales)
 * @returns {Object} - Recomendaciones y nivel de riesgo
 */
export const generateRecommendations = (predicted, query) => {
  if (!predicted) {
    return {
      riskLevel: 'unknown',
      recommendations: ['No se pudieron generar recomendaciones sin datos de predicción.'],
      summary: 'Datos insuficientes'
    }
  }

  const recommendations = []
  const conditions = []
  
  // Analizar cada condición
  const { veryHot, veryCold, veryWindy, veryWet, veryUncomfortable } = predicted

  // 🔥 MUY CALUROSO
  if (veryHot >= 0.7) {
    conditions.push('calor extremo')
    recommendations.push(`⚠️ ALTA probabilidad de calor extremo (${(veryHot * 100).toFixed(0)}%). Se recomienda POSPONER el evento o realizarlo en horarios más frescos.`)
    recommendations.push('Asegurar hidratación constante para todos los asistentes.')
    recommendations.push('Proporcionar áreas con sombra y ventilación.')
    recommendations.push('Tener equipo médico disponible para casos de insolación.')
  } else if (veryHot >= 0.4) {
    conditions.push('temperaturas altas')
    recommendations.push(`⚠️ Probabilidad moderada de calor (${(veryHot * 100).toFixed(0)}%). Tomar precauciones.`)
    recommendations.push('Preparar áreas con sombra.')
    recommendations.push('Asegurar disponibilidad de agua fresca.')
  } else if (veryHot >= 0.2) {
    recommendations.push(`Baja probabilidad de calor extremo (${(veryHot * 100).toFixed(0)}%), pero mantener hidratación disponible.`)
  }

  // ❄️ MUY FRÍO
  if (veryCold >= 0.7) {
    conditions.push('frío extremo')
    recommendations.push(`⚠️ ALTA probabilidad de frío extremo (${(veryCold * 100).toFixed(0)}%). Se recomienda POSPONER el evento.`)
    recommendations.push('Si es indispensable, asegurar abrigo adecuado para todos los asistentes.')
    recommendations.push('Proporcionar bebidas calientes y refugios climatizados.')
    recommendations.push('Reducir el tiempo de exposición al aire libre.')
  } else if (veryCold >= 0.4) {
    conditions.push('temperaturas bajas')
    recommendations.push(`⚠️ Probabilidad moderada de frío (${(veryCold * 100).toFixed(0)}%). Preparar ropa de abrigo.`)
    recommendations.push('Considerar espacios cerrados o calefaccionados.')
  } else if (veryCold >= 0.2) {
    recommendations.push(`Baja probabilidad de frío extremo (${(veryCold * 100).toFixed(0)}%), pero llevar abrigo ligero.`)
  }

  // 💨 MUY VENTOSO
  if (veryWindy >= 0.7) {
    conditions.push('vientos fuertes')
    recommendations.push(`⚠️ ALTA probabilidad de vientos fuertes (${(veryWindy * 100).toFixed(0)}%). CANCELAR o mover a espacio cerrado.`)
    recommendations.push('NO instalar carpas, toldos o estructuras livianas.')
    recommendations.push('Riesgo alto de objetos volando. Asegurar o remover todos los objetos sueltos.')
  } else if (veryWindy >= 0.4) {
    conditions.push('vientos moderados')
    recommendations.push(`⚠️ Probabilidad moderada de vientos (${(veryWindy * 100).toFixed(0)}%). Asegurar estructuras.`)
    recommendations.push('Reforzar carpas y decoraciones.')
    recommendations.push('Tener plan de contingencia.')
  } else if (veryWindy >= 0.2) {
    recommendations.push(`Baja probabilidad de vientos fuertes (${(veryWindy * 100).toFixed(0)}%), pero asegurar objetos livianos.`)
  }

  // 💧 MUY HÚMEDO
  if (veryWet >= 0.7) {
    conditions.push('lluvia intensa')
    recommendations.push(`⚠️ ALTA probabilidad de lluvia/humedad extrema (${(veryWet * 100).toFixed(0)}%). Se recomienda POSPONER.`)
    recommendations.push('Si se realiza, asegurar carpas 100% impermeables.')
    recommendations.push('Instalar suelos antideslizantes.')
    recommendations.push('Proteger equipos electrónicos y sonido.')
    recommendations.push('Preparar plan de evacuación en caso de tormenta.')
  } else if (veryWet >= 0.4) {
    conditions.push('posible lluvia')
    recommendations.push(`⚠️ Probabilidad moderada de lluvia (${(veryWet * 100).toFixed(0)}%). Preparar cobertura.`)
    recommendations.push('Tener paraguas y carpas disponibles.')
    recommendations.push('Plan B en caso de lluvia.')
  } else if (veryWet >= 0.2) {
    recommendations.push(`Baja probabilidad de lluvia (${(veryWet * 100).toFixed(0)}%), pero llevar paraguas por precaución.`)
  }

  // 😰 MUY INCÓMODO
  if (veryUncomfortable >= 0.7) {
    conditions.push('condiciones incómodas')
    recommendations.push(`⚠️ ALTA probabilidad de condiciones incómodas (${(veryUncomfortable * 100).toFixed(0)}%). Combinación peligrosa de calor y humedad.`)
    recommendations.push('Alto riesgo de golpes de calor y deshidratación severa.')
    recommendations.push('NO recomendado para actividades al aire libre prolongadas.')
  } else if (veryUncomfortable >= 0.4) {
    recommendations.push(`⚠️ Probabilidad moderada de incomodidad (${(veryUncomfortable * 100).toFixed(0)}%). Tomar precauciones.`)
    recommendations.push('Asegurar ventilación y áreas frescas.')
  }

  // Determinar nivel de riesgo general
  const maxProb = Math.max(veryHot, veryCold, veryWindy, veryWet, veryUncomfortable)
  let riskLevel = 'low'
  let riskSummary = 'Condiciones favorables para el evento'
  
  if (maxProb >= 0.7) {
    riskLevel = 'high'
    riskSummary = `RIESGO ALTO: ${conditions.join(', ')}`
    // Agregar recomendación final
    recommendations.push('🚨 RECOMENDACIÓN FINAL: Considerar seriamente POSPONER el evento debido a las condiciones adversas.')
  } else if (maxProb >= 0.4) {
    riskLevel = 'medium'
    riskSummary = `RIESGO MODERADO: ${conditions.join(', ')}`
    recommendations.push('⚠️ RECOMENDACIÓN FINAL: El evento puede realizarse con PRECAUCIONES. Tener plan B.')
  } else {
    riskLevel = 'low'
    riskSummary = 'Condiciones favorables'
    if (recommendations.length === 0) {
      recommendations.push('✅ Condiciones IDEALES para realizar el evento al aire libre.')
      recommendations.push('Probabilidades bajas de condiciones adversas.')
      recommendations.push('Mantener precauciones básicas (hidratación, protección solar).')
    } else {
      recommendations.push('✅ Riesgo bajo. Mantener precauciones básicas mencionadas.')
    }
  }

  // Si no hay recomendaciones específicas, agregar mensaje por defecto
  if (recommendations.length === 0) {
    recommendations.push('Sin recomendaciones especiales. Condiciones normales.')
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
