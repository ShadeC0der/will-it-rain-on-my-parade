import { useEffect, useState } from 'react'
import { useLanguage } from '../context/LanguageContext'

function IntroSection() {
  const { t } = useLanguage()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Trigger animations on mount
    setTimeout(() => setIsVisible(true), 100)
  }, [])

  return (
    <div className="space-y-12">
      <div className={`text-center space-y-6 transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'
      }`}>
        <h1 className="text-6xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-700 via-red-600 to-pink-700 dark:from-cyan-400 dark:via-purple-500 dark:to-pink-500 leading-tight tracking-tight uppercase drop-shadow-md" 
            style={{ textShadow: '0 0 30px rgba(251, 146, 60, 0.3)' }}>
          {t('title').split(' ').slice(0, 4).join(' ')}<br/>{t('title').split(' ').slice(4).join(' ')}
        </h1>
        <div className="flex items-center justify-center gap-4">
          <div className="h-px w-20 bg-gradient-to-r from-transparent to-orange-500 dark:to-cyan-400"></div>
          <p className="text-sm md:text-base text-orange-700 dark:text-cyan-400 uppercase tracking-widest font-mono">
            {t('subtitle')}
          </p>
          <div className="h-px w-20 bg-gradient-to-l from-transparent to-orange-500 dark:to-cyan-400"></div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {/* Problem */}
        <div className={`relative border-2 border-orange-300 dark:border-cyan-400/30 p-8 bg-white dark:bg-gray-800/50 shadow-lg dark:shadow-none backdrop-blur-sm hover:border-orange-500 dark:hover:border-cyan-400 hover:shadow-xl transition-all duration-700 delay-300 group ${
          isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'
        }`} style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%)' }}>
          <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-orange-500 dark:border-cyan-400"></div>
          <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-orange-500 dark:border-cyan-400"></div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-orange-700 dark:text-cyan-400 mb-4 uppercase tracking-wide font-mono flex items-center gap-2">
            <span className="text-red-500 dark:text-pink-500">//</span> {t('problem')}
          </h2>
          <p className="text-base md:text-lg text-gray-800 dark:text-gray-300 leading-relaxed">
            {t('problemText')}
            <span className="block mt-3 text-orange-800 dark:text-cyan-400 text-sm md:text-base font-mono font-semibold">
              {t('problemDetail')}
            </span>
          </p>
        </div>

        {/* Solution */}
        <div className={`relative border-2 border-amber-300 dark:border-pink-500/30 p-8 bg-white dark:bg-gray-800/50 shadow-lg dark:shadow-none backdrop-blur-sm hover:border-amber-500 dark:hover:border-pink-500 hover:shadow-xl transition-all duration-700 delay-500 group ${
          isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'
        }`} style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%)' }}>
          <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-amber-500 dark:border-pink-500"></div>
          <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-amber-500 dark:border-pink-500"></div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-amber-700 dark:text-pink-500 mb-4 uppercase tracking-wide font-mono flex items-center gap-2">
            <span className="text-orange-600 dark:text-cyan-400">//</span> {t('solution')}
          </h2>
          <p className="text-base md:text-lg text-gray-800 dark:text-gray-300 leading-relaxed">
            {t('solutionText')}
            <span className="text-amber-800 dark:text-pink-500 font-mono font-semibold"> {t('solutionDetail')}</span>
          </p>
        </div>
      </div>

      <div className={`text-center transition-all duration-700 delay-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}>
        <p className="text-xs text-orange-700 dark:text-cyan-400 uppercase tracking-widest font-mono animate-pulse">
          {t('scroll')}
        </p>
      </div>
    </div>
  )
}

export default IntroSection
