import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Play } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

function Home() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen   bg-white text-black overflow-y-auto pt-16 top-10 lg:top-0 md:pt-20 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
        <div className="flex flex-col items-center justify-center text-center min-h-[80vh] relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6 md:space-y-8 max-w-4xl"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-thin leading-tight font-serif"
            >
              One place for
              <br />
              everything on
              <br />
              your mind
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-base sm:text-lg md:text-xl text-gray-700 max-w-2xl mx-auto"
            >
              Dump your ideas, meetings, and research into Notebook—and get it all organized for you.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="pt-4 md:pt-8 flex justify-center"
            >
              <Button
                onClick={() => navigate('/page1')}
                size="lg"
                className="bg-black text-white hover:bg-gray-800 text-base md:text-lg rounded-lg font-semibold transition-all hover:scale-105 px-8 py-6"
              >
                Create Notebook
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
          className="absolute top-30 left-20 md:top-40 md:left-28 w-[153.6px] h-[153.6px] md:w-[104.8px] md:h-[204.8px] bg-blue-500 rounded-full"
        />
 

        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
          className="absolute top-8 right-10 md:top-28 md:right-10 w-[179.2px] h-[179.2px] md:w-[230.4px] md:h-[230.4px] bg-gray-800 rounded-full border-4 border-gray-700 overflow-hidden"
        >
          <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
            <div className="w-[102.4px] h-[102.4px] md:w-[128px] md:h-[128px] bg-gray-600 rounded-full flex items-center justify-center">
              <div className="w-[76.8px] h-[76.8px] md:w-[102.4px] md:h-[102.4px] bg-gray-500 rounded-full" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
          className="absolute top-20 right-60 md:top-20 md:right-[400px] w-[179.2px] h-[179.2px] md:w-[230.4px] md:h-[230.4px] bg-gray-800 rounded-full border-4 border-gray-700 overflow-hidden"
        >
          <div className="w-full h-full flex items-center justify-center">
            <img 
              src="pic.jpg" 
              alt="" 
              className="w-full h-full object-cover object-center"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
          className="absolute bottom-20 left-8 md:bottom-20 md:left-8 w-[192px] h-[128px] md:w-[256px] md:h-[166.4px] bg-red-500 rounded-full flex items-center justify-center"
        >
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <svg
              className="w-12 h-12 md:w-16 md:h-16 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 10l7-7m0 0l7 7m-7-7v18"
              />
            </svg>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.9, ease: "easeOut" }}
          className="absolute bottom-20 right-6 lg:right-30   md:bottom-20 md:right-38 w-[140.8px] h-[140.8px] md:w-[179.2px] md:h-[179.2px] bg-amber-200 rounded-full"
        />
      </div>
    </div>
  )
}

export default Home

