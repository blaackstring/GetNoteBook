import { createContext, useContext, useState } from "react"
const RagContext=createContext()

export const RagContextProvider=({children})=>{



const [RagAnswer,setRagAnswer]=useState('');
const [Allanswers,setAllanswers]=useState([])
const [streamingMessage, setStreamingMessage] = useState(null);
    return( 
    <RagContext.Provider value={{RagAnswer,setRagAnswer,Allanswers,setAllanswers, streamingMessage, setStreamingMessage}}>
        {children}
    </RagContext.Provider>
    )
}


export const Userag=()=>{return useContext(RagContext);}