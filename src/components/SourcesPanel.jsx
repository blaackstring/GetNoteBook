import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useSources } from '../context/SourceContext'
import AddSourceModal from './AddSourceModal'


function SourcesPanel({ UploadEvent, setFiles }) {
  const { sources, addSource, removeSource } = useSources()
  console.log('SOURCES PANEL SOURCES', sources);
  const [searchQuery, setSearchQuery] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const fileInputRef = useRef(null)


  const textReveal = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  }
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }
  const handleAddSource = () => {
    setIsModalOpen(true)
  }


  const handleUploadFile = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleFileChange = async (e) => {
    const files = [...e.target.files]


    if (files) {
      const newSource = files.map((file, idx) => {
        return {
          id: idx + 1,
          encryptedname: Date.now() + '-' + file.name,
          name: file.name,
          type: file.type.split('/')[1].toUpperCase() || 'File',
          link: 'https://d3a6qvndldqlr.cloudfront.net/' + file.name,
          file: file
        }
      })

      const result = await Promise.all(
        newSource.map(async (singleFile, idx) => {
          console.log(singleFile);

          const res = await UploadEvent(singleFile);
          if (res) {
            addSource(singleFile);
          }
          return res;
        })
      );
      setIsModalOpen(false)
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }


  const handleUploadYouTube = () => {
    const youtubeLink = prompt('Enter YouTube video URL:')
    if (youtubeLink) {
      const newSource = {
        id: Date.now(),
        name: 'YouTube Video',
        type: 'YouTube',
        date: new Date().toLocaleDateString(),
        url: youtubeLink
      }
      addSource(newSource)
    }
  }



  return (
    <div className='max-h-screen flex-1 rounded-xl w-full bg-[#22262B]'>
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        onChange={handleFileChange}
        accept=".pdf,.doc,.docx,.txt,.mp4,.mp3,.wav,.m4a"
        multiple
      />

      <AddSourceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onUploadFile={handleUploadFile}
        onUploadYouTube={handleUploadYouTube}
      />

      <div className="h-full flex flex-col  p-3 rounded-2xl">
        <motion.div
          className="p-4 border-b border-gray-700 flex justify-between items-center"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <motion.h2
            className="text-md font-display text-white"
            variants={textReveal}
            initial="hidden"
            animate="visible"
          >
            Sources
          </motion.h2>
          <motion.button
            className="text-gray-400 hover:text-white"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </motion.button>
        </motion.div>

        <motion.div
          className="p-4 border-b border-gray-700"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
        >
          <motion.button
            onClick={handleAddSource}
            className="w-full border border-white/20 text-white font-medium py-2 px-4 rounded-2xl transition-colors hover:bg-white/10"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            + Add sources
          </motion.button>
        </motion.div>

        <motion.div
          className="p-4 border-b border-gray-700"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          <div className="flex gap-1 text-xs">
            <motion.div
              className="flex-1 flex items-center bg-gray-800 border border-gray-700 rounded-lg p-1"
              whileFocus={{ borderColor: "#3B82F6", scale: 1.01 }}
            >
              <svg className="w-3 h-3 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
              <input
                type="text"
                placeholder="Search the web for new sources"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent text-white placeholder-gray-400 outline-none text-sx"
              />
              <select className="bg-transparent text-gray-400 border-none outline-none text-xs">
                <option>Web</option>
              </select>
            </motion.div>
          </div>
        </motion.div>

        <div className="flex-1 overflow-y-auto p-4">
          {sources.length == 0 ? (
            <motion.div
              className="flex flex-col items-center justify-center h-full text-center text-gray-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <motion.svg
                className="w-16 h-16 mb-2 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.5, 0.8, 0.5]
                }}
                transition={{
                  duration: 2,
                  ease: "easeInOut"
                }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </motion.svg>
              <motion.p
                className="text-sm"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                Saved sources will appear here. Click Add source above to add PDFs, websites, text, videos or audio files. Or import a file directly from Google Drive.
              </motion.p>
            </motion.div>
          ) : (
            <motion.div
              className="space-y-10"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {sources.map((source, index) => (
                <motion.div

                  key={index}
                  className="bg-gray-800 p-4 rounded-lg border border-gray-700 hover:border-gray-600 transition-colors w-[100%] block"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                  whileHover={{ scale: 1.02, borderColor: "#4B5563" }}
                  layout
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 flex flex-row justify-around items gap-3">
                      <motion.a
                        className="text-xs text-white inline-block"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: index * 0.1 + 0.1 }}
                      >
                        {source.name}
                      </motion.a>
                      <motion.p
                        className="text-xs text-gray-400 "
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: index * 0.1 + 0.15 }}
                      >
                        {source.type}
                      </motion.p>
                      <motion.a
                        className="text-gray-400 hover:text-white text-xs mr-2 "
                        whileHover={{ scale: 1.1, }}
                        whileTap={{ scale: 0.9 }}
                        href={source.link}
                        target="_blank"
                        rel="noopener noreferrer" // noopener for security
                      >
                        View
                      </motion.a>
                    </div>
                    <motion.button
                      className="text-gray-400 hover:text-white"
                      whileHover={{ scale: 1.2, rotate: 90 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => removeSource(source.id)}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </motion.button>


                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}

export default SourcesPanel

