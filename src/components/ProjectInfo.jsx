import { useLanguage } from '../context/LanguageContext'
import { Satellite, Database, Brain, Shield } from 'lucide-react'

function ProjectInfo() {
  const { t } = useLanguage()

  return (
    <div className="max-w-6xl mx-auto px-4 py-16 space-y-12">
      {/* Header */}
      <div className="text-center space-y-4">
        <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-700 to-red-700 dark:from-cyan-400 dark:to-purple-500 uppercase tracking-tight drop-shadow-md"
            style={{ textShadow: '0 0 20px rgba(251, 146, 60, 0.2)' }}>
          {t('aboutProject')}
        </h2>
        <div className="flex items-center justify-center gap-2">
          <div className="h-px w-12 bg-orange-500 dark:bg-cyan-400"></div>
          <p className="text-sm text-orange-700 dark:text-cyan-400 uppercase tracking-widest font-mono">
            NASA SPACE APPS CHALLENGE 2025
          </p>
          <div className="h-px w-12 bg-orange-500 dark:bg-cyan-400"></div>
        </div>
      </div>

      {/* Grid de características */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Card 1: Datos Satelitales */}
        <div className="relative border-2 border-orange-300 dark:border-cyan-500/30 p-6 bg-white dark:bg-gray-800/50 shadow-lg dark:shadow-none backdrop-blur-sm hover:border-orange-500 dark:hover:border-cyan-400 hover:shadow-xl transition-all group"
             style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%)' }}>
          <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-orange-500 dark:border-cyan-400"></div>
          <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-orange-500 dark:border-cyan-400"></div>
          
          <div className="flex items-start gap-4">
            <div className="p-3 bg-orange-100 dark:bg-cyan-500/20 rounded-lg border-2 border-orange-400 dark:border-cyan-500/50">
              <Satellite className="w-8 h-8 text-orange-600 dark:text-cyan-400" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-orange-700 dark:text-cyan-400 uppercase tracking-wide font-mono mb-2">
                {t('satelliteData')}
              </h3>
              <p className="text-gray-800 dark:text-gray-300 text-base leading-relaxed">
                {t('satelliteDataDesc')}
              </p>
            </div>
          </div>
        </div>

        {/* Card 2: Análisis Inteligente */}
        <div className="relative border-2 border-amber-300 dark:border-purple-500/30 p-6 bg-white dark:bg-gray-800/50 shadow-lg dark:shadow-none backdrop-blur-sm hover:border-amber-500 dark:hover:border-purple-400 hover:shadow-xl transition-all group"
             style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%)' }}>
          <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-amber-500 dark:border-purple-400"></div>
          <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-amber-500 dark:border-purple-400"></div>
          
          <div className="flex items-start gap-4">
            <div className="p-3 bg-amber-100 dark:bg-purple-500/20 rounded-lg border-2 border-amber-400 dark:border-purple-500/50">
              <Brain className="w-8 h-8 text-amber-700 dark:text-purple-400" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-amber-700 dark:text-purple-400 uppercase tracking-wide font-mono mb-2">
                {t('smartAnalysis')}
              </h3>
              <p className="text-gray-800 dark:text-gray-300 text-base leading-relaxed">
                {t('smartAnalysisDesc')}
              </p>
            </div>
          </div>
        </div>

        {/* Card 3: Datos Abiertos */}
        <div className="relative border-2 border-red-300 dark:border-pink-500/30 p-6 bg-white dark:bg-gray-800/50 shadow-lg dark:shadow-none backdrop-blur-sm hover:border-red-500 dark:hover:border-pink-400 hover:shadow-xl transition-all group"
             style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%)' }}>
          <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-red-500 dark:border-pink-400"></div>
          <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-red-500 dark:border-pink-400"></div>
          
          <div className="flex items-start gap-4">
            <div className="p-3 bg-red-100 dark:bg-pink-500/20 rounded-lg border-2 border-red-400 dark:border-pink-500/50">
              <Database className="w-8 h-8 text-red-600 dark:text-pink-400" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-red-700 dark:text-pink-400 uppercase tracking-wide font-mono mb-2">
                {t('openData')}
              </h3>
              <p className="text-gray-800 dark:text-gray-300 text-base leading-relaxed">
                {t('openDataDesc')}
              </p>
            </div>
          </div>
        </div>

        {/* Card 4: Prevención */}
        <div className="relative border-2 border-green-300 dark:border-green-500/30 p-6 bg-white dark:bg-gray-800/50 shadow-lg dark:shadow-none backdrop-blur-sm hover:border-green-500 dark:hover:border-green-400 hover:shadow-xl transition-all group"
             style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%)' }}>
          <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-green-500 dark:border-green-400"></div>
          <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-green-500 dark:border-green-400"></div>
          
          <div className="flex items-start gap-4">
            <div className="p-3 bg-green-100 dark:bg-green-500/20 rounded-lg border-2 border-green-500 dark:border-green-500/50">
              <Shield className="w-8 h-8 text-green-700 dark:text-green-400" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-green-700 dark:text-green-400 uppercase tracking-wide font-mono mb-2">
                {t('prevention')}
              </h3>
              <p className="text-gray-800 dark:text-gray-300 text-base leading-relaxed">
                {t('preventionDesc')}
              </p>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default ProjectInfo
