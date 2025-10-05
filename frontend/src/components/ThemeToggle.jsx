import { useTheme } from '../context/ThemeContext'
import { Sun, Moon } from 'lucide-react'

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center justify-center px-4 py-2 bg-orange-100 dark:bg-purple-500/20 hover:bg-orange-200 dark:hover:bg-purple-500/30 border-2 border-orange-500 dark:border-purple-400 text-orange-700 dark:text-purple-400 hover:text-orange-800 dark:hover:text-purple-300 rounded-lg transition-all hover:shadow-lg dark:hover:shadow-[0_0_15px_rgba(168,85,247,0.4)]"
      title={theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
    >
      {theme === 'dark' ? (
        <Sun className="w-5 h-5" />
      ) : (
        <Moon className="w-5 h-5" />
      )}
    </button>
  )
}

export default ThemeToggle
