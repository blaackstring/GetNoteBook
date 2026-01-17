import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Upload, Youtube, UploadCloudIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { FetchTranscript } from '@/hooks/FetchTranscriptHook.js'

function AddSourceModal({ isOpen, onClose, onUploadFile, onUploadYouTube }) {
  const [url,setUrl]=useState('');
  const [videoId,setVideoId]=useState(null);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }
//erfrfr
    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }
  function extractYouTubeVideoId(url) {
    console.log(url);
    
  if (!url) return null;

  const regex =
    /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;

  const match = url.match(regex);
  console.log(match[1]);
  
  return FetchTranscript(match ? match[1] : null);
}


  if (typeof window === 'undefined') return null

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={handleBackdropClick}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={handleBackdropClick}
          >
            <div
              className="bg-[#22262B] border border-gray-700 rounded-2xl shadow-2xl max-w-md w-full p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-white">Add Source</h2>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-white transition-colors p-1 rounded-lg hover:bg-gray-800"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3">
                    <motion.button
                  className="w-full flex items-center gap-4 p-4 bg-gray-800/50 border border-gray-700 rounded-xl hover:border-gray-600 hover:bg-gray-800 transition-all text-left group"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center group-hover:bg-red-500/30 transition-colors">
                    <Youtube className="w-6 h-6 text-red-400" />
                  </div>
                  
                  <div className="flex-1 flex flex-row items-center justify-between p-2 border rounded-lg  border-gray-700">
                 
                    <input type="text" placeholder="Enter YouTube URL" value={url}
                    onChange={(e)=>setUrl(e.target?.value)}
                    className=" w-full bg-transparent focus:outline-none border-0 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:ring-0  focus:ring-blue-500" />
                    <motion.button
                    onClick={()=>extractYouTubeVideoId(url)}
                    ><UploadCloudIcon/></motion.button>
                  </div>
                </motion.button>
                <motion.button
                  onClick={() => {
                    onUploadFile()
                    onClose()
                  }}
                  className="w-full flex items-center gap-4 p-4 bg-gray-800/50 border border-gray-700 rounded-xl hover:border-gray-600 hover:bg-gray-800 transition-all text-left group"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center group-hover:bg-blue-500/30 transition-colors">
                    <Upload className="w-6 h-6 text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-medium mb-1">Upload File</h3>
                    <p className="text-sm text-gray-400">Upload PDFs, documents, or other files</p>
                  </div>
                </motion.button>
              </div>

              <div className="mt-6">
                <Button
                  onClick={onClose}
                  variant="outline"
                  className="w-full border-gray-700 text-gray-300 hover:bg-gray-800 hover:border-gray-600"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  )
}

export default AddSourceModal

