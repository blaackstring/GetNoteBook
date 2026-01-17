import { motion } from 'framer-motion'
import { useState } from 'react'
import { Loader2 } from 'lucide-react'
import { useSources } from '../context/SourceContext'
import { useMutation } from '@tanstack/react-query'
import VideoSummary from '../hooks/Video_summaryHook.js'

function StudioPanel() {
  const { sources } = useSources();
  const [videoData, setVideoData] = useState(null);

  const mutation = useMutation({
    mutationFn: async () => {
      return VideoSummary();
    },
  })

  const handleVideoSummary = async (name) => {
    console.log(name);

    if (name != 'Video Summary') return;

    try {
      const data = await mutation.mutateAsync();
      console.log(data)
      setVideoData(data.videoId);
    } catch (err) {
      console.error(err);
    }
  };

  // Studio content creation options
  const studioOptions = [
    {
      name: 'Audio Overview', icon:
        <img src=' spectrum.png' height={30} width={30} className=' rounded-full' />
    },
    { name: 'Video Summary', icon: <img src='play-music.png' height={30} width={30} className=' rounded-full' /> },
  ]

  // Container animation for staggered children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  // Item animation
  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.3, ease: "easeOut" }
    }
  }

  return (
    <div className=" flex flex-col  bg-[#22262B] max-h-screen  rounded-2xl">
      {/* Header */}
      <motion.div
        className="p-4 border-b border-gray-700 flex justify-between items-center overflow-hidden"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <motion.h2
          className="text-xl font-display font-semibold"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
        >
          Studio
        </motion.h2>
        <motion.button
          className="text-gray-400 hover:text-white"
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
        >
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </motion.button>
      </motion.div>

      {/* Content Creation Options Grid */}
      <div className="flex-1 overflow-y-auto p-4">
        <motion.div
          className="grid grid-cols-1 gap-3"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {studioOptions.map((option, index) => (
            <motion.button
              key={index}
              onClick={() => handleVideoSummary(option.name)}
              className="bg-[#1F2328] border w-15 h-15 border-gray-700 rounded-lg p-2 hover:border-gray-300 hover:bg-gray-750 transition-colors text-left"
              variants={itemVariants}
              whileHover={{
                scale: 0.86,
                borderColor: "#4B5563",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)"
              }}

            >
              <div className="flex flex-col items-center text-center">
                <motion.span
                  className="text-3xl mb-2"
                  animate={{
                    rotate: [0, 5, -5, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 3,
                    delay: index * 0.2
                  }}
                >
                  {option.icon}
                </motion.span>
                <motion.span
                  className="text-sm font-medium text-white"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.2 }}
                >
                  {option.name}
                </motion.span>
              </div>
            </motion.button>
          ))}
        </motion.div>
      </div>

      {/* Empty State Message */}
      {sources.length === 0 && (
        <motion.div
          className="p-4 border-t border-gray-700"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex flex-col items-center text-center  text-gray-400 rounded-2xl">
            <motion.p
              className="text-xs"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              Studio output will be saved here. After adding sources, click to add Audio Overview, study guide, mind map and more!
            </motion.p>
          </div>
        </motion.div>
      )}

      {/* Video Player Output */}
      {videoData ? (
        <div className='p-4 border-t border-gray-700'>
          <div className='p-2 flex justify-center items-center'>
            <video
              src={`https://d3a6qvndldqlr.cloudfront.net/${'video_summary_1766833874352.mp4'}`}
              controls
              className='w-full h-full rounded-lg'
            />
          </div>
        </div>
      ) : (
        <div>
          {mutation.isPending && (
            <div className="flex justify-center p-4">
              <Loader2 className="animate-spin text-white" />
            </div>
          )}
        </div>
      )}

      {/* Add Note Button */}

    </div>
  )
}

export default StudioPanel

