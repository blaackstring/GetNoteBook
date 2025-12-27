import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const navigationItems = [
  { name: 'Home', path: '/' },
  { name: 'Notebooks', path: '/page1' },

]

function Header() {
  const location = useLocation()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/'
    }
    return location.pathname.startsWith(path)
  }

  const isHomePage = location.pathname === '/'

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isHomePage
          ? cn(
              'text-black',
              isScrolled
                ? 'bg-white shadow-lg'
                : 'bg-white/80 backdrop-blur-sm'
            )
          : cn(
              'text-gray-200',
              isScrolled
                ? ' border-gray-800'
                : ' border-gray-800'
            )
      )}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-18">
          {/* Logo/Brand */}
          <Link
            to="/"
            className="flex items-center space-x-2 group"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center"
            >
              <div className="text-2xl font-semibold lg:h-10 bg-gradient-to-l bg-clip-text text-transparent from-slate-400 to-purple-400 rounded-lg flex items-center justify-center">
              GetNoteBook
              </div>
         
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  'relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200',
                  isHomePage
                    ? cn(
                        isActive(item.path)
                          ? 'text-black'
                          : 'text-gray-700 hover:text-black hover:bg-gray-100/50'
                      )
                    : cn(
                        isActive(item.path)
                          ? 'text-gray-100'
                          : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/50'
                      )
                )}
              >
                {item.name}
                {isActive(item.path) && (
                  <motion.div
                    layoutId="activeIndicator"
                    className={cn(
                      'absolute bottom-0 left-0 right-0 h-0.5 rounded-full',
                      isHomePage
                        ? 'bg-gradient-to-r from-orange-600 to-purple-400'
                        : 'bg-gradient-to-l from-slate-500 to-slate-600'
                    )}
                    initial={false}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* CTA Button - Desktop */}
      

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={cn(
              'md:hidden p-2 rounded-lg transition-colors',
              isHomePage
                ? 'text-gray-700 hover:text-black hover:bg-gray-100'
                : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800'
            )}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden overflow-hidden"
            >
              <div className={cn(
                'py-4 space-y-2 border-t',
                isHomePage ? 'border-gray-200' : 'border-gray-800'
              )}>
                {navigationItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      'block px-4 py-3 rounded-lg text-base font-medium transition-colors',
                      isHomePage
                        ? cn(
                            isActive(item.path)
                              ? 'text-black bg-gray-100'
                              : 'text-gray-700 hover:text-black hover:bg-gray-100/50'
                          )
                        : cn(
                            isActive(item.path)
                              ? 'text-gray-100 bg-gray-800'
                              : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/50'
                          )
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="pt-2 px-4">
                  <Button
                    asChild
                    variant="outline"
                    className={cn(
                      'w-full',
                      isHomePage
                        ? 'border-gray-300 text-black hover:bg-gray-100 hover:border-gray-400'
                        : 'border-gray-600 text-gray-200 hover:bg-gray-800 hover:border-gray-500'
                    )}
                  >
                    <Link to="/page1" onClick={() => setIsMobileMenuOpen(false)}>
                      Get Started
                    </Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  )
}

export default Header

