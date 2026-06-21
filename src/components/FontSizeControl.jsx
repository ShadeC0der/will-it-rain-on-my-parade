import { useState, useEffect } from 'react'
import { Type } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

function FontSizeControl() {
  const { t } = useLanguage()
  const [fontSize, setFontSize] = useState(() => {
    return localStorage.getItem('fontSize') || 'medium'
  })

  useEffect(() => {
    // Aplicar el tamaño de fuente al body
    const root = document.documentElement
    
    switch(fontSize) {
      case 'small':
        root.style.fontSize = '14px'
        break
      case 'medium':
        root.style.fontSize = '16px'
        break
      case 'large':
        root.style.fontSize = '18px'
        break
      case 'xlarge':
        root.style.fontSize = '20px'
        break
      default:
        root.style.fontSize = '16px'
    }
    
    localStorage.setItem('fontSize', fontSize)
  }, [fontSize])

  const cycleFontSize = () => {
    const sizes = ['small', 'medium', 'large', 'xlarge']
    const currentIndex = sizes.indexOf(fontSize)
    const nextIndex = (currentIndex + 1) % sizes.length
    setFontSize(sizes[nextIndex])
  }

  const getSizeLabel = () => {
    switch(fontSize) {
      case 'small': return 'A-'
      case 'medium': return 'A'
      case 'large': return 'A+'
      case 'xlarge': return 'A++'
      default: return 'A'
    }
  }

  const getSizeDescription = () => {
    switch(fontSize) {
      case 'small': return t('fontSizeSmall')
      case 'medium': return t('fontSizeMedium')
      case 'large': return t('fontSizeLarge')
      case 'xlarge': return t('fontSizeXLarge')
      default: return t('fontSizeMedium')
    }
  }

  return (
    <button
      onClick={cycleFontSize}
      className="flex items-center gap-2 px-4 py-2 bg-purple-100 dark:bg-purple-500/20 hover:bg-purple-200 dark:hover:bg-purple-500/30 border-2 border-purple-500 dark:border-purple-400 text-purple-700 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 rounded-lg transition-all hover:shadow-lg dark:hover:shadow-[0_0_15px_rgba(168,85,247,0.4)] font-mono uppercase text-sm"
      title={getSizeDescription()}
    >
      <Type className="w-4 h-4" />
      <span className="font-bold">{getSizeLabel()}</span>
    </button>
  )
}

export default FontSizeControl
