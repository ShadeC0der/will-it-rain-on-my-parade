import { useLanguage } from '../context/LanguageContext'
import { Users, Github, Award } from 'lucide-react'

function Footer() {
  const { t } = useLanguage()

  const teamMembers = [
    {
      name: 'Bastian Ojeda',
      username: '@zzonleee',
      country: 'Chile',
      role: 'Team Owner',
      isOwner: true
    },
    {
      name: 'Christian Manuel Gutierrez Martinez',
      username: '@shadec0der',
      country: 'Chile',
      role: 'Developer',
      isOwner: false
    },
    {
      name: 'Carla Andrea Barria Diaz',
      username: '@carlabdiaz',
      country: 'Chile',
      role: 'Developer',
      isOwner: false
    },
    {
      name: 'Nicolas Bahamonde',
      username: '@0xbbanshee',
      country: 'Chile',
      role: 'Developer',
      isOwner: false
    },
    {
      name: 'Benjamin Hector Sanchez Ibañez',
      username: '@benjobas',
      country: 'Chile',
      role: 'Developer',
      isOwner: false
    }
  ]

  return (
    <footer className="bg-orange-100/50 dark:bg-gray-900 border-t-2 border-orange-300 dark:border-cyan-500/30 mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12">
        
        {/* Team Section */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-2">
              <Users className="w-8 h-8 text-orange-600 dark:text-cyan-400" />
              <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-700 to-red-700 dark:from-cyan-400 dark:to-purple-500 uppercase tracking-wide font-mono drop-shadow-md">
                {t('teamMembers')}
              </h3>
            </div>
            <p className="text-2xl font-bold text-orange-700 dark:text-cyan-400 mb-3 flex items-center justify-center gap-2">
              🐛 {t('teamName')}
            </p>
            <div className="flex items-center justify-center gap-2">
              <Award className="w-5 h-5 text-orange-500 dark:text-yellow-400" />
              <p className="text-orange-600 dark:text-yellow-400 font-mono text-sm uppercase tracking-wider">
                NASA Space Apps Challenge 2025
              </p>
            </div>
          </div>

          {/* Grid de miembros */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teamMembers.map((member, index) => (
              <div 
                key={index}
                className="relative border-2 border-orange-300 dark:border-cyan-500/30 p-6 bg-white dark:bg-gray-800/50 shadow-md dark:shadow-none backdrop-blur-sm hover:border-orange-500 dark:hover:border-cyan-400 hover:shadow-xl transition-all group"
                style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%)' }}
              >
                <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-orange-500 dark:border-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-orange-500 dark:border-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                
                <div>
                  <h4 className="text-gray-900 dark:text-white font-bold text-base mb-1">
                    {member.name}
                  </h4>
                  <p className="text-orange-700 dark:text-cyan-400 text-sm font-mono mb-2">
                    {member.username}
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-700 dark:text-gray-300 text-sm">🇨🇱 {member.country}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom info */}
        <div className="border-t border-gray-300 dark:border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <h4 className="text-xl font-bold text-orange-700 dark:text-cyan-400 font-mono mb-2">
                Will It Rain On My Parade?
              </h4>
              <p className="text-gray-600 dark:text-gray-400 text-sm font-mono">
                {t('footerTagline')}
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3 bg-orange-100 dark:bg-gray-800 hover:bg-orange-200 dark:hover:bg-gray-700 border border-orange-400 dark:border-gray-600 hover:border-orange-600 dark:hover:border-cyan-400 rounded-lg transition-all group"
              >
                <Github className="w-6 h-6 text-orange-700 dark:text-gray-400 group-hover:text-orange-800 dark:group-hover:text-cyan-400 transition-colors" />
              </a>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-gray-600 dark:text-gray-500 text-sm font-mono">
              © 2025 NASA Space Apps Challenge | Made with 💙 by <span className="text-orange-700 dark:text-cyan-400 font-bold">{t('teamName')}</span> 🐛
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
