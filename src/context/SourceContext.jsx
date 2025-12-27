import { createContext, useContext, useState } from 'react'

const SourceContext = createContext()


export function SourceProvider({ children }) {
  
  const [sources, setSources] = useState([{
    id: 1,
    encryptedName:'06e378a8-0ead-4145-9218-cf3ce260ba5b-.pdf',
    name: '📄 oligopoly chapter AQA',
    type: 'PDF',
    date: '2024-01-01',
    link:'https://d3a6qvndldqlr.cloudfront.net/2617a9b3-f957-4593-b6b4-12cf456268a1-.pdf'
  },

{
    id: 2,
    encryptedName:'06e378a8-0ead-4145-9218-cf3ce260ba5b-.pdf',
    name: '🎥 Oligopoly - Kinked Demand Curve ',
    type: 'MP4',
    link:'https://youtu.be/Ec19ljjvlCI?list=TLGG6f3IQWMbfUswNDExMjAyNQ'
  },

  {
    id: 3,
    encryptedName:'06e378a8-0ead-4145-9218-cf3ce260ba5b-.pdf',
    name: '🎥 Oligopoly - Game Theory',
    type: 'MP4',
    link:'https://www.youtube.com/watch?v=Z_S0VA4jKes&t=3s'
  }
])

  // Function to add a new source
  const addSource = (source) => {
    setSources(prevSources => [...prevSources,source])
  }

  // Function to remove a source
  const removeSource = (id) => {
    setSources(sources.filter(source => source.id !== id))
  }

  return (
    <SourceContext.Provider value={{ sources, addSource, removeSource }}>
      {children}
    </SourceContext.Provider>
  )
}

// Custom hook to use the source context
export function useSources() {
  return useContext(SourceContext)
}

