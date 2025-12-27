import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useLocation } from 'react-router-dom'
import { SourceProvider } from './context/SourceContext'
import Header from './components/Header'
import Home from './pages/Home'
import Page1 from './pages/Page1'
import {
  QueryClient,
  QueryClientProvider,

} from '@tanstack/react-query'
import { RagContextProvider } from './context/RagContext'
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import { MsgContextProvider } from './context/MessageContext'

// Component to handle page transitions
function AnimatedRoutes() {
  const location = useLocation()
const queryClient = new QueryClient()
  return (
     
     <QueryClientProvider client={queryClient}>
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
      >
    
      <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/page1" element={<Page1 />} />
        </Routes>

        
      </motion.div>
    </AnimatePresence>
        </QueryClientProvider>
  )
}

function App() {
  return (
    <MsgContextProvider>
    <RagContextProvider>
    <SourceProvider>
      <Router>
        <div className="max-h-screen bg-[#22262B]">
          <Header />
          <AnimatedRoutes />
        </div>
      </Router>
    </SourceProvider>
    </RagContextProvider>
     </MsgContextProvider>
    

  )
}

export default App

