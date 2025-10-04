import { useLanguage } from '../context/LanguageContext'
import { Satellite, Database, Brain, Shield } from 'lucide-react'

function ProjectInfo() {
  const { t } = useLanguage()

  return (
    <div className="max-w-6xl mx-auto px-4 py-16 space-y-12">
      {/* Header */}
      <div className="text-center space-y-4">
        <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 uppercase tracking-tight"
            style={{ textShadow: '0 0 20px rgba(0, 255, 255, 0.3)' }}>
          {t('aboutProject')}
        </h2>
        <div className="flex items-center justify-center gap-2">
          <div className="h-px w-12 bg-cyan-400"></div>
          <p className="text-sm text-cyan-400 uppercase tracking-widest font-mono">
            NASA SPACE APPS CHALLENGE 2025
          </p>
          <div className="h-px w-12 bg-cyan-400"></div>
        </div>
      </div>

      {/* Grid de características */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Card 1: Datos Satelitales */}
        <div className="relative border border-cyan-500/30 p-6 bg-gray-800/50 backdrop-blur-sm hover:border-cyan-400 transition-all group"
             style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%)' }}>
          <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-cyan-400"></div>
          <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-cyan-400"></div>
          
          <div className="flex items-start gap-4">
            <div className="p-3 bg-cyan-500/20 rounded-lg border border-cyan-500/50">
              <Satellite className="w-8 h-8 text-cyan-400" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-cyan-400 uppercase tracking-wide font-mono mb-2">
                {t('satelliteData')}
              </h3>
              <p className="text-gray-300 text-base leading-relaxed">
                {t('satelliteDataDesc')}
              </p>
            </div>
          </div>
        </div>

        {/* Card 2: Análisis Inteligente */}
        <div className="relative border border-purple-500/30 p-6 bg-gray-800/50 backdrop-blur-sm hover:border-purple-400 transition-all group"
             style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%)' }}>
          <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-purple-400"></div>
          <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-purple-400"></div>
          
          <div className="flex items-start gap-4">
            <div className="p-3 bg-purple-500/20 rounded-lg border border-purple-500/50">
              <Brain className="w-8 h-8 text-purple-400" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-purple-400 uppercase tracking-wide font-mono mb-2">
                {t('smartAnalysis')}
              </h3>
              <p className="text-gray-300 text-base leading-relaxed">
                {t('smartAnalysisDesc')}
              </p>
            </div>
          </div>
        </div>

        {/* Card 3: Datos Abiertos */}
        <div className="relative border border-pink-500/30 p-6 bg-gray-800/50 backdrop-blur-sm hover:border-pink-400 transition-all group"
             style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%)' }}>
          <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-pink-400"></div>
          <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-pink-400"></div>
          
          <div className="flex items-start gap-4">
            <div className="p-3 bg-pink-500/20 rounded-lg border border-pink-500/50">
              <Database className="w-8 h-8 text-pink-400" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-pink-400 uppercase tracking-wide font-mono mb-2">
                {t('openData')}
              </h3>
              <p className="text-gray-300 text-base leading-relaxed">
                {t('openDataDesc')}
              </p>
            </div>
          </div>
        </div>

        {/* Card 4: Prevención */}
        <div className="relative border border-green-500/30 p-6 bg-gray-800/50 backdrop-blur-sm hover:border-green-400 transition-all group"
             style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%)' }}>
          <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-green-400"></div>
          <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-green-400"></div>
          
          <div className="flex items-start gap-4">
            <div className="p-3 bg-green-500/20 rounded-lg border border-green-500/50">
              <Shield className="w-8 h-8 text-green-400" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-green-400 uppercase tracking-wide font-mono mb-2">
                {t('prevention')}
              </h3>
              <p className="text-gray-300 text-base leading-relaxed">
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
