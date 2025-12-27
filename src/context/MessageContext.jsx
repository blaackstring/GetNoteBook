import { createContext, useContext, useState } from "react"
const MsgContext=createContext()

export const MsgContextProvider=({children})=>{



const [Message,setMessage]=useState('');

    return( 
    <MsgContext.Provider value={{Message,setMessage}}>
        {children}
    </MsgContext.Provider>
    )
}


export const UseMsg=()=>{return useContext(MsgContext);}