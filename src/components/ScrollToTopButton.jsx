import { useState, useEffect } from 'react'
import { ArrowUp } from 'lucide-react'

function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false)

  // Mostrar botón cuando el usuario ha scrolleado más de 300px
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility)

    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 p-4 bg-cyan-500/20 hover:bg-cyan-500/30 border-2 border-cyan-400 text-cyan-400 rounded-full shadow-lg hover:shadow-[0_0_20px_rgba(0,255,255,0.5)] transition-all duration-300 group backdrop-blur-sm"
          aria-label="Volver arriba"
          title="Volver arriba"
        >
          <ArrowUp className="w-6 h-6 group-hover:animate-bounce" />
        </button>
      )}
    </>
  )
}

export default ScrollToTopButton
