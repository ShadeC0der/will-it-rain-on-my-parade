import { useLanguage } from '../context/LanguageContext'

const categories = [
  { icon: 'HOT', titleKey: 'hot', color: 'from-red-500 to-orange-500', border: 'border-red-500/50', glow: 'hover:shadow-[0_0_20px_rgba(239,68,68,0.5)]' },
  { icon: 'COLD', titleKey: 'cold', color: 'from-cyan-400 to-blue-500', border: 'border-cyan-400/50', glow: 'hover:shadow-[0_0_20px_rgba(34,211,238,0.5)]' },
  { icon: 'WIND', titleKey: 'wind', color: 'from-green-400 to-emerald-500', border: 'border-green-400/50', glow: 'hover:shadow-[0_0_20px_rgba(74,222,128,0.5)]' },
  { icon: 'HUMID', titleKey: 'humid', color: 'from-blue-400 to-indigo-500', border: 'border-blue-400/50', glow: 'hover:shadow-[0_0_20px_rgba(96,165,250,0.5)]' },
  { icon: 'BAD', titleKey: 'bad', color: 'from-yellow-400 to-orange-500', border: 'border-yellow-400/50', glow: 'hover:shadow-[0_0_20px_rgba(250,204,21,0.5)]' },
  { icon: 'NASA', titleKey: 'nasa', color: 'from-purple-500 to-pink-500', border: 'border-purple-500/50', glow: 'hover:shadow-[0_0_20px_rgba(168,85,247,0.5)]' }
]

function CategoriesSection() {
  const { t } = useLanguage()
  
  return (
    <div className="space-y-10">
      <div className="text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-500 uppercase tracking-tight mb-2"
            style={{ textShadow: '0 0 20px rgba(0, 255, 255, 0.3)' }}>
          {t('detectionMatrix')}
        </h2>
        <div className="flex items-center justify-center gap-2 mt-4">
          <div className="h-px w-12 bg-cyan-400"></div>
          <p className="text-xs text-cyan-400 uppercase tracking-widest font-mono">
            {t('conditionCategories')}
          </p>
          <div className="h-px w-12 bg-cyan-400"></div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {categories.map(({ icon, titleKey, color, border, glow }) => (
          <div key={titleKey} className={`relative border ${border} p-5 bg-gray-800/50 backdrop-blur-sm ${glow} transition-all duration-300 group cursor-pointer`}
               style={{ clipPath: 'polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)' }}>
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-cyan-400"></div>
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-pink-500"></div>
            
            <div className={`text-3xl font-bold text-center mb-2 text-transparent bg-clip-text bg-gradient-to-r ${color} font-mono tracking-tighter`}>
              {icon}
            </div>
            <div className="text-xs text-gray-400 text-center uppercase tracking-wide font-mono">
              {t(titleKey)}
            </div>
          </div>
        ))}
      </div>

      <div className="text-center">
        <p className="text-xs text-cyan-400 uppercase tracking-widest font-mono animate-pulse">
          {t('scroll')}
        </p>
      </div>
    </div>
  )
}

export default CategoriesSection
